import type { Creature, CreatureFamilySection } from '@/types/creature'
import { CREATURE_LORE_LOST_OMENS } from './creatureLoreLostOmens'
import { CREATURE_LORE_BATTLECRY } from './creatureLoreBattlecry'
import { CREATURE_LORE_RAGE_OF_ELEMENTS } from './creatureLoreRageOfElements'
import { CREATURE_LORE_HOWL_OF_THE_WILD } from './creatureLoreHowlOfTheWild'
import { CREATURE_LORE_DRACONIC_CODEX } from './creatureLoreDraconicCodex'
import { CREATURE_LORE_SEASON_OF_GHOSTS } from './creatureLoreSeasonOfGhosts'
import { CREATURE_LORE_GATEWALKERS } from './creatureLoreGatewalkers'
import { CREATURE_LORE_SEVEN_DOOMS } from './creatureLoreSevenDooms'
import { CREATURE_LORE_WARDENS } from './creatureLoreWardens'
import { CREATURE_LORE_CURTAIN_CALL } from './creatureLoreCurtainCall'
import { CREATURE_LORE_TRIUMPH_TUSK } from './creatureLoreTriumphTusk'
import { CREATURE_LORE_SPORE_WAR } from './creatureLoreSporeWar'
import { CREATURE_LORE_SHADES_OF_BLOOD } from './creatureLoreShadesOfBlood'
import { CREATURE_LORE_MYTH_RUNELORDS } from './creatureLoreMythRunelords'
import { CREATURE_LORE_HELLBREAKERS } from './creatureLoreHellbreakers'
import { CREATURE_LORE_STANDALONE_FIVE } from './creatureLoreStandaloneFive'
import { CREATURE_LORE_HELLS_BASTION } from './creatureLoreHellsBastion'
import { CREATURE_LORE_NPC_CORE } from './creatureLoreNpcCore'

export interface CreatureLoreEntry {
  description: string
  sections: CreatureFamilySection[]
}

/** Lore completa (descrição + sidebars) das fichas oficiais Monster Core / Monster Core 2. */
export const CREATURE_LORE: Record<string, CreatureLoreEntry> = {
  "creature-animated-armor": {
    "description": "Armaduras animadas servem tanto como guardiãs quanto como parceiras de treino em academias marciais de alto nível que podem pagar esse luxo. Muitas vezes, a armadura velha de um guerreiro pode ser transformada em armadura animada quando acumula danos demais de batalha para ainda oferecer proteção adequada. São encontradas com mais frequência em laboratórios de magos e masmorras antigas.",
    "sections": []
  },
  "creature-animated-broom": {
    "description": "Vassouras animadas executam tarefas braçais de limpeza e manutenção, mas podem entrar em ação para defender um cômodo contra invasores, se necessário. Esses objetos animados simples aparecem com mais frequência que objetos mais complicados e caros.",
    "sections": []
  },
  "creature-animated-statue": {
    "description": "Estátuas animadas costumam guardar criptas, pequenos santuários ou áreas em edifícios governamentais, onde podem ser posicionadas entre estátuas comuns para esconder sua verdadeira natureza até que um intruso desperte sua ira. Muitos aventureiros menos escrupulosos, movidos pelo medo de que estátuas animem e ataquem, destroem qualquer estátua que encontram, arruinando relíquias antigas e inofensivas.",
    "sections": []
  },
  "creature-ankhrav": {
    "description": "Esses monstros escavadores do tamanho de um cavalo geralmente evitam áreas fortemente povoadas como cidades, mas a predileção dos ankhravs por gado e carne humanoide garante que essas criaturas não permaneçam por muito tempo no fundo da natureza selvagem. Agricultores desesperados cujos campos são infestados por ankhravs muitas vezes não têm outro recurso além de buscar a ajuda de aventureiros.",
    "sections": [
      {
        "id": "ankhrav-burrows",
        "title": "Tocas de Ankhrav",
        "body": "Como se a aparição de um ankhrav faminto em uma extensão de terra cultivada já não fosse ruim o suficiente, quase sempre indica a proximidade de uma colmeia de ankhravs por perto. Um número perturbador de ankhravs pode infestar um covil. No entanto, aventureiros corajosos o bastante para rastejar pelas tocas emaranhadas costumam ser recompensados com grandes quantidades de tesouro, pois ankhravs têm o hábito de arrastar suas vítimas de volta aos cantos mais profundos do ninho para se banquetear, geralmente descartando os restos com a maior parte do equipamento intacto."
      }
    ]
  },
  "creature-arboreal-warden": {
    "description": "Guardiões arbóreos são os patrulheiros da sociedade arbórea. Esses indivíduos itinerantes têm uma curiosidade innata pelas florestas em que vivem e raramente param para criar raízes e descansar na mesma parte da floresta duas vezes. Essa inquietude os torna patrulheiros e batedores ideais da mata. Embora sejam combatentes robustos, sabem que é melhor não enfrentar inimigos perigosos sozinhos. Em vez disso, reportam qualquer perigo aos regentes arbóreos. Em casos raros, grandes grupos de guardiões arbóreos se reúnem para formar um bosque. Bosques viajam além dos limites de uma floresta para investigar as terras de fronteira e reunir informações sobre ameaças potenciais antes de voltar para relatar suas descobertas. Guardiões arbóreos não fingem entender os motivos de outras criaturas — como a maior parte das forças do mundo natural, são ambivalentes em relação aos assuntos mortais que não envolvam sua floresta.",
    "sections": []
  },
  "creature-barghest": {
    "description": "Barghests são feras caninas que sentem grande prazer na caçada, muitas vezes à espreita perto de assentamentos humanoides em busca de presas que ofereçam um desafio adequado. Mesmo no mais profundo da natureza selvagem, barghests escolhem as presas mais astutas ou difíceis, buscando sem fim desafios como gigantes, ninfas e unicórnios.\n\nMais do que a vitória ou até a possibilidade de uma refeição no fim, barghests apreciam a emoção da perseguição e o medo que criam em suas presas. Alvos particularmente aterrorizados de um barghest em caçada podem até ser deixados escapar, espalhando o terror e atraindo caçadores que podem se tornar as próximas vítimas do barghest. Alguns barghests recorrem a aprender métodos mágicos de causar medo diretamente, embora considerem esse medo vazio e insatisfatório.\n\nEmbora raramente tolerem a presença de outro barghest, esses caçadores trabalham de bom grado com quem os ajuda a encontrar presas para atormentar e matar. Isso muitas vezes envolve impor a vontade de bruxas ou fadas particularmente cruéis, mas um barghest entediado também pode forçar uma família de humanoides mais fracos a servir como batedores e isca.\n\nBarghests típicos costumam usar suas habilidades de metamorfose para se esconder à vista de todos, assumindo sua forma verdadeira apenas para assustar a presa e exultar na caçada. No entanto, muitas vezes ainda são descobertos pelo rastro de vítimas ou pelas feridas curiosamente que não cicatrizam que infligem, mesmo em forma humanoide. Histórias de barghests poderosos com cabeças invisíveis às vezes são contadas em aldeias remotas e em declínio. Esses barghests geralmente dispensam o disfarce de humanoide ou cão, aterrorizando comunidades inteiras e caçando abertamente presas cada vez mais perigosas. Alguns também estendem esse orgulho à sua inteligência, insistindo em medir astúcias com a presa ou até com quem acredita estar caçando o barghest.",
    "sections": [
      {
        "id": "canine-rivalries",
        "title": "Rivalidades Caninas",
        "body": "Além de suas relações adversárias com outros barghests, as feras são odiadas por cães e lobos mundanos. Encaixam-se com mais facilidade entre bestas lupinas inteligentes como wargs e lobisomens, com barghests selvagens liderando essas matilhas ou ocasionalmente aceitando a liderança de um espécime poderoso como um witchwarg."
      },
      {
        "id": "the-origins-of-barghests",
        "title": "As Origens dos Barghests",
        "body": "Muitas lendas diferentes tentam explicar as origens dos barghests, invocando todos, de Lamashtu à Caçada Selvagem das fadas. Embora sejam de interesse para estudiosos, os próprios barghests pouco se importam com essas lendas, além de acrescentar seus supostos criadores à lista de presas a que aspiram."
      }
    ]
  },
  "creature-basilisk": {
    "description": "O basilisco é um réptil de temperamento péssimo e com a habilidade de transformar criaturas em pedra com o olhar. O folclore sustenta que, assim como a cocatriz, os primeiros basiliscos chocaram de ovos coriáceos postos por cobras e incubados por galos, mas pouco na fisiologia do basilisco dá credibilidade a essa afirmação.\n\nUm basilisco prefere comer carne petrificada. Depois que a vítima é transformada em pedra, o basilisco tritura o cadáver fossilizado com suas mandíbulas poderosas e deixa que seus potentes ácidos estomacais façam o resto. Esse processo digestivo é extremamente lento e ineficiente, fazendo o basilisco se mover de forma tão letárgica que parece estar em meio à própria petrificação. Isso até gerou o ditado \"lento como um basilisco bem alimentado\". De fato, basiliscos são conhecidos por sua marcha vagarosa e natureza preguiçosa, mas um predador capaz de transformar a presa em pedra com um olhar dificilmente precisa de velocidade.\n\nUm basilisco adulto tem cerca de 4 m de comprimento da cabeça à cauda e pesa aproximadamente 135 kg. Esses répteis emitem sons de chiado ao se mover, que se transformam em um gorgolejo gutural quando estão agitados.\n\nEmbora sejam normalmente criaturas solitárias que se reúnem apenas para acasalar e botar ovos, há relatos periódicos de regiões infestadas por números incomuns de basiliscos. O que causa essas congregações incomuns de atividade de basiliscos é um mistério.\n\nPor razões desconhecidas, doninhas e furões são imunes ao olhar do basilisco e às vezes entram furtivamente nos covis de basiliscos enquanto um dos pais está caçando para consumir ovos ou filhotes recém-chocados. Algumas lendas sugerem que o sangue de um basilisco pode transmutar pedras comuns em outros materiais, mas isso provavelmente é um caso de testemunhas interpretando mal a restauração mágica de criaturas ou partes do corpo previamente petrificadas.",
    "sections": [
      {
        "id": "basilisk-lairs",
        "title": "Covis de Basilisco",
        "body": "Basiliscos podem ser encontrados em praticamente qualquer ambiente terrestre, incluindo cavernas, florestas, colinas, montanhas, planícies e pântanos. Suas peles muitas vezes apresentam colorações que permitem misturar-se mais facilmente com o ambiente. Assim, basiliscos que vivem em florestas podem ter escamas de um verde esmeralda para combinar com a vegetação ao redor, enquanto um basilisco que vive no deserto pode ser de um marrom arenoso ou cor de xisto."
      }
    ]
  },
  "creature-boar": {
    "description": "Javalis são mamíferos onívoros, caçados pesadamente porque sua carne é considerada uma iguaria. Javalis são mais propensos a atacar humanoides em legítima defesa ou durante a época de acasalamento nos meses de inverno, quando os machos desenvolvem cerca de 2,5 cm a mais de tecido para proteger os órgãos enquanto lutam contra rivais. Claro, em algumas culturas, javalis são treinados para se tornarem muito mais agressivos, de modo que possam desempenhar os papéis de besta de guerra e guardião. Quando esses javalis escapam de volta para a natureza selvagem, podem se tornar verdadeiros terrores na região.",
    "sections": []
  },
  "creature-boggard-warrior": {
    "description": "Guerreiros boggards exaltam o combate singular e preferem lutar sozinhos para que ninguém conteste suas mortes. São conhecidos por perseguir inimigos que fogem do combate com uma determinação que parece quase sobrenatural.",
    "sections": []
  },
  "creature-bugbear-prowler": {
    "description": "Predadores bugbear se especializam na arte de espreitar nas sombras.",
    "sections": []
  },
  "creature-bugbear-tormentor": {
    "description": "O atormentador bugbear busca torturar sua presa tanto por intimidação psicológica quanto por dano físico. Quanto mais tempo um atormentador bugbear consegue manter a vítima viva e aterrorizada, melhor se sente.",
    "sections": []
  },
  "creature-caligni-dancer": {
    "description": "Dançarinos caligni servem como intermediários entre facções caligni, levando mensagens e negociando acordos entre grupos notoriamente independentes. Embora fisicamente frágeis, os dançarinos desempenham um papel importante na sociedade caligni e raramente são vistos sem guardas.",
    "sections": []
  },
  "creature-cave-bear": {
    "description": "Maior, mais forte e muito mais agressivo que seus primos menores, o urso-das-cavernas é um colosso que evita terras civilizadas, preferindo habitar lugares remotos. Como o nome sugere, o urso-das-cavernas faz seu covil em cavernas naturais e, como o urso-pardo, é ferozmente territorial. Diferente de um urso-pardo, porém, o urso-das-cavernas tem temperamento explosivo e se certifica de que seu inimigo está morto antes de seguir em frente, geralmente se banquetendo com a carne macia da presa depois de incapacitá-la. Ursos-das-cavernas muitas vezes são considerados espíritos guardiões poderosos por povos que vivem em locais remotos, embora também sejam utilizados como bestas de guerra por orcs ou até gigantes. Gigantes de pedra em particular têm afinidade por manter ursos-das-cavernas treinados como animais de estimação ou guardiões de seus lares.",
    "sections": []
  },
  "creature-cockatrice": {
    "description": "Feia e agressiva, a temível cocatriz espreita lixões e aterros em encostas em busca de presas que pode transformar em pedra com seu bico petrificante e depois consumir pedaço a pedaço. Cocatrizes se parecem com galos magros e doentios com asas de morcego e caudas serpentinas, e raramente passam de 60 cm de altura e o dobro de comprimento. Seu cacarejar distraído dá à presa esperta aviso suficiente de sua presença, e quando irritadas, cocatrizes soltam um grito agudo como o de um galo. Sua bicada libera uma toxina mágica que faz a carne calcificar rapidamente, e qualquer criatura bicada repetidamente por uma cocatriz irritada acaba se transformando em uma estátua de pedra de si mesma.\n\nDiz-se que a primeira cocatriz chocou de um ovo de galo incubado num monturo por um sapo. Seja ou não o boato verdadeiro, a aparência monstruosa da cocatriz certamente não contradiz sua origem estranha e suja, e essas criaturas são mais do que capazes de se reproduzir por conta própria. Cocatrizes são notavelmente férteis e se reúnem em bandos de até uma dúzia de membros. Cada bando contém apenas algumas fêmeas. Os machos — que diferem das fêmeas por terem barbelas verrugosas e cristas nodosas — muitas vezes brigam entre si, com machos de hierarquia inferior eventualmente expulsos para encontrar seus próprios covis ou competir em outros bandos. A maioria das criaturas que se metem com uma cocatriz solitária o faz com um desses exilados mal-humorados.\n\nCovis de cocatriz costumam estar repletos de fragmentos de estátuas de vítimas passadas, embora sejam tão prováveis restos de lagartos e insetos quanto de pessoas. Curiosamente, doninhas e furões, que invadem covis de cocatriz para roubar ovos, são imunes às mordidas petrificantes das criaturas. Por razões desconhecidas, cocatrizes são aterrorizadas e enfurecidas por galos, e são igualmente propensas a fugir ou atacar um quando confrontadas.\n\nIndivíduos particularmente corajosos (ou imprudentes) às vezes mantêm cocatrizes como animais de estimação ou guardiões. Em seu habitat natural entre planícies, florestas e esgotos perto de assentamentos humanoides, cocatrizes se contentam em viver de vermes ou restos de lixo, mas seu maior prazer é consumir refeições quentes de carne recém-petrificada.",
    "sections": [
      {
        "id": "cockatrice-treasure",
        "title": "Tesouro de Cocatriz",
        "body": "Covis de cocatriz às vezes incluem equipamento descartado de vítimas passadas ou pedras lisas e bonitas expelidas do papo da criatura. Lapidadores especialmente valorizam pedras preciosas polidas à perfeição no papo de uma cocatriz e podem pagar um preço alto por essas chamadas \"pedras de cocatriz\". Materiais macios adequados para nidificação, como tecido e couro, raramente sobrevivem à atenção de uma cocatriz, mas objetos de metal muitas vezes ficam em perfeito estado de funcionamento, já que cocatrizes parecem ter pouco interesse em qualquer coisa brilhante que não caiba em sua goela."
      }
    ]
  },
  "creature-crawling-hand": {
    "description": "Uma mão rastejante formada a partir do membro de uma criatura Média é rápida e ágil, esgueirando-se pelas sombras até poder atacar sua presa.",
    "sections": []
  },
  "creature-crocodile": {
    "description": "Crocodilos podem ser encontrados tomando sol nas margens de rios, à espreita em pântanos ou flutuando em lagos. Geralmente são indistinguíveis de troncos quando vistos de longe — pelo menos até atacarem. Jacarés têm estatísticas semelhantes, mas como muitas vezes vivem em climas mais temperados, suportam melhor temperaturas frias. Diferente dos jacarés, crocodilos toleram água salgada. Ambos são predadores formidáveis que provavelmente devorarão aventureiros descuidados que não prestarem atenção por onde pisam.",
    "sections": []
  },
  "creature-dire-wolf": {
    "description": "Muito maiores e de temperamento muito pior que seus primos comuns, lobos terríveis assombram terras primevas que comportam seu tamanho massivo e territórios de caça e apetites proporcionalmente grandes. Orcs gostam de usar lobos terríveis como montarias, achando seus temperamentos violentos perfeitos para caça e guerra. Lobos terríveis são muito mais propensos a caçar humanoides do que lobos comuns, considerando-os nada mais que outro tipo de animal menor e nutritivo.",
    "sections": []
  },
  "creature-dryad": {
    "description": "Dríades são guardiãs feéricas das árvores e das criaturas que habitam áreas arborizadas. Preferem usar métodos indiretos para dissuadir quem prejudicaria seus bosques sagrados e florestas amadas, mas não hesitam em usar encantamentos para recrutar aliados quando ameaças malignas não podem ser dissuadidas apenas com palavras. Em tempos de paz, dríades vivem felizes vidas reclusas dentro de suas árvores, e uma comunidade em harmonia com a natureza pode nem perceber que uma dríade mora por perto.\n\nEmbora vigiem toda a mata ao redor, dríades estão inextricavelmente ligadas a uma árvore específica, geralmente um carvalho. Dríades ligadas a outro tipo de árvore são fundamentalmente as mesmas, mas podem diferir em temperamento e aparência para combinar com sua protegida. Por exemplo, kraneiai, ou dríades de cerejeira, têm uma bela coloração rosada e se preocupam com a frágil beleza da vida.",
    "sections": []
  },
  "creature-flash-beetle": {
    "description": "Esses insetos de cerca de 90 cm de comprimento ostentam um par de órgãos luminosos na parte de trás do abdômen que emitem luz intensa e continuam brilhando por dias, mesmo após a morte da criatura. Besouros-relâmpago são comumente criados e colhidos por mineradores e espeleólogos, já que seu brilho é considerado mais seguro que tochas e menos caro que lamparinas. Habitantes das Terras Obscuras frequentemente domesticam e treinam esses insetos, usando-os como animais de estimação, gado ou mantendo-os em gaiolas como fontes orgânicas de luz em áreas frequentadas por visitantes não acostumados à escuridão.",
    "sections": [
      {
        "id": "light-glands",
        "title": "Glândulas Luminosas",
        "body": "Besouros não coletam tesouro, mas os dois órgãos produtores de luz de um besouro-relâmpago podem ser recuperados da criatura e usados em receitas químicas de iluminação, componentes de magia e criação de itens mágicos."
      }
    ]
  },
  "creature-forest-troll": {
    "description": "Trolls da floresta são gigantes esguios que espreitam as margens da civilização. Confiam em sua força incrível para dominar inimigos com suas garras ferozes e mandíbulas dentadas. Esses trolls medem de 3,6 a 4,8 m de altura, embora prefiram se curvar por conforto e para induzir inimigos a uma falsa sensação de segurança. Trolls são verdadeiramente criaturas da floresta, profundamente ligados em carne e sangue aos habitats verdejantes que consideram seu território. De fato, quando um troll da floresta é morto, sua carne se transforma em torrões negros de carvão, muitas vezes ainda incandescentes. Apesar disso, essas criaturas vagam mais longe e mais amplamente do que a maioria de seus parentes, a ponto de serem as primeiras criaturas que uma pessoa comum pensa quando ouve a palavra \"troll\".",
    "sections": []
  },
  "creature-fungus-leshy": {
    "description": "Leshys dos fungos guardam cavernas, pântanos e lugares úmidos e escuros. Seus jardins de fungos são bizarros para a maioria dos padrões, mas leshys dos fungos são extremamente orgulhosos de suas obras.",
    "sections": []
  },
  "creature-gargoyle": {
    "description": "Gárgulas são caçadores monstruosos feitos de pedra elemental. Usam sua semelhança com estátuas decorativas para se esconder à vista de todos nas cidades durante o dia e descer sobre pedestres azarados à noite. Sua forma mais comum é a de um humanoide com chifres e asas de morcego, mas gárgulas individuais apresentam grande variação, com algumas parecendo mais ou menos humanoides e outras não se parecendo com nenhuma criatura conhecida. As características de uma gárgula não são fixas; gárgulas urbanas que permanecem no mesmo local por tempo suficiente vão lentamente se transformando, dia após dia, para combinar com o estilo da arquitetura local. Esses monstros pacientes podem permanecer disfarçados por longos períodos enquanto aguardam pacientemente uma oportunidade de atacar.\n\nGárgulas tendem a ser caçadoras solitárias, embora às vezes se unam em grupos temíveis chamados bandos para proteção ou diversão. Em raras ocasiões, bandos se tornam comunidades relativamente estáveis, e gárgulas em bandos podem até fazer aliança com outras criaturas como demônios e aberrações inteligentes, embora essas alianças existam no fio da navalha. A maioria das gárgulas é traiçoeira, vingativa e mesquinha — traços que impedem parcerias duradouras. Quase todas têm algum assunto sobre o qual passam dias refletindo enquanto estão em forma de estátua. Algumas são colecionadoras, focando em qualquer coisa, de livros a troféus sombrios, enquanto outras são ritualísticas ou excessivamente apaixonadas por assuntos intelectuais de nicho ou certos motivos artísticos. Essas tendências frequentemente contribuem para a dissolução de bandos, à medida que indivíduos com focos conflitantes entram em choque.\nPoleiros Santificados\nAlém de suas aparências combinarem com o ambiente, gárgulas que se posicionam em templos ou outro terreno consagrado lentamente sucumbem à influência daquele local. Essas gárgulas ganham o traço sagrado ou profano, assim como seus Golpes desarmados. Uma gárgula empoleirada em um templo de Asmodeus, por exemplo, eventualmente ganhará o traço profano junto com mudanças de personalidade que a alinham mais com o ethos do deus. Gárgulas sagradas também são possíveis, embora gárgulas em tais locais muitas vezes abandonem seus poleiros à medida que sua personalidade em transformação entra em conflito com sua necessidade de caçar.",
    "sections": [
      {
        "id": "gargoyle-religion",
        "title": "Religião das Gárgulas",
        "body": "Embora gárgulas empoleiradas em um local religioso eventualmente gravitam em direção ao ethos daquele deus e frequentemente se tornam seguidoras, outros bandos de gárgulas reconsecram templos em ruínas para seus próprios deuses. A maioria desses bandos reverencia um senhor demônio ou um dos senhores do Plano da Terra como criador e patrono."
      }
    ]
  },
  "creature-ghost-commoner": {
    "description": "O fantasma comum é uma pessoa comum que acredita ter morrido injustamente.",
    "sections": []
  },
  "creature-ghoul-soldier": {
    "description": "Mantendo sua habilidade marcial, esses carniçais poderosos não têm medo de enfrentar o inimigo em campo aberto, alimentando-se da carne dos oponentes caídos para aprender suas habilidades de combate.",
    "sections": []
  },
  "creature-ghoul-stalker": {
    "description": "Espreitadores carniçais são mortos-vivos famintos que assombram cemitérios e devoram cadáveres.",
    "sections": []
  },
  "creature-giant-ant": {
    "description": "Formigas gigantes são muito parecidas com suas parentes menores em seus hábitos laboriosos, embora atingir o tamanho de um pônei as torne muito mais letais.",
    "sections": [
      {
        "id": "giant-ant-hives",
        "title": "Colmeias de Formiga Gigante",
        "body": "Formigas gigantes formam vastas colônias subterrâneas, escavando tocas profundas ou infestando cavernas existentes. Formigas são onívoras e cultivam fazendas de fungos, mas ficam felizes em comer o que aparecer. Humanoides e seus animais domesticados são combustível fácil para a maquinaria insetoide de suas colmeias. Operárias carecem do ferrão de suas primas guerreiras, enquanto zangões de elite voam em asas de seda (Deslocamento de voo de 9 m) para buscar novas fontes de alimento para sua rainha."
      }
    ]
  },
  "creature-giant-bat": {
    "description": "Embora morcegos grandes certamente não sejam incomuns em cavernas escuras e ruínas abandonadas e possam incutir medo em espeleólogos medrosos, o chamado morcego gigante é um verdadeiro monstro, pesando bem mais de 45 kg e com envergadura de quase 4,5 m. Alimenta-se principalmente de frutas e insetos, mas pode ser incitado à violência por medo ou fome. Ataques de morcego gigante podem rapidamente dar origem a rumores de monstros mais perigosos — muitos confundem esses animais massivos com algum tipo de demônio ou monstro vampírico. Mas, como outros morcegos, morcegos gigantes são simplesmente mamíferos sociais e inteligentes. Às vezes são usados como montarias por humanoides menores, comumente aqueles que vêm ou habitam regiões montanhosas ou subterrâneas.",
    "sections": []
  },
  "creature-giant-centipede": {
    "description": "A maioria das centopeias gigantes (conhecidas como centopeias de esgoto quando encontradas em cidades) nidifica em pequenos grupos, mas caça sozinha quando busca comida. Tentativas de domesticar centopeias gigantes para uso como guardiãs ou animais de estimação geralmente terminam mal, mas algumas comunidades de goblins, kobolds e mitflits desenvolveram métodos eficazes de utilizar esses vermes como guardiões. Outros grupos assam e comem centopeias, muitas vezes com pimentas fortes como iguaria saborosa, embora seja preciso cuidado ao preparar a refeição para evitar contaminar a carne com o veneno da criatura.",
    "sections": []
  },
  "creature-giant-rat": {
    "description": "Ratos gigantes são versões enormes do verme comum. Costumam ser encontrados em grande número, mas como não cabem nos cantos onde ratos mundanos normalmente se escondem, são muito mais fáceis de localizar e exterminar. Vivem principalmente em esgotos, onde podem vasculhar as ruas acima, mas algumas famílias de ratos gigantes habitam locais mais remotos, como cavernas úmidas, florestas ou colinas. Ratos são sobreviventes incrivelmente hábeis e podem ser encontrados em quase qualquer lugar do mundo, embora tendam a preferir climas temperados ou quentes em oposição a regiões frias.\n\nEmbora sua mordida sozinha não seja letal exceto para os muito jovens ou muito velhos, o rato gigante carrega a peste pútrida comum a roedores pelo mundo — uma praga mais do que capaz de devastar comunidades rurais.",
    "sections": []
  },
  "creature-giant-scorpion": {
    "description": "Esses aracnídeos massivos e aterrorizantes tipicamente medem 2,4 m de comprimento da cabeça à base da cauda. Escorpiões gigantes são os animais de carga e bestas de guerra favoritos de várias criaturas do deserto, particularmente kholos. São mais comumente encontrados na natureza selvagem, porém. Lá fazem covil em cavernas de encosta ou escavam sob camadas rasas de areia, onde ficam à espera de presas que se aproximem.",
    "sections": []
  },
  "creature-giant-viper": {
    "description": "As presas da víbora gigante são uma visão assustadora, com tubos de injeção tão longos quanto adagas. A quantidade de veneno injetado por uma víbora gigante pode causar coagulação severa do sangue e deixar a vítima completamente drenada de vitalidade.",
    "sections": []
  },
  "creature-goblin-commando": {
    "description": "Os líderes teóricos dos ataques goblin são chamados de commandos goblin. Na prática, commandos goblin raramente continuam liderando seus companheiros depois que uma batalha começa. A maioria abandona suas responsabilidades em favor de mergulhar na briga e reivindicar mais glória dos companheiros de tribo.",
    "sections": []
  },
  "creature-goblin-dog": {
    "description": "Os animais de estimação que dão nome aos goblins não são caninos de verdade, mas sim roedores grandes de focinho achatado, corpo fino e pernas longas. Frequentemente tão covardes quanto feios, cães goblin preferem espreitar atrás de arbustos ou em sombras profundas, só saltando sobre presas solitárias ou feridas. Cães goblin frequentemente vagueiam em matilhas, mas são propensos a fugir de uma luta se feridos, mesmo que isso signifique abandonar os companheiros de matilha.\n\nCães goblin recebem o nome de uma longa associação com goblins, que criam as feras como animais de guarda e montarias. A maioria dos goblins se incomoda com o nome, pois o goblin médio fica horrorizado com a sugestão de que suas montarias favoritas tenham qualquer coisa a ver com cães de verdade. Claro, sendo goblins, não se deram ao trabalho de inventar um nome próprio para as criaturas.\n\nMesmo os cães goblin mais mimados têm sarna coceira e caspa abundante que afeta tenazmente quem entra em contato com eles. Essa \"varíola goblin\" causa urticária coceira e feridas supurantes tão feias quanto irritantes e distrativas. A caspa de cão goblin causa reações alérgicas em quase todas as outras criaturas que não compartilham a higiene terrível dos cães goblin — com a notável exceção, é claro, dos goblins, que permanecem totalmente imunes à doença independentemente da limpeza.\n\nA fome pode levar cães goblin a surtos de violência fora do comum, e goblins mais cruéis às vezes deixam de propósito seus animais de estimação famintos na véspera de batalha. Cães goblin subsistem de qualquer material orgânico que conseguem vasculhar; gostam especialmente de carniça fresca. Embora goblins estejam longe de ser comedores exigentes, valorizam cães goblin porque os animais fétidos consomem material que até goblins não tocam. Na verdade, \"Vai Comer?\" é um dos jogos mais populares que goblins jogam com seus animais de estimação, em que uma ampla variedade de petiscos (nem sempre comestíveis ou seguros de consumir) é balançada diante do focinho de um cão goblin. Infelizmente, o jogo \"Vai Morrer?\" muitas vezes é jogado depois de \"Vai Comer?\". Cães goblin que sobrevivem ao segundo jogo ganham renome por sua proeza digestiva e muitas vezes se tornam animais de estimação favoritos da tribo, tratados ainda melhor do que a maioria dos goblins comuns.",
    "sections": [
      {
        "id": "goblin-dog-stories",
        "title": "Histórias de Cão Goblin",
        "body": "Goblins adoram cães goblin, e criar histórias das travessuras de seus animais de estimação é uma tradição honrada em muitas tribos goblin. Goblins frequentemente buscam superar narrativas anteriores aumentando a audácia, o absurdo e o surrealismo de suas aventuras. Exemplos incluem cães goblin dando jantares chiques na alta sociedade entre humanos desavisados, cães goblin contaminando cerveja anã de maneiras indizíveis e goblins que na verdade se transformam em outra coisa como resultado de uma mordida de cão goblin. Essa última história em particular tem alguma verdade, pois relatos confiáveis confirmam a existência de licantropos de cão goblin em certas tribos."
      }
    ]
  },
  "creature-goblin-pyro": {
    "description": "Alguns goblins levam a admiração de seu povo pelo fogo totalmente ao reino da obsessão mortal. Esses piromaníacos podem ser um grande benefício para um bando de saqueadores goblin ansioso para incendiar inimigos e causar estragos. Mais frequentemente, porém, sua presença é uma faca de dois gumes; no calor do momento, piromaníacos goblin às vezes perdem de vista os objetivos da tribo e simplesmente incendeiam qualquer coisa que queime — incluindo seus próprios aliados. Esquadrões goblin também são propensos a distração, e mais de um ataque goblin fracassou porque seus membros estavam ocupados demais observando um incêndio massivo.",
    "sections": []
  },
  "creature-goblin-war-chanter": {
    "description": "Embora todos os goblins gostem de cantar, cantores de guerra goblin se orgulham de dominar a arte da performance vocal. Suas baladas e jingles são inegavelmente cativantes e servem bem seu propósito em batalha, inspirando goblins e distraindo inimigos. Se são realmente agradáveis é inteiramente subjetivo.",
    "sections": []
  },
  "creature-goblin-warrior": {
    "description": "Os combatentes de linha de frente das tribos goblin preferem lutar em grandes grupos — especialmente quando podem superar os inimigos em número, pelo menos três para um.",
    "sections": []
  },
  "creature-gourd-leshy": {
    "description": "Leshys da cabaça são guardiões de campos, jardins e fazendas. Muitas aldeias se beneficiam da proteção de um leshy da cabaça, mesmo que não saibam disso.",
    "sections": []
  },
  "creature-griffon": {
    "description": "Grifos são feras majestosas reverenciadas como símbolos de liberdade e força em muitas culturas. São fisicamente impressionantes, com a parte traseira de um leão e a cabeça, asas e membros anteriores de uma grande ave de rapina — tipicamente uma águia, mas alguns apresentam características de um falcão, falcão-peregrino ou até uma águia-pesqueira ou abutre. Em casos raros, a parte traseira do grifo pode se parecer com a de um grande felino diferente, como um leopardo ou tigre. As variações parecem se conformar ao ambiente do grifo — por exemplo, grifos especialmente raros do norte de Avistan têm a parte traseira de um lince de Grungir e a parte superior de uma coruja-das-neves.\n\nGrifos selvagens confiam em suas asas poderosas para se manter no ar e em sua visão aguçada para avistar presas. A velocidade com que mergulham em direção ao chão e arrebatam vítimas é impressionante. Muitas vezes destroçam a carne de uma presa com bicos afiados como navalhas, mas não antes de pousar em um local isolado onde possam desfrutar da refeição sem interrupção. Grifos que caçam para alimentar seus filhotes são mais cautelosos, destroçando a presa em vez de arriscar trazer uma criatura viva de volta aos ninhos.\n\nDomadores de animais há muito aprenderam a criar grifos como montarias para forças militares ou indivíduos poderosos. Essas montarias são conhecidas por sua força, bravura e lealdade inabalável. Estão entre os animais mais inteligentes, e muitas variantes de grifo são consideradas bestas inteligentes; acredita-se que um grifo escolhe seu cavaleiro tanto quanto um cavaleiro escolhe o grifo. O processo de treinar um grifo para aceitar e carregar um cavaleiro em voo é um ritual longo e caro. Treinadores de grifo cobram somas vultosas por seus serviços, e um governante que pode se gabar de possuir um estábulo de grifos é objeto de grande respeito e inveja.",
    "sections": [
      {
        "id": "alces",
        "title": "Alces",
        "body": "Grifos sem asas, conhecidos como alces, resultam de uma mutação rara. Entre uma ninhada de grifos alados, o alce é tipicamente considerado o menor, então alces raramente são vistos sozinhos na natureza selvagem, embora sejam frequentemente criados intencionalmente em cativeiro como montarias exóticas relativamente acessíveis. Um alce tem Deslocamento terrestre de 10,5 m e perde seu Deslocamento de voo e o Ataque em Voo."
      }
    ]
  },
  "creature-grizzly-bear": {
    "description": "Esse onívoro grande e poderoso habita colinas florestadas. Embora normalmente se sustente de nozes, frutas silvestres, peixes e pequenos mamíferos, é ferozmente territorial e afugentará ou matará qualquer criatura que veja como competição. Ursos-pardos são especialmente temperamentais quando seus filhotes estão por perto. Em combate, um urso-pardo frequentemente tenta agarrar e dilacerar o inimigo com ferocidade surpreendente. Continua o ataque até que o inimigo pareça não ser mais uma ameaça, embora, se o urso estiver com fome, não hesite em se alimentar.",
    "sections": [
      {
        "id": "loaded-for-bear",
        "title": "Preparado para Urso",
        "body": "Uma toca de urso pode conter tesouros valiosos, como os restos de aventureiros menos sortudos que tropeçaram no caminho de um urso faminto. As peles de urso em si são valorizadas como tapetes, enquanto suas garras e presas servem para joias impressionantes ou adornos de armadura. O couro de urso é um excelente recurso para armadura de couro."
      }
    ]
  },
  "creature-guard-dog": {
    "description": "O cão de guarda típico é leal e amado por muitas comunidades. Frequentemente adorado como animal de estimação, se destaca como protetor e rastreador, e pode ser destemido ao defender um mestre querido ou membro da família. As estatísticas apresentadas abaixo funcionam bem para numerosas raças de cão que variam de 9 a 22,5 kg. Cães selvagens também podem usar essas estatísticas, mas sua natureza indomada os torna muito mais imprevisíveis. Caninos ferais são talvez ainda mais perigosos, pois, diferente de seus primos selvagens, cães ferais frequentemente carecem do medo instintivo da humanidade que impede criaturas selvagens de interagir com pessoas.",
    "sections": []
  },
  "creature-harpy": {
    "description": "Harpias são amalgamas de humano e ave, parecendo humanoides ferais com asas, garras e dentes afiados. Usam seu controle ancestral do vento para atrair presas ou até puxar diretamente sua próxima refeição. Gostam de causar confusão e medo em suas presas antes de atacar, acreditando que isso cria um sabor saboroso na carne. Harpias podem comer a maioria das criaturas, mas preferem fortemente presas sencientes — humanos e elfos em particular. Embora harpias comam goblins se estiverem suficientemente famintas, detestam o sabor e evitam comê-los se possível. Isso não conforta goblins, é claro, que têm um medo particularmente forte de harpias.\n\nComo seus ninhos frequentemente fedem a sangue de suas mortes e respingos descuidados de guano, harpias carregam um odor distintamente vil que viajantes astutos associam ao perigo. Harpias que empoleiram perto da civilização fazem melhores esforços para se manter limpas, embora esses esforços tenham resultados mistos.\n\nEm algum lugar entre a sujeira, a maioria dos ninhos tem um santuário dedicado ao senhor demônio Pazuzu. Lendas de harpia o creditam por elevá-las de simples espíritos do ar à sua estação atual, e sua gratidão tipicamente toma a forma de uma figura esboçada num canto empilhado de oferendas. Famílias mais devotas constroem santuários portáteis de madeira que são carregados de ninho em ninho por gerações.\n\nHarpias vivem em grupos familiares ou clãs maiores. A maioria dos adultos mede 1,5 m de altura e pesa cerca de 40 kg. Enquanto algumas usam armas relativamente simples, aquelas que dominam o uso do arco são consideradas heroínas entre seu povo.",
    "sections": [
      {
        "id": "harpy-exiles",
        "title": "Harpias Exiladas",
        "body": "A maioria das harpias é cruel e sádica, mas de vez em quando uma harpia consegue escapar de sua família e se expõe ao mundo mais amplo. Com os olhos abertos, essas harpias exiladas são quase sempre mais moderadas, higiênicas e abertas a interações não combativas."
      }
    ]
  },
  "creature-hell-hound": {
    "description": "A aparência de um cão infernal elimina qualquer dúvida sobre suas origens infernais — carne da cor de piche ardente, dentes afiados como o forcado de qualquer demônio e um manto de fogo do inferno eternamente ardente são todas características marcantes.",
    "sections": []
  },
  "creature-hippogriff": {
    "description": "Com a postura orgulhosa de um grande raptor e a magnificência de um cavalo poderoso, hipogrifos são considerados uma fusão acidental de criaturas ou talvez a criação de um mago deformador de carne com um senso estético apurado. Independentemente de sua origem, esses animais agora são uma visão comum nos céus acima de suas planícies ou colinas favoritas.\n\nHipogrifos têm asas, patas dianteiras e cabeça de uma ave de rapina, com coloração de penas semelhante à de um falcão ou águia, embora alguns criadores tenham conseguido produzir espécimes com penas branco-puras ou carvão-negras. Seu torso, parte traseira e cauda se parecem com os de um cavalo e geralmente são de cor castanha, alazã ou cinza, com alguns pelagens apresentando preto, pinto ou até coloração palomino.\n\nHipogrifos têm tamanho semelhante ao de cavalos grandes. Como seus primos equinos, hipogrifos frequentemente precisam manter os olhos atentos aos céus acima, pois ambos são refeições preferidas de grifos e wiverns famintos. Apenas a velocidade superior dos hipogrifos os protege desses predadores.\n\nHipogrifos são excepcionalmente territoriais e protegem ferozmente as terras sob seu domínio. Tipicamente favorecem pastagens amplas, colinas onduladas e pradarias. Hipogrifos excepcionalmente resistentes fazem seus lares aninhados em nichos de paredes de cânion, de onde vasculham desertos rochosos em busca de coiotes, cervos e o humanoide ocasional. Hipogrifos preferem presas mamíferas, mas pastam após cada refeição para ajudar na digestão.\n\nComo os hábitos de caça dos hipogrifos podem ser perigosos tanto para pecuaristas quanto para seu gado, essas comunidades frequentemente colocam recompensas sobre hipogrifos. Como resultado, hipogrifos empalhados frequentemente decoram tavernas de fronteira e postos remotos ao lado dos restos empalhados de cervos, alces e ursos.\n\nNo entanto, outras comunidades treinam hipogrifos desde o nascimento para serem montados por soldados de elite em combate — o mais notável entre esses grupos na região do Mar Interior é a Companhia Sable de Mercenários na cidade-estado de Korvosa. Às vezes são feitas tentativas de treinar hipogrifos adultos da mesma maneira, mas isso frequentemente se mostra muito mais difícil. Cavaleiros de hipogrifo devem usar selas especiais e técnicas de combate que lhes permitam agir em concerto com sua montaria, lutando efetivamente enquanto evitam interferir no movimento das asas de seu companheiro.",
    "sections": []
  },
  "creature-hobgoblin-archer": {
    "description": "Bandos de soldados hobgoblin tipicamente têm pelo menos um arqueiro entre suas fileiras. Em grupos menores, o arqueiro hobgoblin também serve como capitão daquele bando.",
    "sections": []
  },
  "creature-hobgoblin-soldier": {
    "description": "Soldados compõem a maior parte da sociedade hobgoblin, seja essa sociedade uma aldeia ou uma unidade militar.",
    "sections": []
  },
  "creature-homunculus": {
    "description": "Um homúnculo é um construto servil minúsculo criado por um artífice para servir como espião, batedor, mensageiro ou assistente. Quando um artífice começa a estudar a arte de criar construtos, frequentemente cria um homúnculo primeiro, já que o processo de criação é simples e barato devido a um atalho mágico: o uso do próprio sangue do criador. Isso forja um vínculo entre o homúnculo e seu mestre, fazendo o homúnculo ganhar uma centelha da inteligência do criador, assim como os mesmos valores morais e alguns dos traços básicos de personalidade do criador. Homúnculos deixados por conta própria nunca se afastam muito de seus mestres.\n\nNa maioria dos casos, um homúnculo não sobrevive por muito tempo à morte de seu mestre. Privado de seu criador, um homúnculo perde o foco e se torna cada vez mais autodestrutivo, e alguns acabam se destruindo até a aniquilação. Raramente, um homúnculo com um mestre morto sobrevive ao trauma com a mente intacta, muitas vezes se vendo como filho ou sucessor de seu criador falecido e tentando levar adiante o legado do criador da melhor forma possível. Nesses casos, e se o homúnculo estava em proximidade com seu mestre no momento da morte daquela criatura, uma porção da alma do mestre morto \"infecta\" o homúnculo sobrevivente enquanto segue para a vida após a morte.\n\nIsso não resulta em um homúnculo vinculado à alma de verdade, já que apenas um fragmento da alma fica para trás, mas ainda é suficiente para conceder ao homúnculo uma personalidade maior, livre-arbítrio próprio e, talvez o mais importante, a habilidade de falar. Com o tempo, alguns desses homúnculos \"despertos\" chegam a se convencer de que são a reencarnação de seus mestres anteriores, embora suas personalidades reais nunca atinjam a profundidade e complexidade de uma criatura verdadeiramente viva. No melhor dos casos, são caricaturas do mestre; no pior, tornam-se paródias terríveis e amargas da própria vida. Ainda assim, um homúnculo de livre-arbítrio pode seguir estudos na classe de seu criador, tornando-se uma criatura única com as habilidades dessa classe se o tempo e a sorte permitirem.\n\nHomúnculos são criados a partir de uma mistura de argila, cinza, raiz de mandrágora, água de nascente e meio litro do próprio sangue do criador. É possível que um doador separado forneça o sangue, mas o processo é mais difícil.",
    "sections": [
      {
        "id": "soulbound-homunculi",
        "title": "Homúnculos Vinculados à Alma",
        "body": "A maioria dos homúnculos usa uma dose do sangue de seu criador como centelha de vida, mas é possível usar uma técnica semelhante à usada na criação de uma boneca vinculada à alma para dar a um homúnculo personalidade e a aparência de vida. Esses homúnculos ganham o traço vinculado à alma, perdem imunidade a espírito, podem falar e não têm um vínculo especial com um criador, mas o processo tende a distorcer a alma usada de modo que, na maioria das vezes, o que surge no novo corpo de homúnculo é uma paródia de sua vida anterior. Como tal, homúnculos vinculados à alma geralmente são criados por conjuradores cruéis como método de humilhar e atormentar inimigos derrotados."
      }
    ]
  },
  "creature-hunting-spider": {
    "description": "Aranhas caçadoras são o tipo mais comum de aranha gigante, embora não as maiores.",
    "sections": []
  },
  "creature-hydra": {
    "description": "Hidras são serpentes de múltiplas cabeças, de temperamento péssimo e apetites vorazes, amplamente temidas por suas habilidades de regeneração.",
    "sections": [
      {
        "id": "variant-hydras",
        "title": "Hidras Variantes",
        "body": "Estudiosos de conhecimento bestial podem descrever várias variações de hidra. Embora raras, hidras com mais de cinco cabeças vivem em áreas muito isoladas, às vezes guardando artefatos incrivelmente poderosos. Hidras de miasma lendárias de 12 cabeças habitam pântanos horrivelmente poluídos e perigosos. Talvez o perigo mais inesperado sejam as larvas de hidra recém-chocadas, nascidas famintas em pântanos rasos."
      }
    ]
  },
  "creature-hyena": {
    "description": "Hienas são carnívoras astutas e robustas que lembram muito cães e outros canídeos, embora não sejam canídeos. Embora todas as hienas sejam frequentemente difamadas como comedores de carniça covardes, suas táticas dependem de sua raça específica: hienas-malhadas são caçadoras ativas de matilha que matam a maior parte de suas presas, enquanto hienas-listradas e hienas-pardas são mais propensas a ser solitárias e necrófagas. Suas mandíbulas são excepcionalmente poderosas, permitindo que hienas agarrem uma vítima e a puxem para o resto da matilha.",
    "sections": []
  },
  "creature-imp": {
    "description": "Diabretes são infiltradores e corruptores malignos que, apesar de sua estatura diminuta, são mais do que capazes de influenciar sutilmente um indivíduo de vontade fraca a realizar atos cada vez mais malignos ao longo do tempo. Um diabrete frequentemente concorda em servir um mortal e age de forma dócil e leal em um plano de longo prazo para eventualmente fazer seu mestre ser morto ou condenar sua alma. Diabretes nascem diretamente dos Planos Exteriores, em vez de almas mortais, e assim servem fora de quaisquer hierarquias malignas, concedendo-lhes liberdade para perseguir suas especialidades. Apesar de medir apenas 60 cm de altura, diabretes podem ser combatentes ferozes, voando para fora do alcance e ficando invisíveis para escapar se as chances virarem contra eles.",
    "sections": [
      {
        "id": "imps-of-many-planes",
        "title": "Diabretes de Muitos Planos",
        "body": "Como ratos infestando cidades, diabretes infestam os Planos Exteriores malignos — Abaddon, as Fendas Exteriores e, sobretudo, Hell. Diabretes adoram aprender os truques dos diabos, para melhor tentar mortais e confinar almas. Ao longo de séculos passados nos vários planos, diabretes começam a assumir as características do ambiente que habitam, muitas vezes parecendo queimados pelas chamas se vêm de Hell, cáusticos e monstruosos se vêm das Fendas Exteriores, e de olhos vermelhos e fétidos se vêm de Abaddon."
      }
    ]
  },
  "creature-jinkin": {
    "description": "Jinkins são artesãos sádicos que roubam e sabotam objetos e se orgulham do poder de amaldiçoar coisas preciosas. Guardam rancor e tramam planos complicados de vingança quando se sentem ofendidos — por exemplo, quando alguém ousa remover uma de suas maldições. Raramente contentes com simples estragos, jinkins também se deleitam em tortura e assassinato, embora prefiram levar vítimas a armadilhas feitas para capturar ou incapacitar, em vez de matá-las de imediato. Fossos profundos são método favorito: quem sobrevive à queda enfrenta morte lenta por fome e sede enquanto jinkins se reúnem na borda para zombar e atormentar.",
    "sections": []
  },
  "creature-kobold-scout": {
    "description": "A maioria dos kobolds encontrados fora de uma toca ou covil bem defendido são batedores kobold, treinados para espreitar e caçar. Também costumam estar no meio da luta quando uma toca é invadida, ganhando tempo para os companheiros armarem armadilhas e emboscadas.",
    "sections": []
  },
  "creature-kobold-warrior": {
    "description": "O kobold típico treina combate em túneis, aprendendo a usar armas simples que funcionam em espaços estreitos. Conseguem golpes sorrateiros contra inimigos desprevenidos, mas fogem para a segurança com a mesma rapidez quando não superam os inimigos em pelo menos dois para um.",
    "sections": []
  },
  "creature-leaf-leshy": {
    "description": "Leshys das folhas são protetores diminutos de florestas, vestidos com armadura e chapéus feitos de frutas, flores ou folhas. Gostam de batalhas de mentira, mas agem com cautela nas de verdade.",
    "sections": []
  },
  "creature-leopard": {
    "description": "Leopardos estão entre os menores dos grandes felinos, mas ainda são criaturas perigosas de enfrentar. As estatísticas de leopardo também servem para panteras negras, leopardos-das-neves com manchas brancas ou onças-pardas de pelagem amarelada.",
    "sections": []
  },
  "creature-lion": {
    "description": "Leões são caçadores cooperativos que emboscam presas perigosas em grupos de leoas que trabalham juntas para cercar e matar. Leões machos costumam ser maiores, com juba longa, e quando caçam tendem a fazê-lo sozinhos.",
    "sections": []
  },
  "creature-lizardfolk-defender": {
    "description": "Um defensor povo-lagarto protege os jovens, guarda o assentamento e, quando não há outra opção, serve como soldado em tempos de guerra. Erguem-se de bom grado em defesa dos parentes, mas não se deleitam em batalha. Um defensor iruxi prefere repelir intrusos e deixá-los fugir com a certeza de que perderam, na esperança de que a notícia evite novas invasões — mas não são ingênuos. Iruxis entendem a necessidade de vingança e, quando deixam um inimigo escapar, não esquecem.",
    "sections": []
  },
  "creature-lizardfolk-scout": {
    "description": "Batedores iruxi são os povo-lagarto mais encontrados por aventureiros: exploradores e caçadores pouco sentimentais que passam a maior parte da vida em movimento, patrulhando os territórios do enclave. Se intrusos forem expulsos, cabe aos batedores iruxi rastreá-los, observá-los e aprender seus costumes e fraquezas para relatar à comunidade e ajudar na defesa contra possíveis represálias.",
    "sections": []
  },
  "creature-lizardfolk-stargazer": {
    "description": "A tradição de astrologia e de olhar as estrelas para navegação e prognóstico é antiga na sociedade iruxi, e seus astrólogos sábios e observadores estão entre os membros mais respeitados do povo. Mesmo o astrólogo mais humilde, como o apresentado aqui, domina magias primordiais úteis para ajudar os parentes; em assentamentos iruxi maiores, astrólogos empunham poderes ainda maiores.",
    "sections": []
  },
  "creature-merfolk-warrior": {
    "description": "Guerreiros povo-marinho formam a maior parte das milícias dos vastos reinos subaquáticos e enfrentam agressores em potencial de frente, com força implacável.",
    "sections": []
  },
  "creature-minotaur-hunter": {
    "description": "Um minotauro é um humanoide grande com traços bovinos — chifres, cascos e uma camada de pelos que cobre o corpo inteiro. A cabeça também lembra a de um touro ou vaca, embora com olhos cheios de curiosidade ou fúria, conforme o temperamento. Embora muitos os vejam como brutos agressivos por causa do tamanho e da fama, muitos minotauros são artesãos habilidosos que passam boa parte da vida aperfeiçoando o ofício. Comunidades minotauro tendem a ser fechadas e ficam no coração de um labirinto astuto ou num emaranhado de cavernas subterrâneas.\n\nO mito que muitos minotauros contam sobre sua origem envolve um pedreiro que vivia na antiga Iblydos. Depois de insultar sem querer um deus-herói, foi amaldiçoado a tornar-se o primeiro minotauro. Retirou-se para uma série de cavernas sob um templo que havia construído, mas continuou o trabalho, esculpindo estátuas de pedra para quem ousasse atravessar os corredores subterrâneos.\n\nÀs vezes, um minotauro solitário é compelido, exilado ou escolhe viver sozinho num labirinto, toca ou ruínas antigas. Essa solidão o transforma em atormentador monstruoso que se deleita em caçar quem tropeça em seu covil. Aproxima-se devagar da presa, saboreando o terror de quem se perde em corredores que o minotauro conhece de cor. Só então investe para matar, derrubando inimigos com golpes poderosos ou empalandando-os nos chifres afiados. Infelizmente, o mundo costuma julgar todos os minotauros pelas histórias desses caçadores solitários e cruéis.",
    "sections": [
      {
        "id": "variant-minotaurs",
        "title": "Minotauros Variantes",
        "body": "A maioria dos minotauros é uma mistura simples de humanoide musculoso e touro furioso, mas variantes incomuns e minotauros únicos podem ter traços físicos e habilidades diferentes. Minotauros de chifres grandes podem empalar inimigos ao obter sucesso crítico numa investida, mas não têm a habilidade Medo Caçado. Minotauros peludos são cobertos de pelos grossos da cabeça aos pés, o que lhes permite viver em ambientes gelados com facilidade e concede resistência a dano de frio, mas os cascos são largos e pesados, impossibilitando a investida."
      }
    ]
  },
  "creature-mitflit": {
    "description": "Mitflits são covardes autodepreciativos e lamentáveis, facilmente intimidados à servidão por outras criaturas ou até por líderes mitflit um pouco mais fortes. Domesticam insetos, aranhas e outros vermes pequenos como aliados fiéis. Perderam a maior parte da magia ancestral, o que os deixa incompletos, cheios de dúvida e insegurança. Mitflits encontram companhia nas outras criaturas humildes do mundo e formam laços fortes de amizade com vermes — os únicos seres que parecem dispostos a aceitá-los. Uma estrutura social, mesmo quando são maltratados, preenche em parte o vazio na personalidade da maioria dos mitflits, e eles raramente se rebelam ou explodem, a menos que a raiva atinja o limite.",
    "sections": []
  },
  "creature-mummy-guardian": {
    "description": "A maioria dos guardiões múmia foi criada por mestres cruéis e egoístas para proteger tumbas de intrusos. O método tradicional de criar um guardião múmia é laborioso e sádico, e começa bem antes de a pobre alma a ser transformada estar morta. A vítima é ritualmente privada de comida nutritiva e alimentada com especiarias estranhas, agentes conservantes e toxinas destinadas a acelerar a dessecação da carne. A vítima permanece imóvel, mas dolorosamente consciente nas fases finais, enquanto suas entranhas agora inúteis são extraídas. Depois é envolta em faixas funerárias e sepultada num sarcófago encantado por necromancia para aguardar ordens num futuro possivelmente distante. É possível usar outros métodos para criar um guardião múmia a partir de um cadáver, mas quem busca esses mortos-vivos como guardiões na vida após a morte costuma achar que o resultado é inferior — a dor e o tormento da morte por mumificação seriam passo essencial do processo.\n\nIndependentemente do método de criação, guardiões múmia são mais que cascos de carne e osso. Retêm versões fragmentadas e distorcidas da mente, com memórias suficientes da personalidade em vida para alimentar a raiva morta-viva e a inveja de quem ainda vive. Essa fúria ardente só se intensifica ao longo dos séculos de espera numa cripta até ter chance de agir; assim, quando a maioria dos guardiões múmia é despertada por ladrões de túmulo ou aventureiros, não param diante de nada em busca de massacre por maldade.",
    "sections": []
  },
  "creature-ogre-glutton": {
    "description": "Glutões ogro levam o ato de se alimentar a um extremo horrível, capazes de abrir a boca já cavernosa o suficiente para engolir um halfling inteiro. Histórias de glutões ogro enganados para comer escudos com lâmina de navalha ou barris cheios de carne envenenada são comuns, mas pouco consolo para quem foi devorado vivo por esses gigantes famintos. Além dos modos sádicos à mesa, glutões ogro têm talento perturbador para inventar \"jogos\" violentos que são pouco mais que torturas prolongadas; ainda assim, quem consegue vencer um glutão nas regras do próprio jogo pode irritá-lo o bastante para que o birra resultante dê chance de fuga aos cativos.",
    "sections": []
  },
  "creature-ogre-warrior": {
    "description": "Os ogros mais simples são blocos de músculo com olhos odiosos, rostos disformes e corpos malformados. Sempre ávidos por estrago e assassinato, guerreiros ogro voltam-se contra os parentes quando falta gente menor para atormentar; quem lidera ogros faz o possível para mantê-los distraídos com novas oportunidades de saque e ruína.",
    "sections": []
  },
  "creature-orc-commander": {
    "description": "Quando orcs saqueiam, o mais forte é escolhido líder, apoiado por irmãos e família imediata. Se a liderança for contestada, os candidatos disputam o controle com demonstrações de proeza física ou discursos inflamados.",
    "sections": []
  },
  "creature-orc-scrapper": {
    "description": "Como unidade de combate orc mais comum, brigões orc são lutadores ferozes que contam com força implacável, e não experiência de batalha, para provar valor e tentar subir na hierarquia do clã.",
    "sections": []
  },
  "creature-orc-veteran": {
    "description": "Veteranos orc sobreviveram a vários conflitos sangrentos e caóticos e saíram do outro lado com cicatrizes e experiência que os tornam adversários ainda mais perigosos.",
    "sections": []
  },
  "creature-pegasus": {
    "description": "O pégaso é um cavalo alado cobiçado pela capacidade de servir como montaria aérea. Infelizmente para quem deseja um pégaso treinado para sela, pégasos são criaturas selvagens e não aceitam de bom grado cavaleiros, mesmo bem-intencionados.\n\nPégasos resistem ativamente a ser montados ou controlados por criaturas malignas, tentando derrubar um cavaleiro indesejado a cada oportunidade. Um pégaso típico tem cerca de 1,8 m na cernelha, pesa cerca de 675 kg e tem envergadura de asas de 6 m.\n\nPégasos são feras altamente inteligentes, com forte senso de orgulho e honra. A melhor forma de conquistar um pégaso é falar com graça e oferecer presentes dignos de uma criatura tão majestosa. Quem busca a montaria por causa nobre ou missão virtuosa tem muito mais facilidade em obter o favor do pégaso. Mesmo assim, um pégaso nunca aceita freio ou sela — por motivos práticos (uma sela comum de cavalo atrapalha as asas) e por orgulho de criatura livre e indomada.\n\nNa natureza, pégasos vivem em pequenos rebanhos e estabelecem territórios em montanhas remotas, relativamente seguros de caçadores e ladrões de potros. Às vezes descem para terrenos mais baixos na época em que os potros aprendem a voar. Amadurecem no mesmo ritmo dos cavalos e podem cruzar com outros equídeos, embora o resultado costume ser um potro com os traços do genitor menos mágico. Em raras ocasiões, o cruzamento de um pégaso com um unicórnio pode gerar um unicórnio alado com características de ambos os pais e senso de retidão incomparável.\n\nAlguns pégasos carregam o sangue de um ancestral poderoso e heroico. Esses campeões da espécie dedicam longas vidas à busca da justiça. Possuem habilidades sobrenaturais poderosas para essa luta, como resistência a fogo e veneno, imunidade à petrificação e ataques de casco sagrados.",
    "sections": [
      {
        "id": "corrupted-pegasi",
        "title": "Pégasos Corrompidos",
        "body": "Quando influências sinistras — como uma praga necromântica ou um vento vil dos planos infernais — se espalham por uma região selvagem, pégasos podem ser corrompidos. Esses pégasos perversos têm as mesmas estatísticas dos apresentados aqui, mas são muito mais violentos."
      }
    ]
  },
  "creature-pixie": {
    "description": "Insaciavelmente curiosas, excessivamente excitadas e um pouco travessas, pixies são vagantes e enganadoras que usam pó de pixie para criar situações caprichosas e também para se defender. Orgulham-se da habilidade com arco, mesmo quando não usam flechas para aplicar males mágicos. Costumam treinar atirando em gotas de orvalho ou cortando cipós e fios de cabelo. Outras criaturas frequentemente têm dificuldade em entender o jeito rápido e atropelado de falar de uma pixie.",
    "sections": [
      {
        "id": "variant-pixie-arrows",
        "title": "Flechas Variantes de Pixie",
        "body": "Pixies podem encantar flechas com grande variedade de efeitos, embora quase todos sejam feitos para encantar ou confundir, nunca mutilar. Algumas flechas podem emular efeitos de magias como _confusion_, _fear_, _laughing fit_ e até _suggestion_."
      }
    ]
  },
  "creature-plague-zombie": {
    "description": "Zumbis da peste estão infestados de contagens horríveis.",
    "sections": []
  },
  "creature-poltergeist": {
    "description": "Quando uma criatura morre e, por qualquer motivo, seu espírito não consegue ou não quer deixar o local da morte, pode manifestar-se como poltergeist: um espírito inquieto e invisível que ainda manipula objetos físicos. Muitos poltergeists pereceram de forma que resultou ou levou a trauma emocional extremo.",
    "sections": [
      {
        "id": "disturbed-rest",
        "title": "Descanso Perturbado",
        "body": "Uma das formas mais comuns de um poltergeist surgir é quando seu local de sepultamento é profanado pela construção de uma habitação. Em geral é acidente, mas algumas criaturas criam poltergeists de propósito para servir como guardiões."
      },
      {
        "id": "poltergeist-treasure",
        "title": "Tesouro do Poltergeist",
        "body": "Um poltergeist precisa de objetos para arremessar como armas, e ao longo de séculos de uso só sobrevivem itens resistentes. Talheres de prata, machadinhas e livros podem ser encontrados na coleção de um poltergeist."
      }
    ]
  },
  "creature-pugwampi": {
    "description": "Maldosos, de focinho canino e covardes, pugwampis tiram prazer desproporcional dos acidentes e tropeços de outras criaturas — algo que acontece com frequência por causa da aura sobrenatural de má sorte que esses gremlins projetam. Gostam de preparar pegadinhas com espinhos, excremento, fossos cheios de aranhas e tormentos parecidos. Pugwampis são um tanto surdos e costumam gritar alto uns com os outros quando não estão escondidos. Muitos adoram kholos como deuses e aspiram a ser como eles. Kholos, por outro lado, odeiam pugwampis por causa da bajulação bajuladora.",
    "sections": []
  },
  "creature-rat-swarm": {
    "description": "Um enxame de ratos pode causar caos total numa casa ou comércio. Contrair peste pútrida fica muito mais fácil quando dezenas desses vermes agitados ou famintos mordem vítimas em massa, o que torna a caça a ratos uma profissão viável em muitas partes do mundo, enquanto moradores desesperados buscam alívio da propagação da doença.",
    "sections": [
      {
        "id": "rats-and-disease",
        "title": "Ratos e Doença",
        "body": "Ratos têm fama de animais ferozes e agressivos que atacam despensas em grande número e espalham doença. Embora sejam imunes aos efeitos mais graves da própria peste pútrida, a doença os torna imprevisíveis e agressivos. Algumas populações de ratos carregam doenças ainda mais letais, como a peste bubônica."
      }
    ]
  },
  "creature-redcap": {
    "description": "Redcaps são fey sádicos e caprichosos que se deleitam em derramar sangue e assassinar. Embora sejam mais famosos por aparecer como velhos barbudos, redcaps de outros gêneros não são menos temíveis ou cruéis. No fundo, porém, são valentões covardes, intimidados por qualquer coisa mais forte — traço que os leva a temer e desprezar símbolos de divindades.\n\nMuitos contos de fadas explicam como redcaps ganham poder ao mergulhar os gorros que lhes dão o nome em sangue fresco. Igualmente icônicas nesses fey cruéis são as botas de ferro, e o som metálico das solas batendo no chão de pedra é dissonante e perturbador — sobretudo para quem reconhece o barulho pelo que é. Redcaps costumam ter apenas cerca de 90 cm de altura, com postura curvada, orelhas pontudas, dentes tortos e cabelos longos, brancos e emaranhados.\n\nEmbora pouco provável que sintam afeto verdadeiro, redcaps encontram camaradagem no assassinato. Pequenos grupos viajam juntos, compartilhando mortes sangrentas e relembrando feitos brutais. Detestam a companhia da maioria das outras criaturas, com a notável exceção do fey felino chamado elananx.",
    "sections": [
      {
        "id": "stomping-ground",
        "title": "Território",
        "body": "Diferente de alguns fey, redcaps não personificam um recurso natural ou ambiente específico, então podem ser encontrados quase em qualquer lugar. Preferem áreas que permitam esconder-se ou pelo menos ganhar cobertura com movimento rápido, como florestas, montanhas e túneis e cavernas subterrâneas. Às vezes ocupam construções abandonadas, especialmente celeiros e galpões."
      }
    ]
  },
  "creature-riding-dog": {
    "description": "Cães de montaria incluem cães maiores, como mastins, cães-de-caça e huskies, criados com frequência por halflings e gnomos para servir de montaria. São tão leais e devotos aos mestres quanto cães de guarda e ferozes em batalha, levem ou não cavaleiro. Como os de guarda, esses cães grandes podem ser selvagens ou ferais e, nesses casos, rivalizar com matilhas de lobos no perigo que representam para moradores de áreas rurais.",
    "sections": []
  },
  "creature-satyr": {
    "description": "Para um sátiro, a vida é uma festa e todos estão convidados. Notórios pela hedonismo, esses fey acreditam que não há beleza maior que a encontrada em canção, bebida, banquetes indulgentes e prazeres carnais. Sátiros usam canções encantadoras e charme natural para encorajar todo tipo de gente a seguir os verdadeiros desejos e se libertar das regras da sociedade. Isso costuma envolver atrair mortais para festas barulhentas ou encontros amorosos em clareiras ao luar. Se um possível companheiro rejeita as investidas de um sátiro, ele perde o interesse na conversa e parte em busca de festeiros mais receptivos.\n\nO estilo de vida do sátiro não deixa espaço para casos longos ou amizades duradouras. Quando a festa acaba ou o desejo se satisfaz, o sátiro some de volta à floresta. A prole que deixa para trás são sátiros, e em geral são levados do berço por outros fey em vez de ficarem aos cuidados de mortais. Sátiros são sempre machos.\n\nA beleza intocada da floresta é sagrada e preciosa para um sátiro. Intrusos brutais que derrubam árvores ou massacram animais sem comê-los arriscam despertar a ira do sátiro. Um sátiro assim provocado usa magias para minar inimigos e tenta eliminá-los com emboscadas brutais ou liderando uma investida de animais da floresta.\n\nOutros fey, especialmente os mais benevolentes, veem sátiros como primos grosseiros e embaraçosos. Raramente são hostis, mas a maioria os acha insuportáveis e aconselha mortais de quem gostam a manter distância das clareiras dos sátiros.",
    "sections": [
      {
        "id": "satyr-pipes",
        "title": "Flautas do Sátiro",
        "body": "O equipamento de um sátiro é valioso, sobretudo suas finas flautas de pan. Conforme o tipo de música que preferem tocar, sátiros podem conjurar magias de 4º círculo diferentes, como _laughing fit_ ou _paranoia_. Sátiros também escondem estoques de álcool, comida rica e peças de arte fina (especialmente arte erótica) em ocos e clareiras que frequentam."
      }
    ]
  },
  "creature-scarecrow": {
    "description": "Uma coleção desconjuntada de materiais em forma humana, o construto espantalho é indistinguível de um espantalho comum até ganhar vida com rangidos lentos. Ao animar-se, a face de abóbora esculpida ou de pano de saco explode em chama arcana, espalhando medo pelo ar ao redor. Cada espantalho é feito à mão e único na aparência, embora a maioria tenha de 1,5 a 1,8 m de altura e seja feita de madeira, pano, corda, palha, serragem, cascas e espigas descartadas e materiais parecidos, todos vestidos com trajes rurais esfarrapados. Essa construção rudimentar torna o espantalho um tanto frágil, propenso a quebrar membros no aperto da batalha. Ainda assim, a estrutura é adaptável, permitindo remodelar outra parte de si em membro com garras ou empunhar um pedaço decepado para golpear inimigos.\n\nQuando um espantalho é criado, deve ser ungido com uma gota do sangue do criador em cada olho. O sangue penetra o material e desvia um minúsculo fragmento da alma do criador — não o bastante para ferir o criador, mas mais que suficiente para imbuir o espantalho com intelecto instintivo que lhe permite seguir ordens tão ansiosamente quanto um cão de guarda bem treinado (se mal-humorado). Quando um espantalho é destruído, o sangue vaza de volta pelos olhos, mas a porção da alma do criador nunca retorna.",
    "sections": [
      {
        "id": "odds-and-ends",
        "title": "Entre Dois Mundos",
        "body": "Espantalhos ocupam um espaço liminar habitável por criaturas espirituais. Fantasmas em particular podem usar possessão maligna num espantalho como se fosse criatura viva, servindo-se deles como veículos para escapar da natureza presa ao local e espalhar ainda mais assassinato e estrago."
      }
    ]
  },
  "creature-sea-hag": {
    "description": "Bruxas do mar especializam-se em magia de transformação, caçando quem está desesperado para mudar algum aspecto da aparência física. Alvos frequentes incluem quem sofre insegurança com o corpo ou quem deseja viver em outro ambiente, como criaturas aquáticas que querem morar em terra. Essas bruxas são conhecidas por tentar vítimas desesperadas com barganhas trágicas e excruciantes, embora também se deleitem em afogar e comer marinheiros que se aproximam demais de suas moradias.\n\nUma bruxa do mar tem metade superior humanoide e metade inferior de polvo, com pele translúcida e luzes brilhantes visíveis sob a carne. Bruxas do mar podem formar covens, mas sua natureza aquática muitas vezes impede que entrem em covens mistos com outros tipos de bruxa.",
    "sections": []
  },
  "creature-sewer-ooze": {
    "description": "Essas massas amorfas de esgoto e outros detritos percorrem bueiros imundos sob cidades grandes e pequenas.",
    "sections": []
  },
  "creature-shadow": {
    "description": "Os mortos-vivos misteriosos conhecidos como sombras espreitam em lugares escuros e se alimentam de quem se afasta demais da luz.",
    "sections": []
  },
  "creature-skeletal-champion": {
    "description": "Esses esqueletos retêm a astúcia que tinham em vida.",
    "sections": []
  },
  "creature-skeleton-guard": {
    "description": "Os servos esqueléticos mais comuns são meros guardiões.",
    "sections": []
  },
  "creature-slurk": {
    "description": "O slurk é uma fera anfíbia pegajosa, com presas, encontrada em covis e cavernas subterrâneas. Tem duas presas enormes que usa para golpear presas e lutar com slurks rivais. Com a habilidade natural de escalar paredes e grudar-se sem esforço em tetos, exploradores de cavernas desatentos podem acabar do lado errado dessas presas de marfim formidáveis.\n\nSlurks exalam dois tipos muito diferentes de secreções fedorentas pela pele branco-pálida. Pústulas grandes nas costas pingam uma gosma resinosa pegajosa que endurece rápido ao contato com o ar. Ao flexionar a pele, o slurk pode estourar essas pústulas na direção de intrusos, cobrindo inimigos de gosma pegajosa e limitando muito a capacidade de resistir aos outros ataques do monstro, inclusive aos efeitos da outra secreção. Glândulas no ventre excretam uma gordura incrivelmente escorregadia e fétida, que protege o slurk dos efeitos imobilizadores da própria gosma das costas e ainda dificulta muito agarrá-lo e capturá-lo. A melhor forma de descobrir se há um slurk por perto é procurar torrões endurecidos dessa gordura, que se acumulam e secam em cantos de cavernas e entre pilhas de pedras onde slurks descansam entre as refeições.\n\nAcredita-se que slurks sejam descendentes de uma tentativa fracassada de anões de domesticar e criar sapos subterrâneos grandes como alimento e animais de trabalho. Apesar desse aparente fracasso, outros que vivem no subsolo frequentemente fazem amizade com slurks. Os anfíbios pegajosos são extremamente desejáveis para kobolds (página 210), que agora os domesticam e treinam como montarias e guardiões poderosos. Embora outras criaturas, especialmente boggards, às vezes treinem slurks como guardiões, kobolds continuam sendo quem mais os usa. Um kobold montado num slurk costuma se esconder nas bordas superiores de uma caverna, usando altura e surpresa para atormentar inimigos com ataques à distância. Cavaleiros kobold também aproveitam a capacidade de escalada do slurk e investem contra inimigos pelas paredes da caverna.",
    "sections": [
      {
        "id": "slurk-riding",
        "title": "Montaria em Slurk",
        "body": "Enquanto um slurk estiver disposto ou domado, uma criatura pelo menos um tamanho menor que o slurk pode usá-lo como montaria. A gosma das costas do slurk concede ao cavaleiro +2 de bônus de circunstância contra tentativas de desmontá-lo fisicamente."
      }
    ]
  },
  "creature-spider-swarm": {
    "description": "Abundância de comida, eclosão súbita de um ninho de ovos ou influência mágica podem fazer aranhas menores se reunirem em massas terríveis e letais.",
    "sections": []
  },
  "creature-tiger": {
    "description": "Tigres são caçadores solitários e territoriais que usam as listras para se misturar às florestas e selvas que habitam e preferem atacar de surpresa.",
    "sections": []
  },
  "creature-twigjack": {
    "description": "Twigjacks \"de verdade\", como se consideram, vivem em florestas selvagens ao lado dos fey que idolatram.",
    "sections": []
  },
  "creature-unicorn": {
    "description": "Símbolos de graça e pureza, unicórnios lembram cavalos orgulhosos e nobres. Costumam ter pelagem branca pura, mas são mais conhecidos pelo chifre único e delicado que se estende do centro da testa. Embora frequentemente sirvam como protetores de regiões selvagens intocadas e lugares sagrados, são muito cobiçados por causa dos chifres, que dizem possuir propriedades mágicas potentes. Para muitos, a simples ideia de caçar uma criatura tão magnífica na esperança de decepar o chifre é absolutamente repugnante. De fato, um unicórnio sem chifre é visão lamentável, e poucos sobrevivem muito tempo na natureza.\n\nUnicórnios são encontrados quase exclusivamente em áreas remotas e imaculadas de região selvagem. Às vezes associados a divindades de alinhamento bom, outras vezes à natureza e aos fey, unicórnios são sempre conhecidos pela retidão e nobreza. Desconfiam, no mínimo, da maioria dos humanoides, em grande parte por causa da tendência de caçadores de caçá-los pelos chifres, mas rumores dizem que têm fraqueza por quem é puro de coração e espírito. Apesar de alguns contos, unicórnios são igualmente capazes de reconhecer pureza em pessoas de todos os gêneros.",
    "sections": [
      {
        "id": "alicorn",
        "title": "Alicorn",
        "body": "Em círculos alquímicos e ocultistas, \"alicorn\" é o termo para o material que compõe o chifre de um unicórnio, também usado para descrever qualquer objeto feito desse chifre. Observe que em muitos mercados a venda de alicorn é ilegal, e quem tenta vendê-lo é visto com repulsa — ou pior."
      }
    ]
  },
  "creature-vampire-bat-swarm": {
    "description": "Embora o morcego-vampiro típico tenha envergadura de cerca de 18 cm e não represente ameaça significativa a presas maiores sozinho (e de fato esses sugadores de sangue podem se alimentar sem que vítimas adormecidas percebam), algumas espécies incomumente agressivas caçam em enxames letais. Uma nuvem turbilhonante de morcegos-vampiro é muito mais perigosa que a soma de suas partes e é capaz de infligir número avassalador de feridas sangrantes num intervalo assustadoramente curto.",
    "sections": []
  },
  "creature-viper": {
    "description": "Cada membro desta família de serpentes venenosas tem presas longas e articuladas que injetam veneno potente na presa. Víboras diferentes injetam tipos diferentes de veneno, que podem causar paralisia, dor extrema e inchaço, coagulação do sangue ou até a parada súbita do coração da vítima.",
    "sections": []
  },
  "creature-warg": {
    "description": "Wargs caçam em matilhas como lobos, mas o gosto por zombar das vítimas os torna fáceis de distinguir dos primos. Orcs e hobgoblins frequentemente recrutam wargs. A maioria aceita esse arranjo de bom grado, mas se a comida acabar, wargs não hesitam em incluir carne goblinoide na dieta.",
    "sections": []
  },
  "creature-wererat": {
    "description": "Homens-rato tendem a ser oportunistas egoístas, avarentos e paranoicos por causa da maldição. Como costumam viver em áreas metropolitanas onde podem se esconder à vista de todos, praticamente qualquer morador da cidade pode ser um homem-rato disfarçado — do lojista quieto ao mestre do crime da cidade. A agitação das multidões e incontáveis buracos de rato fazem de guetos e favelas lares favoritos dos homens-rato, especialmente porque nesses bairros pobres podem matar por ganância ou medo com pouca chance de as autoridades notarem. Em algumas cidades, homens-rato comandam guildas de ladrões ou organizações criminosas inteiras, e a entrada exige submeter-se de bom grado à mordida amaldiçoada do homem-rato. Homens-rato se parecem muito com ratfolk em forma híbrida, exceto por possíveis diferenças de tamanho, mas ratfolk não têm simpatia por homens-rato.",
    "sections": []
  },
  "creature-werewolf": {
    "description": "A maldição do lobisomem — conhecida como licantropia por muitos — instila nos portadores a sede de sangue faminta e os instintos predatórios do lobo. Lobisomens tendem a viver à margem da sociedade ou em pequenos assentamentos onde, em forma humanoide, trabalham como operários, caçadores, fazendeiros ou armadilheiros. À noite, porém, esses mesmos aldeões se transformam em assassinos violentos e perseguidores sádicos que caçam os vizinhos. Lobisomens são o licantropo por excelência, o primeiro que vem à mente quando a maioria fala desses seres.\n\nEmbora a maioria dos lobisomens esconda a maldição adotando vida solitária, alguns mantêm a mentalidade de matilha dos lobos de verdade. Um pequeno grupo assim forma uma matilha quase familiar, com o lobisomem mais velho ou mais poderoso como líder. Novos membros são escolhidos à mão e inculcados na família conforme sua influência cresce.",
    "sections": []
  },
  "creature-wight": {
    "description": "Wights são mortos-vivos inteligentes gerados por ciclos inescapáveis de rancor. Esse rancor pode vir da própria vontade maligna em vida ou ser instilado por rituais necromânticos, em geral envolvendo profanação de locais de sepultamento. Wights costumam assombrar cemitérios, catacumbas ou outros lugares dos mortos. Sua fome é voltada aos vivos — aqueles cujos corações batem e o calor rubro inspira ódio visceral.\n\nExistem tantos tipos de wight quanto tipos de pessoas de que podem ser criados. Brutamontes imensos, espreitadores ágeis e artesãos astutos geram wights diferentes, cada um com seu nicho. O ambiente também influencia habilidades e defesas especiais. Wights de geada, por exemplo, aparecem em partes do mundo onde exposição ao frio é morte comum e o ressentimento de ficar abandonado na natureza é fonte frequente de rancor. Duráveis e sustentados por energia do vazio, wights resistem a ambientes hostis sem apodrecer como alguns mortos-vivos menores.\n\nUm único wight pode causar estrago significativo se for compelido a erguer-se da tumba. Como criaturas mortas sob a maldição de um wight também podem tornar-se wights, basta um wight e um punhado de visitantes azarados do cemitério para criar uma horda verdadeira desses mortos-vivos. Por isso, sacerdotes e aventureiros experientes sabem que a melhor solução para um problema de wight é erradicação rápida e total. É preciso cuidado, porém, para destruir os descendentes wight antes de tentar destruir o wight pai, pois descendentes sem mestre ganham a capacidade de criar descendentes próprios.",
    "sections": []
  },
  "creature-will-o-wisp": {
    "description": "Bolas malévolas de luz colorida, fogos-fátuos assombram pântanos e florestas solitários, onde atraem viajantes desavisados para o perigo. Fogos-fátuos podem variar a cor e a iluminação que emanam e se deleitam em imitar lanternas balançando ou fogueiras distantes para desviar viajantes perdidos ou desorientados de trilhas seguras. Podem apagar a iluminação por completo e ficar invisíveis — e gostam de fazer isso quando as vítimas já estão completamente perdidas e perceberam que a luz distante não as leva à segurança. Mesmo invisíveis, porém, um fogo-fátuo raramente se afasta muito do alvo, pois se alimenta do pânico e do medo que suas vítimas sentem.\n\nSob o brilho, o corpo de um fogo-fátuo é uma bola esponjosa de cerca de 30 cm de diâmetro e pesa menos de 2,5 kg. Embora a maioria dos fogos-fátuos seja apenas um orbe translúcido e sem traços, ganhando definição só na iluminação mutável que criam, alguns têm manchas escuras que, vistas de perto, lembram uma caveira. Fogos-fátuos não precisam de alimento mundano e, de fato, não conseguem consumir matéria de nenhum tipo; encontram toda a sustentação de que precisam no terror de criaturas próximas. Por isso, gostam de trabalhar ao lado de mortos-vivos que provocam terror nas vítimas. Fogos-fátuos vivem muito, se não são efetivamente imortais, e têm boa memória. Um fogo-fátuo dominado ou derrotado pode ser boa fonte de lendas e informação, embora obter essa cooperação de um monstro tão sinistro não seja tarefa fácil.\n\nFogos-fátuos habitam pântanos e florestas desolados e costumam ser ativos no crepúsculo e depois do anoitecer. Por isso, relutam em levar vítimas a áreas imediatamente fatais, como quedas abruptas, e preferem perigos onde as vítimas sofrem por muito tempo, como bolsões de ar viciado ou venenoso, trechos de areia movediça e covis de monstros maiores. Segundo os fogos-fátuos, tipos diferentes de medo têm nuances sutis de sabor. O pavor lento que rói o estômago de quem percebe aos poucos que está perdido tem gosto muito diferente do terror súbito e absoluto diante de um monstro imponente. Por isso, fogos-fátuos tentam variar as formas de induzir terror na presa, para não enjoar de certos \"sabores\" de medo.",
    "sections": [
      {
        "id": "eyes-of-the-dead",
        "title": "Olhos dos Mortos",
        "body": "A deusa anciã Nhimbaloth, a chamada \"Morte Vazia\", é tida por muitos como a origem de todos os fogos-fátuos. Cultistas de Nhimbaloth afirmam que ela não tem forma verdadeira, sendo apenas uma presença que todos sentem quando estão em perigo de uma morte inútil e fútil. Esses mesmos cultistas sustentam que todos os fogos-fátuos são os olhos de Nhimbaloth, e que por meio dessas criaturas devoradoras de medo ela observa todos os mundos a partir de um reino indizível além até mesmo do próprio conceito de morte."
      }
    ]
  },
  "creature-wolf": {
    "description": "Lobos vivem e caçam em matilhas que, ao contrário do que muitos acreditam, não são lideradas pelo mais forte do grupo, mas em geral consistem num casal acasalado, seus filhotes e descendentes juvenis de temporadas anteriores. Os filhos em geral deixam a matilha dos pais ao atingir a maturidade, quando buscam parceiros para formar matilhas próprias em outro lugar.\n\nHumanoides tradicionalmente não são vistos como presas por lobos, mas circunstâncias extraordinárias podem levar esses animais a atacar pessoas, especialmente nos meses de inverno e em outras situações em que presas tradicionais (principalmente cervos e alces) escasseiam. Alguns seres, como vampiros poderosos, podem convocar lobos para ajudá-los em combate.",
    "sections": []
  },
  "creature-wyvern": {
    "description": "Um wivern é um drake venenoso com reputação merecida de impaciência e agressão. Com até 4,5 m de comprimento e pesando até 450 kg, o corpo resistente permite cair de garras sobre presas grandes sem risco sério para si. O wivern usa o ímpeto para atordoar o alvo antes de injetar veneno ardente ou carregá-lo até a borda de um penhasco próximo. Como não tem força para arrastar a presa inteira até o ninho, é muito mais provável que a erga e a solte sobre um desfiladeiro ou cânion, deixando a gravidade fazer o trabalho antes de descer para despedaçar a carcaça.\n\nConversa pouco interessa um wivern, pois a criatura em geral só fala para zombar da presa, reivindicar território ou exigir tributo. Mesmo assim, muitos wiverns gostam de humor sombrio e histórias de atos violentos, especialmente se cometidos pelo contador. Um wivern devidamente apaziguado com carne, entretenimento e tesouro às vezes concorda em prestar ajuda, desde dar direções até servir de montaria para um humanoide poderoso. Esses arranjos, porém, raramente duram mais que algumas semanas antes que orgulho, malícia ou insolência do wivern o leve a fugir ou até trair aliados. Só os verdadeiramente cruéis conseguem subjugar um wivern à servidão prolongada, pois a maioria é tão egoísta que evita ajudar os outros.",
    "sections": [
      {
        "id": "are-wyverns-drakes",
        "title": "Wiverns São Drakes?",
        "body": "Embora comumente classificados como drakes, wiverns apresentam diferenças significativas da maioria dos outros tipos de drake. Enquanto estudiosos debatem a relação precisa entre eles, ninguém contesta que se tratam com camaradagem e deferência uns aos outros."
      }
    ]
  },
  "creature-xulgath-warrior": {
    "description": "Guerreiros xulgath atacam com fúria e crueldade ansiosa, sempre prontos para a próxima luta. Levar troféus da batalha — incluindo armas e itens roubados de inimigos derrotados, além de troféus mais macabros colhidos da carne das vítimas caídas — é busca popular entre esses répteis cruéis, e os que têm armadura e escamas mais adornadas recebem o maior respeito (e talvez medo) dos parentes.",
    "sections": []
  },
  "creature-zombie-brute": {
    "description": "Aumentos necromânticos concederam a este zumbi tamanho e poder maiores.",
    "sections": []
  },
  "creature-zombie-shambler": {
    "description": "Um zumbi errante é um horror lento, perigoso em grupos maiores.",
    "sections": []
  },
  "creature-air-scamp": {
    "description": "Uma cabeça azul-pálida e asas finas como papel espiam da nuvem que gruda no diabrete do ar. São míopes e volúveis, mesmo entre os parentes: tanto se atiram de cabeça na briga quanto choramingam de terror com um barulho alto.",
    "sections": []
  },
  "creature-fire-scamp": {
    "description": "Embora se possa dizer que são bastante amigáveis, diabretes do fogo são considerados bem mais perigosos que os parentes. Deleitam-se com chama e com pregar peças em todo mundo de quem se aproximam. Mesmo ganhando tempo para entender que os outros não gostam de fogo, a maioria ainda gosta tanto da sensação das chamas que fica testando o limite.\n\nComparadas às nações de outros diabretes, as do Plano do Fogo são de longe as mais fortes. Esse respaldo inspira o diabrete do fogo a desafiar autoridade mais depressa que os outros.",
    "sections": []
  },
  "creature-sprite": {
    "description": "Sprites comuns, às vezes chamados sprites-pirilampo, são guardiões primevos que se apegam a uma pessoa, lugar ou objeto e o defendem por razões inescrutáveis. O gênio varia de bondoso a rancoroso, mas todos têm um traço caprichoso. Com uns 23 cm de altura, desconfiam de animais que possam caçá-los — sobretudo gatos domésticos — e preferem voar a lutar. Por outro lado, são incrivelmente curiosos sobre toda forma de magia e se ajuntam sem pensar em nexos de linhas ley e outros lugares de poder.",
    "sections": []
  },
  "creature-tooth-fairy": {
    "description": "Fadas sozinhas em geral precisam de vários minutos de esforço e de um alvo dormindo ou imobilizado para arrancar um dente.",
    "sections": []
  },
  "creature-riding-pony": {
    "description": "Cavalos servem de montaria e besta de carga em muitas sociedades. São fiéis e em geral dóceis, e valem ouro para quem precisa viajar longe. Povos menores, como gnomos e halflings, costumam usar pôneis; humanos e outros humanoides Médios preferem cavalos. A maioria que o viajante médio encontra é domesticada, embora ainda existam manadas grandes no ermo.",
    "sections": []
  },
  "creature-eagle": {
    "description": "Essas grandes aves de rapina mergulham de alturas incríveis para agarrar peixes e mamíferos pequenos nas garras poderosas. Águias aninham no alto de árvores ou em penhascos íngremes com vista do entorno.",
    "sections": []
  },
  "creature-grindylow": {
    "description": "A metade de cima de um grindylow lembra vagamente um goblin, mas da cintura para baixo o corpo se abre num emaranhado de tentáculos com ventosas. Vivem sobretudo em água rasa, doce ou salgada: lagos, rios, regiões costeiras e recifes de coral. Em geral se organizam em grupos chamados cardumes, que vão de uns poucos indivíduos a algumas centenas. Cardumes menores às vezes são tomados por uma criatura aquática poderosa, embora tais alianças só durem até o cardume sofrer um revés grave — aí os grindylows sobreviventes se espalham e formam cardumes menores.\n\nNão são territoriais, mas são pragmáticos. Raramente erguem estruturas permanentes, mas adotam um bom território de caça por gerações até predadores os expulsarem. Costumam se abrigar em abrigos móveis, como um sargaço de algas ou o casco de um navio abandonado. São catadores e caçadores hábeis que comem qualquer coisa em que consigam cravar os dentes.\n\nRespeitam o poder de predadores marinhos maiores, mas têm ódio especial de lulas (ou qualquer coisa que se pareça com lula). Marinheiros que cruzam águas infestadas de grindylow muitas vezes pintam imagens de lulas no fundo do casco na esperança de afastar ataques. Isso pode manter cardumes menores à distância, mas também pode sair pela culatra e incitar grupos maiores a um assalto coordenado — sobretudo se a rota do navio for previsível. O ódio a lulas não se estende a outros tentaculados; grindylows consideram o polvo o auge da graça e do poder.",
    "sections": [
      {
        "id": "giant-grindylows",
        "title": "Grindylows Gigantes",
        "body": "Embora a maioria dos grindylows seja Pequena, uma porcentagem minúscula dessas criaturas continua crescendo ao longo da vida. Os que se tornam Grandes ou maiores ganham o traço gigante e muitas vezes tornam-se campeões dos cardumes."
      }
    ]
  },
  "creature-grothlut": {
    "description": "Abominações com jeito de lesma, grothluts são o refugo grotesco do processo de distorção de carne. A cabeça e o tronco são vagamente humanoides, mas os braços são borrachentos e se movem desajeitados ao lado do corpo. Criaturas miseráveis, gemem lastimosas quando outras se aproximam, talvez como os últimos restos da mente pedindo para se livrar da forma horrenda.\n\nMuitos carneiros da carne consideram o grothlut um fracasso de criação, pois a transformação quase apaga a consciência. Outros discordam, argumentando que distorcer a mente o torna ainda mais útil, pois fica maleável e fácil de pastorear. Cultistas de Haagenti em geral usam grothluts como guardiões que patrulham lentamente as bordas dos enclaves. Uma vez em posição, servem de tropa de choque tosca, soltos para amolecer as forças inimigas antes de guerreiros mais valiosos entrarem e abaterem quem já está enjoado pelos órgãos e pela carne estourados do grothlut.",
    "sections": []
  },
  "creature-dwarf-warrior": {
    "description": "Entre o equipamento bem forjado e a coragem natural, um guerreiro anão segura o terreno contra inimigos poderosos. Se for respeitado, esses guerreiros podem se tornar aliados para a vida; se forem ofendidos, viram um espinho no calcanhar pelo resto dos dias.",
    "sections": []
  },
  "creature-riding-horse": {
    "description": "Cavalos servem de montaria e besta de carga em muitas sociedades. São fiéis e em geral dóceis, e valem ouro para quem precisa viajar longe. Povos menores, como gnomos e halflings, costumam usar pôneis; humanos e outros humanoides Médios preferem cavalos. A maioria que o viajante médio encontra é domesticada, embora ainda existam manadas grandes no ermo.",
    "sections": []
  },
  "creature-python": {
    "description": "Esta família de cobras não venenosas raramente ameaça algo além de mamíferos pequenos e aves, caçando enrolando a presa e esmagando-a com músculos poderosos. Ainda assim, pítons maiores podem ser perigosas pela força. Herpetólogos às vezes as mantêm como animais de estimação.",
    "sections": []
  },
  "creature-giant-gecko": {
    "description": "Esses répteis do tamanho aproximado de um humano têm pés incríveis, capazes de grudar com tenacidade em qualquer superfície. Lagartixas gigantes em geral são dóceis e tímidas, mas podem ficar agressivas se encurraladas ou defendendo o território. Esses lagartos de olhos grandes aparecem numa variedade ampla de habitats, de florestas tropicais e desertos a encostas de montanha ou até cavernas subterrâneas. Passam a maior parte do tempo escalando árvores grandes ou penhascos rochosos, seja caçando animais pequenos ou se escondendo de predadores. As escamas muitas vezes são bem coloridas ou decoradas com padrões intricados. Uma lagartixa gigante mede quase 2,4 m da cabeça à cauda e pesa cerca de 55 kg.\n\nÀs vezes são usadas por humanoides menores como guardiãs ou montaria, pois a natureza dócil as torna relativamente fáceis de amansar e treinar. A escalada superior as torna particularmente populares em sociedades que vivem no subterrâneo ou perto de penhascos, como goblins e kobolds. A coloração viva também as torna animais de estimação favoritos na alta sociedade.",
    "sections": []
  },
  "creature-boggard-scout": {
    "description": "Muitas vezes encarregados de patrulhar as fronteiras de suas terras, batedores boggard aprendem a falar outro idioma (em geral Comum) para lidar com invasores.",
    "sections": []
  },
  "creature-caligni-skulker": {
    "description": "Os mais encontrados na superfície são os furtivos caligni, roubando tanto mantimentos básicos quanto luxos. Quando empurrados ao combate por caligni mais poderosos, furtivos costumam ser sacrificados em ondas para desgastar o inimigo. Fora isso, são bastante cautelosos e preferem fugir de situações perdidas.",
    "sections": []
  },
  "creature-kobold-cavern-mage": {
    "description": "Magos das cavernas kobold nascem mais do que são treinados, chocando de ovos que absorveram quantidades particularmente grandes de energia primordial da terra. Embora muitos elementais e até feições naturais do terreno possam dar origem a magos das cavernas, a maioria se relaciona às ninfas da terra que habitam cavernas, conhecidas como lampads. Essas fey solitárias e caprichosas recebem a companhia de uma tribo kobold com o mesmo entusiasmo com que os kobolds recebem a proteção em troca.",
    "sections": []
  },
  "creature-kholo-hunter": {
    "description": "Kholos são humanoides altos de cabeça de hiena que habitam savanas, campos quentes e colinas áridas. Dada a aparência, a afinidade com hienas não deveria surpreender; kholos dividem casa, comida e até muitos comportamentos com esses animais. Como as hienas, têm reputação notória pelo mesmo motivo — o riso inquietante, a inteligência assustadora e as táticas eficientes de matilha os tornam competição ou inimigo intimidante. Os kholos gostam de alimentar esses rumores, usando-os como guerra psicológica contra os inimigos.\n\nTambém como as hienas, preferem caçar em matilha e são excepcionalmente hábeis em armar emboscadas ou separar alvos individuais de grupos maiores. Como as matilhas kholo valorizam muito todos os membros, qualquer tática que dê vantagem em situações perigosas é vista como virtuosa, enquanto cavalaria e honra são ridicularizadas como risco inútil. É uma filosofia nascida de respeito e amor profundos pelos irmãos kholo, mas para a maioria das outras pessoas isso os torna péssimos vizinhos.\n\nKholos comem de bom grado quase qualquer outra criatura, inclusive kholos mortos, o que pode provocar reações fortes em povos e culturas com tabu contra canibalismo ou profanar os mortos. Para um kholo, muitas vezes é mais ofensivo não comer um corpo morto, não importa a origem; não veem sentido em desperdiçar carne preciosa num mundo duro e desafiador. Pior ainda é recusar a carne de um kholo morto, o que consideram insulto à memória daquele kholo e implicação de que a carne dele não merece ser consumida. Comer a carne de inimigos honrados é, para os kholos, um ritual de respeito, permitindo que aquele ser continue na matilha em vez de apodrecer como lixo no chão.\n\nMulheres kholo costumam ser maiores e mais fortes que os homens e em geral são consideradas as líderes das matilhas de caça e dos clãs.",
    "sections": []
  },
  "creature-hryngar-sharpshooter": {
    "description": "Atiradores hryngar servem tanto de apoio à distância para caravanas quanto de atiradores postados em torres de guarda com vista para pedreiras e outros lugares onde trabalhadores passam as horas. Também se especializam em métodos não letais de combate à distância — táticas que costumam ser chamados a usar ao rastrear devedores inadimplentes ou quem tenta fugir das obrigações contratuais.",
    "sections": []
  },
  "creature-umbral-gnome-warrior": {
    "description": "Guerreiros gnomos umbrais entram rápido na batalha, mas focam em defender parentes e lares em vez de táticas mais agressivas quando há escolha.",
    "sections": []
  },
  "creature-reefclaw": {
    "description": "Garras-de-recife são monstros aquáticos que lembram camarões ou lagostas enormes. Como o nome sugere, as pinças desproporcionais são armas poderosas com aperto de torno e a capacidade de injetar veneno potente na presa infeliz.\n\nEmbora não falem, são inteligentes o bastante para entender o idioma local dos humanoides perto dos territórios de caça. Às vezes escutam conversas, seja para obter informação sobre o melhor lugar para emboscar presa aquática ou terrestre, seja só pelo valor de entretenimento — garras-de-recife gostam particularmente de ouvir gente de voz aguda. Em geral caçam sozinhas, mas pequenos enxames de fêmeas já se reuniram em torno de um único macho para acasalamento ou juntas para criar a ninhada em comum. Neste último caso, as fêmeas fazem caçadas amplas para trazer butim suficiente para alimentar os filhotes. Tais partidas de caça são extremamente perigosas — já viraram barcos de pesca pequenos e atacaram quem caiu na água.\n\nUma vez decidida a ação, a garra-de-recife segue até o fim, mesmo que isso signifique o próprio fim. Mais de um sobrevivente disse que a criatura só soltou o aperto esmagador de ossos depois de o cérebro estar vazando do crânio quebrado — e mesmo assim ainda deu um último corte terrível como parte do último suspiro. Na época de acasalamento, as fêmeas costumam ser um pouco mais pragmáticas e soltam a presa antes de se pôr em risco, e aos filhotes.\n\nApesar da inteligência e dos dilemas morais que a acompanham, garras-de-recife frequentemente acabam no prato de caçadores terrestres como humanos e hobgoblins. Segundo quem aprecia a carne, ela é deliciosamente doce (em águas mais frias) ou levemente ácida (em águas quentes). A maioria de quem conhece o intelecto da criatura acha o ato de comê-la de mau gosto, mas isso não dissuade nobres inescrupulosos em regiões costeiras, para os quais a carne é iguaria que vale o preço. Da mesma forma, pescadores de olho no livro-caixa estão mais do que dispostos a caçar as criaturas perigosas — ou, melhor ainda, contratar aventureiros ingênuos para a tarefa.",
    "sections": [
      {
        "id": "eating-reefclaws",
        "title": "Comer Garras-de-Recife",
        "body": "Garras-de-recife não acumulam tesouro, mas a carne — se mantida fresca — pode ser vendida nos mercados certos. Porém, num número crescente de lugares, a prática de comer garras-de-recife caiu em desuso — o que significa, claro, que o mercado de garra-de-recife simplesmente mudou para açougueiros do mercado negro, onde todo tipo de carne reunida de fontes duvidosas está disponível para compra, e o valor aumentou de acordo."
      }
    ]
  },
  "creature-electric-eel": {
    "description": "Em geral encontrada em rios e lagos de água doce, a enguia-elétrica não é particularmente agressiva, mas a capacidade de atordoar predadores e presas pode ser perigosa para criaturas maiores em busca da próxima refeição. Enguias-elétricas são mais próximas de bagres do que de outras enguias.",
    "sections": [
      {
        "id": "electric-eel-hide",
        "title": "Couro de Enguia-Elétrica",
        "body": "O couro colhido de enguias-elétricas pode ser usado para criar armadura ou itens que concedem proteção contra eletricidade."
      }
    ]
  },
  "creature-xulgath-skulker": {
    "description": "As tocas xulgath são patrulhadas — alguns diriam “assombradas” — pelos furtivos da comunidade. Esses xulgaths se especializam em furtividade, golpeando depressa das sombras e emboscando inimigos de outros jeitos.",
    "sections": []
  },
  "creature-merfolk-wavecaller": {
    "description": "Chamadores das ondas do povo-marinho usam magia primordial para defender o povo. A capacidade de asfixiar quem respira ar os torna cruciais quando habitantes da superfície invadem.",
    "sections": []
  },
  "creature-deinonychus": {
    "description": "Deinonychus são caçadores astutos que atacam em grupos de até uma dúzia, rasgando a presa com garras afiadas e mandíbulas poderosas. São magros, musculosos, têm duas pernas poderosas e uma cauda longa que ajuda a manter o equilíbrio. Embora não usem os membros anteriores ágeis e garrudos para atacar, os dinossauros podem usá-los para afastar barreiras pequenas. Alguns têm pele escamosa, mas a maioria também tem tufos de penas de cores vivas. Um deinonychus tem cerca de 1,8 m de altura e pesa cerca de 70 kg.",
    "sections": []
  },
  "creature-centipede-swarm": {
    "description": "Enxames de centopeias são de fato perigosos, tapetes vorazes de fome que correm e são capazes de devorar um viajante inteiro em questão de minutos. Kobolds e mitflits são conhecidos por incorporar enxames de centopeias em armadilhas astutas.",
    "sections": []
  },
  "creature-wasp-swarm": {
    "description": "Ninhos de vespa são feitos de fibras de madeira mascada forrageada da flora ao redor, que as vespas transformam num material parecido com papel. Um só ninho pode abrigar milhares de indivíduos que emergem como um enxame enorme. A maioria dos enxames só ataca para proteger o ninho ou se estiver agitada, embora druidas e outros encantadores primordiais possam dobrar esses vermes venenosos à vontade — com efeito mortal.",
    "sections": []
  },
  "creature-army-ant-swarm": {
    "description": "Um enxame de formigas-correição é um tapete aterrorizante de insetos ferroadores que devora tudo no caminho.",
    "sections": []
  },
  "creature-sod-hound": {
    "description": "Cães de grama são caninos extraplanares musgosos formados de terra compactada e seixos. No plano natal, muitas vezes são encarregados de guardar sítios menos seguros e encontrar depósitos minerais. Outros vivem no relativo luxo como animais de estimação de jabalis.",
    "sections": []
  },
  "creature-voidworm": {
    "description": "Outros proteanos não consideram os seres voadores e iridescentes conhecidos como vermes do vazio parte de uma casta proteana, e sim apenas um efeito colateral vergonhoso da energia em constante agitação do Maelstrom. Chamar um verme do vazio de proteano na presença de um proteano mais poderoso é um jeito certo de começar uma briga.\n\nOs próprios vermes do vazio pouco se importam se alguém os vê como proteanos. Mantêm uma ecologia próspera no Maelstrom, brincando em cardumes de até vinte e se divertindo no caos de realidades em constante mudança. Em outros lugares (como no Universo), ficam hipnotizados pelo princípio da permanência dos objetos; muitos se apegam a feições específicas de uma região (uma colina, um lago) e pairam no ar ao redor por meses ou até anos, esperando o objeto da curiosidade mudar. Mudanças menores — a cor de uma árvore no outono, o apodrecimento lento de um cadáver, a ventilação periódica de vapor de um gêiser — todas fascinam vermes do vazio. Um verme do vazio tem cerca de 60 cm de comprimento e pesa cerca de 1 kg.",
    "sections": []
  },
  "creature-cassisian": {
    "description": "Os mais fracos dos anjos, cassisianos em geral servem de mensageiros subalternos para anjos mais poderosos ou de guias espirituais para mortais. Apesar do intelecto limitado, têm jeito para memória precisa, sobretudo de escritura. A maioria se forma das almas de mortais confiáveis, mas alguns surgem de fragmentos de anjos maiores destruídos a serviço dos reinos celestiais.",
    "sections": []
  },
  "creature-naiad": {
    "description": "Naíades protegem riachos, lagoas, nascentes e outros corpos naturais de água doce. Embora a maioria leve vida solitária perto do lar escolhido, às vezes se reúnem em grupos semelhantes a covens onde afluentes se encontram, realizando grande magia e abençoando as águas da terra. Como os vínculos das naíades com os corpos d’água permitem mais flexibilidade, são as ninfas mais propensas a interagir com humanoides — e até visitar os povoados de vez em quando. Diferente de outras ninfas, naíades ocasionalmente se tornam aventureiras, sobretudo quando forças sombrias buscam devastar a natureza ou ameaçar a terra de outro modo, unindo-se a outros para impedir a corrupção do mundo natural.",
    "sections": []
  },
  "creature-chupacabra": {
    "description": "Esses predadores notórios têm sede inegável de sangue. Chupacabras preferem atacar o fraco e o lento, muitas vezes se escondendo e observando a presa em potencial por longos períodos antes de atacar. Ágeis e furtivos, em geral fazem ninho em áreas de capim alto e pedra protetora, as escamas levemente reflexivas permitindo misturar-se bem ao entorno.\n\nPreferem comer viajantes solitários e animais de fazenda (em particular cabras) e deixam pouca evidência da presença além das carcaças horrendas, esgotadas de sangue, das refeições. A tendência de ficar fora de vista combinada com a atividade naturalmente noturna muitas vezes leva locais supersticiosos a concluir o pior, imaginando que um vampiro particularmente imprudente vive na região.\n\nUm chupacabra típico mede quase 1,2 m do focinho à ponta da cauda espinhosa e tem pouco menos de 1 m de altura. Com constituição leve e ossos leves, a maioria pesa cerca de 23 kg. Acasalam raramente e só nos meses mais quentes, cada fêmea produzindo um único ovo que choca numa criatura minúscula e desidratada. A mãe em geral deixa presa indefesa na caverna para o filhote se alimentar na hora.\n\nEmbora em geral sejam solitários, já se soube de pequenas gangues em áreas fartas. Os membros trabalham bem juntos, ousando atacar animais maiores, rebanhos pequenos e presas de outro modo mais perigosas. Histórias de chupacabras atacando viajantes ou sitiando fazendas em geral vêm das práticas de caça dessas gangues. Regiões onde essa atividade é mais comum muitas vezes têm mitos complexos e coloridos sobre as capacidades ou os motivos do chupacabra — e algumas afirmações, como a de que certos chupacabras voam, são verdadeiras demais.",
    "sections": [
      {
        "id": "winged-chupacabras",
        "title": "Chupacabras Alados",
        "body": "Alguns chupacabras são mutantes com asas répteis grandes e já se soube que carregam cabras — ou até crianças. Um chupacabra alado tem Deslocamento de voo de 15 m. Outros chupacabras crescem bem maiores, até tamanho Médio, e podem ficar olho no olho com um humano adulto. Esses chupacabras têm ajustes de elite nas estatísticas."
      }
    ]
  },
  "creature-living-waterfall": {
    "description": "Cachoeiras vivas são colunas de água revolta em forma humanoide. Veem a água como domínio natural e até animais aquáticos como intrusos. Quando invocadas, são mal-humoradas, mas guardam de má vontade todo tipo de sítio aquático.",
    "sections": []
  },
  "creature-living-wildfire": {
    "description": "Incêndios vivos aparecem como humanoides feitos de fogo vivo, queimando tudo que encontram pelo puro prazer. Invocadores tiram proveito dessa alegria e do fim explosivo dos elementais para espalhar destruição.",
    "sections": []
  },
  "creature-river-drake": {
    "description": "Embora as escamas brilhantes e as asas lisas como barbatanas desses dracos lembrem peixes de rio, na verdade são parentes distantes dos dragões que governam os oceanos. Embora menores que a maioria dos dracos, os dracos-rio são mais do que capazes de atormentar viajantes fluviais e estão igualmente em casa acima e abaixo da superfície. Essa flexibilidade lhes permite pegar uma variedade ampla de presas, de peixes e boggards a cervos e o passageiro ocasional de balsa.",
    "sections": []
  },
  "creature-werebear": {
    "description": "Convicção inabalável preenche um homem-urso durante as transformações. Isso pode levá-lo com zelo a causas nobres, mas também pode torná-lo implacável, violento e de uma ideia só. Alianças podem cair da mente de um homem-urso quando o gênio bestial o vence e o objetivo sobrepõe tudo. Por isso, homens-urso são solitários, raramente vivendo juntos como família por mais tempo do que o necessário. Enquanto não houver nada por perto para ameaçar a área natural que protege (em geral uma floresta), um homem-urso na forma animal em geral se contenta em forragear e dormir a noite embora.",
    "sections": []
  },
  "creature-vampire-servitor": {
    "description": "Vampiros usam os peões servidores para infiltração e reconhecimento.",
    "sections": []
  },
  "creature-ogre-boss": {
    "description": "Na sociedade ogra, a força faz mais do que a razão — faz as regras. O ogro mais forte ou mais violento de uma família (na maioria dos casos, o mesmo ogro) é invariavelmente o chefe. Rápido em fisgar inimigos caídos nas armas, até outros ogros temem as consequências de desagradar um chefe ogro. Quando o chefe late ordens, os outros membros da família se movem depressa para obedecer.",
    "sections": []
  },
  "creature-witchwarg": {
    "description": "Witchwargs são parentes dos wargs, mas maiores, mais inteligentes e bem mais perigosos. São capazes de exalar plumas de sopro congelante. Quando se dignam a servir outros, em geral reservam esse privilégio a criaturas mais perigosas, como as bruxas do inverno de Irrisen.",
    "sections": []
  },
  "creature-lamia": {
    "description": "Assim como foram amaldiçoadas há muito, lâmias podem infligir uma maldição em quem tocam, nublando a mente da vítima e empurrando o pensamento consciente rumo a instintos animais. Criaturas afetadas por essa maldição ficam imprudentes, inconscientes das consequências das próprias ações. Isso torna a vítima infeliz ainda mais suscetível às ilusões astutas e aos encantos insidiosos da lâmia. A natureza animalista da lâmia e o efeito do toque amaldiçoado levaram alguns estudiosos a teorizar que as lâmias originais devem ter, milênios atrás, virado as costas à própria razão e ao intelecto e abraçado a vida de feras simples. Se essa mudança foi recompensada como dádiva monstruosa de Lamashtu ou infligida como maldição por abandonar as responsabilidades por Pharasma continua sendo tema de debate até hoje.\n\nQualquer que seja a fonte dessa transformação antiga, lâmias passaram a apreciar as forças que ela lhes concedeu. Continuam apegadas a um ódio dos deuses, vendo-os como a causa do exílio eterno das sociedades que observam com olhos invejosos, escondidas entre as ruínas de civilizações perdidas. Como culham poderes divinos pela maldição, têm deleite especial na queda de templos, no sofrimento e na morte de conjuradores divinos e na disseminação de dissensão em religiões organizadas.\n\nEmbora possam assumir forma humanoide por pouco tempo com magia, lâmias em geral são forçadas a se esconder da civilização, fazendo lar no ermo árido. Ali, atraem cultos próprios. Com a ajuda desses cultistas, esforçam-se para derrubar fés populares, introduzir cismas em igrejas florescentes e humilhar ou difamar líderes religiosos de alto perfil. A maioria das lâmias não tem fé religiosa verdadeira em nada, ouvindo em vez disso um chamado místico que se manifesta como suspiros no vento do deserto ou murmúrios dos lugares escuros entre as estrelas.\n\nLâmias são tradicionalmente matriarcais, reverenciando a fêmea mais velha entre elas como líder, mãe e xamã.",
    "sections": []
  },
  "creature-succubus": {
    "description": "Súcubos são manifestações do pecado da luxúria destrutiva, e os mais atraentes de todos os demônios — como convém ao papel de seduzir mortais a cair no pecado. O conceito de gênero é fluido para um súcubo, pois pode adotar inúmeras formas humanoides de qualquer gênero para ajudar nos objetivos. A maioria tem forma verdadeira feminina (íncubos, que em geral têm forma verdadeira masculina, são outro tipo de demônio), mas independentemente do gênero um demônio da luxúria é sobrenaturalmente belo ou bonito, porém com chifres curvos, asas de morcego, garras afiadas e uma cauda sinuosa.\n\nDisfarçado de humanoide mortal no Universo, um súcubo sussurra nos ouvidos dos mortais, instando-os a perseguir os desejos mais escuros e destrutivos e empurrando-os à depravação, usando magia só se a persuasão falhar. Embora mortais muitas vezes se fixem na aplicação de luxúria sexual dos súcubos, esses demônios exploram com a mesma facilidade a fome de poder, saber, fama ou qualquer outro desejo. A capacidade de infiltrar sociedades os torna excelentes espiões, assassinos e sabotadores políticos. No fim, o súcubo aprecia todos os meios de virar de cabeça para baixo a cultura mortal.",
    "sections": []
  },
  "creature-wraith": {
    "description": "Espectros são mortos-vivos malignos que drenam a vida e evitam a luz. As formas sombrias se cobrem de mantos insubstanciais que usam como insígnia de ofício, marcados com olhos perscrutadores que refletem o julgamento dos vivos. Um espectro pode ser criado por magia vil ou exposição direta ao Vazio, mas com mais frequência resulta de morte em escala trágica. Quando uma tragédia é grande demais até para a realidade testemunhar, uma manifestação temporária do Vazio pode deixar para trás inúmeros espectros numa horda de escuridão. A existência de um espectro é de vazio e necessidade, com o desejo de chamar outros para o mesmo vazio exemplificado pelo Vazio.\n\nEspectros podem assombrar qualquer local onde interajam com segurança com os vivos, procurando quem é digno de virar espectro novo e descartando o resto, embora a vulnerabilidade à luz do sol os confine aos lugares sombrios do mundo — lugares onde se misturam sem costura ao entorno escuro antes de envolver a presa em silêncio. As opiniões sobre quem é digno variam, mas em geral escolhem os já mais próximos do Vazio, seja por ligação metafísica ou exposição a inúmeras mortes. Um espectro novo criado assim carrega esses aspectos, com o resto da personalidade distorcido ou varrido pela exposição ao Vazio.\n\nEspectros se reúnem com outros da espécie em lugares onde morte e caos são rotina — campos devastados pela guerra, submundos metropolitanos comandados por senhores do crime, ou sítios de rituais profanos. Nesses lugares, os vivos fazem bem em ficar na luz. Espectros são espertos o bastante para tirar proveito da incorporeidade em combate, então se mantêm em cavernas tortuosas ou estruturas com corredores, e evitam áreas abertas.",
    "sections": []
  },
  "creature-revenant": {
    "description": "Revenantes são perseguidores mortos-vivos obcecados que surgem dos próprios assassinatos e são movidos por uma só coisa: vingança contra os assassinos. A sabedoria comum é que só nascem de indivíduos que foram completamente traídos ou abandonados a morrer uma morte penosa, mas mesmo assim tais vítimas podem não se erguer da cova. Em outros casos, revenantes podem até surgir do que legitimamente se consideraria um acidente se o revenante não entender as circunstâncias plenas da morte. Nesses casos, não importa que o “assassino” talvez não tivesse a intenção de matar, pois revenantes não entendem piedade e nunca perdoam. Têm pouca memória da vida além do que possam precisar lembrar para alcançar o objetivo da vingança.",
    "sections": [
      {
        "id": "exceptions-to-evil",
        "title": "Exceções ao Mal",
        "body": "Embora a maioria dos mortos-vivos seja indiscriminadamente malévola, revenantes não são — esses perseguidores incomuns se erguem não por um senso de crueldade ou ódio aos vivos, mas espontaneamente da necessidade de vingança após uma traição profunda. Dá para evitar a ira de um revenante simplesmente saindo do caminho — a menos que você seja a razão da morte-viva dele!"
      }
    ]
  },
  "creature-manticore-quill-tail": {
    "description": "Uma mantícora é uma amálgama monstruosa de leão, dragão e humano com predileção por banquetear-se de carne humana. A cauda distintiva se enfeita de espinhos grandes como os de um porco-espinho, que a mantícora arremessa na presa chicoteando a cauda como uma funda. Esses espinhos mortais dão à mantícora o poder de abater até guerreiros bem armados da segurança do céu.\n\nEmbora o rosto antropomórfico sugira intelecto aguçado, a maioria das criaturas desse tipo é assassina de uma ideia só. Podem ser mentirosas astutas, porém, e as vozes têm um som estranhamente musical que já atraiu muitos viajantes desprevenidos para uma emboscada. Uma mantícora descoberta por humanoides ignorantes ou rancorosos às vezes se torna o centro de adoração e até culto. Uma mantícora nessa situação cede depressa à preguiça e deixa os acólitos trazerem tributo na forma de comida e tesouro, banquetando-se dos próprios seguidores quando as ofertas escasseiam. Humanoides mais fortes que encontram uma mantícora podem intimidá-la com violência, às vezes até forçando-a a servir de montaria. Enquanto a mantícora for bem alimentada com carne humana e o mestre a levar à vitória, uma montaria mantícora pode se mostrar surpreendentemente leal.\n\nUma mantícora gosta de tomar butim dos cadáveres da presa como troféus que lisonjeiam a vaidade e testemunham a força. Tem pouco interesse em dinheiro, mas às vezes aceita ouro e joias como tributo. Como preferem lugares solitários no ermo longe de humanoides, contentam-se em desfrutar os despojos sozinhas em vez de exibi-los a visitantes.",
    "sections": []
  },
  "creature-medusa": {
    "description": "Humanoides monstruosos que lembram humanos com cobras no lugar do cabelo, medusas são mais conhecidas pelos olhares petrificantes que — se demorarem — podem transformar mortais em pedra de forma permanente. São adversárias astutas e manipuladoras que colecionam e cobiçam segredos, e que usam ameaças e astúcia para explorar os medos de criaturas mais fracas. Uma medusa pode buscar itens mágicos poderosos, usar magia divinatória para descobrir saber secreto e destrancar poder proibido, ou infiltrar uma sociedade para encantar políticos influentes. A capacidade de se meter em organizações poderosas as torna líderes naturais de quadrilhas criminosas e guildas de ladrões, e o interesse em fenômenos mágicos leva algumas a seguir carreira como oráculos que oferecem ajudar aventureiros a achar o que buscam — por um preço. É claro que, se engenho e engano não bastarem, uma medusa sempre pode simplesmente transformar rivais em enfeites de pedra ornamentados com pouco mais que um olhar. Muitas constroem covis elaborados para chamar de lar, muitas vezes decorados com as estátuas dos inimigos transformadas em troféus macabros em exibição proeminente.\n\nExcepcionalmente ágil e surpreendentemente resistente, uma medusa raramente recua de um conflito, mesmo encurralada. Muitos aventureiros que se acharam preparados para resistir aos efeitos do olhar de uma medusa mesmo assim caíram, pois essas criaturas também costumam ser arqueiras mortais capazes de crivar os inimigos de flechas envenenadas à distância. Ainda assim, uma medusa pode barganhar a vida se não restarem alternativas, e os segredos carregados por essas vilãs poderosas muitas vezes tornam mais do que vale a pena poupá-las.",
    "sections": [
      {
        "id": "medusa-infiltrators",
        "title": "Medusas Infiltradoras",
        "body": "Persistem rumores de medusas disfarçadas atuando como membros proeminentes de organizações criminosas como os Sczarni em Riddleport e o Consórcio Aspis em Port Peril, e sabe-se que a espécie prospera em metrópoles incluindo Absalom e Katapesh. Por serem tão espalhadas, medusas que lembram humanos de todas as etnias principais podem ser encontradas em Avistão e Garund."
      }
    ]
  },
  "creature-cyclops": {
    "description": "Os reinos dos cíclopes datam de uma era antes da ascensão da humanidade, quando dragões, gigantes e povo-serpente governavam o mundo. Os cíclopes ergueram cidades de pedra enormes e rezaram a deuses antigos de brutalidade e ira, mas o poder de prever o futuro lhes falhou e a civilização desabou. Hoje, a maioria dos cíclopes praticamente não tem conhecimento da antiga glória da espécie, embora não seja incomum habitarem entre as ruínas da grandeza. Cidades cíclopes incluem monumentos e murais imponentes que retratam a história do povo, mas poucos entre eles agora sabem ler ou interpretar essas relíquias do passado.\n\nAlém do olho único, cíclopes também são famosos pela fome que não acaba, um apetite tão absoluto que alguns estudiosos teorizam que possa ser algum tipo de maldição. A fome sempre presente dos cíclopes parece ter alguma ligação com a morte da civilização — embora se essa voracidade foi a causa ou um efeito colateral da queda do povo provavelmente esteja destinada a permanecer mistério.\n\nEmbora detalhes dos deuses dos cíclopes tenham sido em grande parte perdidos nos anais do tempo, o pouco que se sabe sobre essas deidades sugere que eram vingativas e mesquinhas o bastante para amaldiçoar o próprio povo se se sentissem negligenciadas ou mal servidas.",
    "sections": []
  },
  "creature-arboreal-regent": {
    "description": "Regentes arbóreos são criaturas vagarosas e solitárias responsáveis por guardar uma floresta inteira. Têm uma visão especialmente longa dos assuntos e nunca agem de forma precipitada ou sem muita deliberação. Ocasionalmente se reúnem em grupos pequenos chamados bosques para compartilhar notícias e passar a sabedoria aos guardas arbóreos que brotaram sob sua vigília. Em tempos de perigo grave, todos os bosques de uma região podem se reunir para uma grande reunião de meses a fim de planejar e, por fim, agir contra uma ameaça.\n\nO regente arbóreo típico tem 9 m de altura, tronco de 60 cm de diâmetro e pesa cerca de 2.000 kg.",
    "sections": []
  },
  "creature-chimera": {
    "description": "A quimera é o exemplo arquetípico de um monstro antinatural feito de uma mistura monstruosa de criaturas componentes radicalmente diferentes: neste caso, um leão, um dragão e um bode. Selvagem, odienta e faminta, tenta comer qualquer criatura que vê, mas às vezes um mestre de vontade forte consegue obrigar uma quimera a servir de guarda ou até de montaria. Se tal indivíduo alguma vez perder o controle sobre a quimera, em geral é o primeiro a ser devorado.",
    "sections": [
      {
        "id": "kobold-adoration",
        "title": "Adoração Kobold",
        "body": "Alguns grupos kobold gostam de quimeras como guardiãs ou animais de estimação, mas poucos kobolds têm a bravura ou os recursos para manter uma quimera feliz por muito tempo. Quimeras são comedoras vorazes e, embora uma família de kobolds possa apreciar ter uma como guardiã, pode em vez disso achar a criatura mais perigosa do que as ameaças das quais esperava proteção se não conseguir mantê-la alimentada."
      }
    ]
  },
  "creature-yeti": {
    "description": "Quase um mito, um yeti raramente é visto — e mesmo quando é, muitas vezes já é tarde. Yetis habitam os picos mais altos e remotos do mundo, descendo das fortalezas nevadas para saquear, roubar gado e às vezes saciar impulsos insaciáveis de carnificina e destruição. Quem vive ao pé de uma montanha governada por yeti avisa dos “homens das neves abomináveis”: humanoides monstruosos cobertos de pelo que deixam rastros estranhos e sangrentos na neve.\n\nNa verdade, a maioria dos yetis protege o mundo em vez de caçar os outros habitantes, guardando portais eldritch que ligam o Universo mortal a outras dimensões da realidade, bem mais estranhas. De dentro desses arcos cobertos de neve e portas de pedra antigas, alienígenas, pesadelos vivos, capetas e pior podem emergir no mundo. Yetis que guardam esses portais às vezes sucumbem aos horrores de dentro, assumindo os impulsos sanguinários e os comportamentos horrendos dos próprios monstros que se esforçam para conter. Expulsos dos clãs e forçados a vagar sozinhos, dão origem ao mito do homem das neves abominável. Esses yetis exilados muitas vezes abraçam por completo os elementos corruptos que causaram o exílio, ficando mais poderosos e mais mortais.",
    "sections": [
      {
        "id": "yeti-crafts",
        "title": "Artesanato Yeti",
        "body": "Exilados solitários de clãs yeti têm pouco uso para tesouro e deixam para trás o equipamento das vítimas abatidas, onde é depressa coberto pela neve. Yetis baseados em clã, por outro lado, criam pedra entalhada de bela fatura, parte da qual moldam em talismãs protetores de rara beleza."
      }
    ]
  },
  "creature-hobgoblin-general": {
    "description": "Generais hobgoblin servem de líderes de exércitos inteiros e governantes de povoados hobgoblin. Um general não permite que os luxos do comando o amoleçam. Lidera as forças no campo de batalha e vê essa oportunidade de se destacar numa luta à frente de um exército como a verdadeira recompensa de uma vida gasta afiando as habilidades de combate.",
    "sections": []
  },
  "creature-zombie-hulk": {
    "description": "Esses horrores imponentes se erguem de cadáveres monstruosos e gigantescos.",
    "sections": []
  },
  "creature-earth-scamp": {
    "description": "O exterior rochoso do diabrete da terra camuflaria bem entre pedras soltas, se não fossem os olhos grandes e as asas de morcego. Voam, mas o voo é desconfortável e inquietante — raramente deixam o chão se podem evitar. A maioria preferiria nunca visitar a superfície, aninhada fundo nas rochas que imitam.",
    "sections": []
  },
  "creature-water-scamp": {
    "description": "Diabretes da água se distinguem pelo pelo liso que prende uma camada d’água contra a pele. Embora voem como os parentes e invoquem água o bastante para nunca secar, só saem da água quando precisam. Estudiosos que respiram ar os acham quietos e ariscos; civilizações submersas acham o entusiasmo e a brincadeira avassaladores.",
    "sections": []
  },
  "creature-pusk": {
    "description": "Entre os demônios mais baixos e menos poderosos, os miseráveis pusks são tão cruéis quanto os irmãos maiores. Descarregam a frustração em qualquer coisa mais fraca.\n\nNascidos das almas dos preguiçosos, têm jeito vagamente humanoide, membros desajeitados e peles folgadas. Diz-se que uma só alma preguiçosa de depravação e força suficientes pode gerar uma horda inteira. Como demônios fracos, o destino é sofrer nas mãos de predadores abissais mais poderosos, e só um punhado chega a virar outra coisa. Por isso, pusks são bastante acomodados quando invocados por mortais: aceitam condições que poucos capetas topariam — embora ainda virem a mão contra o mestre mais gentil ao primeiro sinal de fraqueza.",
    "sections": []
  },
  "creature-draxie": {
    "description": "As travessas sprites-dragão chamadas draxies disputam com as primas pixies o título de maior trocista há séculos. Têm paciência e planejamento para a peça perfeita, gastando meses ou anos no esforço. Uma exceção ao jeito volúvel é a elucrea, um vínculo para a vida entre uma draxie e uma criatura de quem gosta — em geral alguém com bom humor. Segundo a lenda draxie, um pedacinho do espírito ainda se lembra de ter sido unido como o antigo dragãozinho fey Elucredassa, e isso as faz ansiar por tais laços.",
    "sections": []
  },
  "creature-war-horse": {
    "description": "Cavalos servem de montaria e besta de carga em muitas sociedades. Fiéis e em geral dóceis, valem ouro para quem precisa viajar longe. Povos menores, como gnomos e halflings, costumam usar pôneis; humanos e outros humanoides Médios preferem cavalos. A maioria que o viajante encontra é domesticada, embora ainda existam manadas grandes no ermo.",
    "sections": []
  },
  "creature-compsognathus": {
    "description": "O compsognato é um dinossauro bípede pequeno que se move em arrancos rápidos. A mordida injeta veneno que causa dormência e fraqueza, traço que usa para derrubar presas maiores, embora prefira vasculhar ou fisgar insetos e bichos menores.\n\nÉ curioso até demais e se mete em encrenca. Mede cerca de 90 cm da cabeça à cauda e pesa uns 7 kg — pequeno o bastante para servir de animal de estimação ou familiar. Onde não há vínculo mágico, quem o guarda faria bem em tratá-lo com a mesma cautela de uma víbora de estimação: no máximo, estão meio amansados.",
    "sections": []
  },
  "creature-caligni-hunter": {
    "description": "Embora caçadores caligni muitas vezes sejam empurrados a liderar os furtivos, a maioria prefere vagar pelas Terras Sombrias ou atacar a superfície livre dessas responsabilidades. Os assaltos preferidos costumam ser de um caçador sozinho ou de grupos de dois ou três.",
    "sections": []
  },
  "creature-boggard-swampseer": {
    "description": "O vidente-do-pântano boggard recebeu magia pelo culto ao senhor demoníaco Gogunta, e usa esse poder para governar a aldeia, manter os outros na linha e planejar ataques às comunidades vizinhas.",
    "sections": []
  },
  "creature-xulgath-leader": {
    "description": "Líderes xulgath costumam ser os membros mais fortes e violentos da comunidade — embora, em grupos maiores, a ninhada às vezes seja liderada por cultistas demoníacos poderosos ou outros monstros que querem os xulgaths como servos ou sacrifícios.",
    "sections": []
  },
  "creature-kholo-sergeant": {
    "description": "Quando kholos se juntam em bandos mercenários ou partidas de saque, o mais forte ou respeitado costuma ser designado líder de caça ou sargento. São responsáveis pela segurança e pelo sucesso dos irmãos de matilha e treinam muito a arte da guerra. A habilidade com armas os torna adversários poderosos. Um sargento kholo também pode liderar o grupo em outros assuntos: brigas domésticas ou negociação com bandos rivais.",
    "sections": []
  },
  "creature-hryngar-bombardier": {
    "description": "Químicos hryngar têm jeito para criar granadas alquímicas. As tradições os empurram a experimentar e inovar sem parar, e a natureza hostil do entorno tende a focar essas inovações em armas e ferramentas de guerra. Bombardeiros hryngar roubam de bom grado notas e segredos dos subordinados, empurrando os alunos a cortar caminho para produzir resultado enquanto embolsam o crédito. Para os que são empurrados ao combate, cada granada arremessada é uma chance nova de observar o sofrimento infligido — e incorporar esses dados no próximo experimento, um instrumento de tormento ainda pior.",
    "sections": []
  },
  "creature-umbral-gnome-scout": {
    "description": "Batedores gnomos umbrais patrulham os túneis que levam aos povoados.",
    "sections": []
  },
  "creature-herexen": {
    "description": "Quando um clérigo se rebela contra a deidade e morre no aperto de uma fúria blasfema, as heresias cometidas em vida podem alimentar a transformação num herexen morto-vivo. Herexens buscam vingança contra o deus que um dia adoraram: profanam templos, matam fiéis e reúnem mortos-vivos menores e cultistas da morte na busca ímpia. Embora os dons divinos tenham sido em grande parte corrompidos em vileza de morto-vivo, agarram-se teimosos a restos do poder antigo, ainda empunhando magia e armamentos favorecidos pela deidade que tanto desprezam.\n\nGrupos de herexens que blasfemaram contra a mesma deidade às vezes se juntam numa paródia de congregação, conduzindo ritos blasfemos com algo próximo de euforia. Essas congregações muitas vezes nascem de um culto cujos membros praticaram a heresia juntos em vida e morreram juntos, embora alguns reúnam herexens independentes da mesma fé antiga.",
    "sections": [
      {
        "id": "herexen-lairs",
        "title": "Covis de Herexen",
        "body": "A maioria dos herexens se estabelece numa cidade ou região particular para corromper a população local. Herexens poderosos podem ousar fazer covil num templo profanado, criando uma paródia vil da glória antiga do edifício. Porém, a maioria dos herexens se esconde em lugares decrépitos como ruínas, porões esquecidos ou túmulos."
      }
    ]
  },
  "creature-cinder-rat": {
    "description": "Esses roedores enormes são feitos de carvão fumegante e fogo elemental, e fumos nauseantes saem sem parar da carne em chama. Até outros elementais de fogo acham os ratos de cinzas desagradáveis e ficam aliviados quando são invocados para longe do Plano do Fogo.",
    "sections": []
  },
  "creature-zephyr-hawk": {
    "description": "Falcões zéfiro derivam nas correntes do Plano do Ar em bandos grandes. Deleitam-se em cavalgar o vento sem destino.",
    "sections": []
  },
  "creature-brine-shark": {
    "description": "Tubarões-salmoura são elementais mortais que percorrem os oceanos infinitos do Plano da Água. Também escorregam para oceanos mortais, competindo com predadores naturais ou até se juntando a cardumes de tubarões de carne e osso.",
    "sections": []
  },
  "creature-giant-monitor-lizard": {
    "description": "Grandes e aparentemente vagarosos, lagartos-monitor são predadores enganosamente rápidos e cruéis. Emboscam a presa saindo da cobertura e mordendo com mandíbulas poderosas. A saliva do lagarto-monitor gigante é venenosa, permitindo derrubar presas maiores do que conseguiria arrastar. Crescem até uns 4,2 m, incluindo a cauda, e pesam cerca de 160 kg. O corpo em geral é marrom-escuro com manchas amarelas ou verdes.\n\nNa época de ninho, cavam uma toca funda. A toca serve de abrigo e de ponto de emboscada contra presas maiores — cervo, javali ou até humanoide. Um lagarto-monitor gigante pode comer quase o próprio peso numa só refeição, e as mandíbulas frouxas permitem engolir presas surpreendentemente grandes.",
    "sections": []
  },
  "creature-giant-stag-beetle": {
    "description": "O besouro-veado gigante é maior que um cavalo, e vê-lo voar (lento e um tanto desajeitado) em asas zumbidoras é inquietante. As mandíbulas enormes impressionam parceiros, intimidam rivais e desencorajam predadores — e entregam golpes mortais. Embora sejam predadores mortais, tratadores hábeis os domesticam. Nessa função, servem bem de besta de carga ou até de montaria.\n\nPodem ser uma praga séria em pântanos, complexos de cavernas e florestas densas. Mais de um acampamento madeireiro já atraiu um agrupamento de besouros-veado gigantes e teve de ser abandonado por completo, rendendo toda a madeira à fome dos insetos.",
    "sections": [
      {
        "id": "beetle-species",
        "title": "Espécies de Besouro",
        "body": "Inúmeras outras espécies de besouro gigante existem no ermo. Besouros-bombardeiros podem cuspir ácido cáustico como ataque potente, e os verdadeiramente imensos besouros-goliath podem devastar edifícios inteiros ou até castelos com facilidade assustadora."
      }
    ]
  },
  "creature-giant-wasp": {
    "description": "Vespas gigantes são bem mais perigosas, mas menos comuns que as parentes menores e — para alívio de quem as encontra — tendem a ser solitárias.",
    "sections": []
  },
  "creature-scorpion-swarm": {
    "description": "Um tapete vivo de escorpiões, cada ferrão carregado de veneno. Onde um escorpião gigante caça sozinho, o enxame cobre o chão e pica junto.",
    "sections": []
  },
  "creature-snapping-flytrap": {
    "description": "Dionéias típicas têm dois conjuntos de folhas dentadas, cada um com cerca de 90 cm de largura, no fim de hastes de 3 m.",
    "sections": []
  },
  "creature-tomb-jelly": {
    "description": "Geleias de túmulo são massas animadas de protoplasma num mix enjoado de amarelo, cinza e preto. O corpo ácido dissolve carne, mas deixa outros materiais — inclusive equipamento e ossos da vítima — intactos. Algumas culturas antigas enterravam corpos em sarcófagos de pedra com geleias de túmulo para que a gosma quebrasse a carne e limpasse e polisse os ossos.",
    "sections": []
  },
  "creature-living-landslide": {
    "description": "Deslizamentos vivos lembram humanoides feitos de terra e cascalho. Acham libertador se mover pelas muitas superfícies do Universo mortal.",
    "sections": []
  },
  "creature-living-whirlwind": {
    "description": "Um redemoinho vivo lembra um demônio de poeira com boca e olhos vagos formados na poeira e nos destroços que giram dentro.",
    "sections": []
  },
  "creature-flame-drake": {
    "description": "Dracos-chama habitam perto de vulcões e magma, mas não é raro um deles derivar para áreas próximas como florestas ou colinas arborizadas. As escamas em geral são de algum tom de vermelho, às vezes desbotando para pretos e cinzas de fumaça nas bordas das asas e na ponta da cauda.\n\nRampas de dracos-chama muitas vezes vivem de má vontade ao lado de clãs de gigantes do fogo, em vez de serem expulsos dos lares vulcânicos.",
    "sections": []
  },
  "creature-jungle-drake": {
    "description": "Acredita-se que sejam parentes dos dragões chifrudos. Dracos-selva são caçadores perigosos, equipados com veneno debilitante entregue por um ferrão farpado grande ou pelo fleuma nauseante. As asas têm garras vestigiais que permitem manobrar com destreza pela folhagem densa, no voo e no chão. Preferem emboscar a presa com táticas de bater e correr, isolando os mais fracos do grupo e arrastando as vítimas para terminar a refeição à vontade. Rampas de dracos-selva muitas vezes puxam a presa em várias direções para dividir a perseguição.",
    "sections": []
  },
  "creature-nosoi": {
    "description": "Um nosoi lembra um curiango, pardal ou outro pássaro pequeno usando uma máscara pesada de couro de médico da peste. São os escriturários, mensageiros e escribas do Ossário, testemunhando julgamentos, dirigindo almas e fazendo o trabalho administrativo que mantém o Ossário funcionando. A maioria é particularmente falante e ansiosa para discutir o quão importante considera a tarefa individual.",
    "sections": []
  },
  "creature-lyrakien": {
    "description": "Lyrakiens são mensageiras musicais e encarnações da viagem livre. Servem Desna e outras deidades e senhores empíreos do Elísio, mas são bem afeitas ao tempo livre como conceito fundamental e sempre caçam oportunidades de pausar as tarefas para apreciar música ou um momento de beleza. Amam competições, histórias e canções, e muitas vezes desafiam mortais a duelos musicais ou importunam para que contem façanhas. Contam com a agilidade para evitar conflitos, mas dão o máximo para defender lugares de grande beleza natural, sobretudo contra inimigos que a luz estelar fere. Têm uma inquietação nata e raramente ficam no mesmo lugar por muito tempo. Algumas viajam ao lado de aventureiros, muitas vezes escrevendo canções sobre as missões e os feitos ousados.\n\nApesar do jeito leve, não deixam a personalidade caprichosa atrapalhar a proteção de locais naturais de tirar o fôlego. Gnomos e halflings às vezes as chamam de “asas-brilho” e as confundem com sprites ou fey semelhantes — uma confusão que muitas lyrakiens acham fértil para peças contra quem consideram merecedor de uma dose inesperada de diversão e discórdia.",
    "sections": []
  },
  "creature-cacodaemon": {
    "description": "Essas encarnações torcidas de violência e rancor nascem de redemoinhos de almas zangadas e deformadas nas brumas de Abaddon. Cacodaemons têm fome constante de almas mortais e anseiam criar sofrimento. Esferas de dentes, nadadeiras e espinhos, são os mais fracos da estirpe daemon: uma amálgama de mortes mesquinhas sem a força que vem de focar numa só causa de falecimento.",
    "sections": []
  },
  "creature-weretiger": {
    "description": "Esses licantropos ferozes perseguem a presa com a astúcia e a habilidade de um predador de ápice. Homens-tigre em geral veem toda vida como refeição em potencial. Caçadores noturnos poderosos, com sentidos excelentes que ajudam a emboscar, adaptam-se a uma faixa extrema de ambientes. Porém, os que vivem em cidades densas (como cortesãos, assassinos ou líderes de guilda) muitas vezes lutam para reprimir o instinto assassino, vencidos pela urgência de caçar.",
    "sections": []
  },
  "creature-nightmare": {
    "description": "Pesadelos são equinos flamejantes, arautos da morte.",
    "sections": []
  },
  "creature-troll-warleader": {
    "description": "Trolls longevos às vezes forçam o caminho pelas distrações gêmeas da fome e da dor para aprender mais do mundo. Para manejar a regeneração, aprendem a se cobrir de armadura tosca que aos poucos se integra à camada de cima da carne. Marcados por essa armadura e ajudados pela astúcia superior, esses líderes de guerra reúnem trolls variados para servi-los em partidas de saque.\n\nO líder apresentado aqui é um troll da floresta, mas líderes de guerra podem ser outros tipos. Muitos se adaptam a táticas mais adequadas ao ambiente natal.",
    "sections": []
  },
  "creature-greater-hell-hound": {
    "description": "Acredita-se que sejam criados pelos próprios Reis do Inferno em canis vastos. Cães infernais maiores são os guardas e cães de caça prediletos de capetas poderosos e, raro, de mortais que os adoram e ganharam favor.",
    "sections": [
      {
        "id": "hell-hound-minions",
        "title": "Lacaios Cães Infernais",
        "body": "Fora do Inferno, cães infernais às vezes são encontrados a serviço de monstros amantes do fogo como gigantes do fogo ou ifrits, bem como de mortais que buscam domar parte do poder bruto do Inferno. Em Cheliax, Hellknights ocasionalmente invocam cães infernais para rastrear fugitivos e traidores."
      }
    ]
  },
  "creature-greater-shadow": {
    "description": "Sombras que passam muito tempo no Mundo Inferior e absorvem sua magia tornam-se sombras maiores.",
    "sections": []
  },
  "creature-ghost-mage": {
    "description": "Um mago que morreu com o trabalho incompleto pode se tornar um mago fantasma.",
    "sections": [
      {
        "id": "building-ghosts",
        "title": "Construindo Fantasmas",
        "body": "Note que o mago fantasma é construído do zero, em vez de aplicar as regras de fantasma a uma criatura que um dia viveu, então os números não coincidem exatamente com os valores listados em Criar um Fantasma. Esse em geral é o melhor caminho se você tiver tempo, pois permite criar um fantasma sob medida para a situação."
      }
    ]
  },
  "creature-vampire-count": {
    "description": "Condes vampiros governam os domínios e os súditos com uma mistura de medo e crueldade.",
    "sections": []
  },
  "creature-clay-effigy": {
    "description": "Tradicionalmente, efígies de argila são moldadas à imagem de uma deidade e usadas como guardiãs de túmulos ou criptas sagradas. Têm o poder de lançar maldições nas vítimas como punição por invasão, levando muitos a crer que esses construtos muitas vezes antigos têm um toque do divino. Por excesso de cautela, supersticiosos ainda pisam leve perto de estátuas elaboradas ou particularmente bem feitas que lembrem efígies de argila, mesmo de longe.\n\nPara algumas, essa proteção divina vai mais fundo. Embora deidades raramente tenham tempo para vigiar as efígies, servos divinos menores às vezes são encarregados de observá-las. Quando a efígie é danificada, esses guardiões sentem. As mais preciosas são cobertas de rituais que convocam os guardiões direto. Ladrões de túmulo experientes aprendem a enxergar tais marcas de longe, para serem avisados de interferência divina na área.\n\nEmbora muitas vezes designadas a proteger relíquias religiosas valiosas e outros tesouros, o tamanho e os movimentos pesados as tornam mal-adaptadas a guardar itens frágeis. Tesouros inteiros já foram arruinados por batalhas desajeitadas, então artesãos fazem bem em guardar as riquezas em recipientes sólidos — ou colocar a efígie do outro lado da porta.",
    "sections": [
      {
        "id": "clay-shards",
        "title": "Estilhaços de Argila",
        "body": "Os restos de efígies de argila valem mais para arqueólogos e estudiosos do que para mercadores. Os tesouros magníficos muitas vezes guardados por esses sentinelas antigos, porém, são outra questão de todo."
      }
    ]
  },
  "creature-stone-mauler": {
    "description": "Esses montes imponentes de terra infligem dano tremendo de perto e de longe.",
    "sections": []
  },
  "creature-centaur-herbalist": {
    "description": "Muitos centauros são hábeis no estudo de plantas, sobretudo nas áreas em que vagueiam. Usam tais ervas tanto para curar quanto para causar aflição em quem os ataca.",
    "sections": [
      {
        "id": "centaur-craftwork",
        "title": "Artesanato Centauro",
        "body": "Muitos centauros apreciam armas e armaduras finas. Alguns fabricam as próprias, mantendo desenhos tradicionais das comunidades, enquanto outros usam armamentos de qualidade tomados dos inimigos; porém, devido às formas, centauros que queiram usar armadura mais pesada que couraças precisam tê-la feita sob medida."
      }
    ]
  },
  "creature-lamia-matriarch": {
    "description": "As brilhantes e poderosas matriarcas lâmia têm ambição sem fundo, sempre buscando trazer mais gente e território para as garras da espécie. Por isso, tornam-se governantes de outras lâmias. Por toda a crueldade com outras criaturas, são protetoras ferozes das próprias, e rapidamente passam a mandar em cultos ou bandos de guerra. Independentemente do gênero, essas lâmias ascendidas são sempre conhecidas como matriarcas. Uma matriarca se distingue da parentela pelo poder oculto que persegue, e algumas até tiveram grandes planos para quebrar a maldição animalista que as transformou. Porém, cada tentativa até agora levou à queda da matriarca.",
    "sections": []
  },
  "creature-dullahan": {
    "description": "Montado num cavalo negro como a noite, o caçador sem cabeça conhecido como dullahan rastreia e leva as cabeças dos que julga indignos de continuar vivo. Ao se aproximar para matar, primeiro sussurra o nome da vítima, depois coleta o prêmio depressa, lançando um manto de pavor sobre quem testemunha a execução sombria.\n\nUm dullahan se manifesta quando um guerreiro particularmente violento é decapitado e a alma se agarra teimosa à existência material (ou é recusada no além). A maioria volta às terras natais para vingar-se de quem sente que os ofendeu em vida (ou dos descendentes vivos). A ideia de justiça de um dullahan é rápida e implacável; uma vez escolhido o alvo, não vacila.\n\nTalvez mais do que vingança, um dullahan deseja a própria cabeça podre. Quem empunha a cabeça de um dullahan é poderoso de fato, pois o dullahan servirá de má vontade na esperança de recuperar o crânio. Capetas poderosos como diabos mandam dullahans colher almas ou liderar exércitos; um mortal pode usar tal guerreiro morto-vivo para uma vendeta pessoal. O dullahan não hesita em matar o suserano e retomar a cabeça quando a oportunidade surgir.",
    "sections": [
      {
        "id": "dullahan-legends",
        "title": "Lendas de Dullahan",
        "body": "Em Ustalav, residentes recitam lendas de um quadro de dullahans que conduzem a \"Carruagem do Silêncio\", uma carruagem fúnebre macabra puxada por uma equipe de cavalos espectrais. A oeste, nas Terras dos Reis Linnorm, guerreiros Ulfen sussurram de dullahans que caçam as vítimas usando matilhas de cães de ébano infernais. E ao longo das costas ocidentais de Garund, piratas e mercadores igualmente insistem na existência de um navio de velas negras tripulado inteiramente por marinheiros mortos-vivos sem cabeça."
      }
    ]
  },
  "creature-sphinx": {
    "description": "Esfinges são seres místicos com corpo de leão, asas de ave grande e torso e cabeça de humano. Muitas vezes malvistas nas lendas como meros monstros, e embora sejam rápidas à ira e capazes de retribuição mortal por ofensas percebidas, também são muito inteligentes.\n\nCostumam ser associadas a desertos, mas também habitam climas mais amenos. Formam grupos pequenos de uma só família estendida, que caça e trabalha junta para proteger e ensinar os filhotes. Ao amadurecer, desenvolvem uma inquietação, um impulso de reunir saber oculto e resolver os maiores enigmas do mundo — o traço talvez mais identificado com a espécie.\n\nEmbora às vezes sejam presas a serviço como guardiãs de conjuradores poderosos, esfinges solitárias também se encontram em jornadas de descoberta e como vendedoras de lore esotérico. Se tratadas com o respeito devido — e bem alimentadas — podem mostrar disposição a trocar informação. A moeda predileta, claro, são enigmas e segredos. Quem troca saber por saber tem bem mais chance de sucesso ao barganhar. Porém, a sede insaciável de enigmas novos e a coleção vasta de segredos acumulados em séculos de vida tornam difícil oferecer o que ela ainda não sabe. Quem tenta trocar insight mesquinho e enigmas velhos pode despertar a ira da esfinge — e não viverá o bastante para se arrepender.",
    "sections": [
      {
        "id": "sphinx-riddles",
        "title": "Enigmas de Esfinge",
        "body": "Esfinges são bem conhecidas pelo amor a enigmas, um amor que muitas vezes entra no reino da obsessão. Um adversário em potencial que consiga responder aos enigmas prediletos de uma esfinge — ou, melhor ainda, que consiga deixar a esfinge sem resposta com um enigma astuto e criativo próprio — muitas vezes pode evitar o combate com a criatura e até assegurar o auxílio dela."
      }
    ]
  },
  "creature-marsh-giant": {
    "description": "Moradores de pântanos salgados costeiros e brejos fétidos, gigantes do pântano parecem hediondos à maioria de quem respira ar: bocas de peixe, pele cinza-esverdeada viscosa e olhos escuros e miúdos. Preferem comer a carne dos que abatem em batalha, inclusive outros gigantes do pântano, e engolem água estagnada de caldeirões ou direto dos lares alagados.\n\nClãs são insulares, cada um dedicado ao culto zeloso de uma deidade marinha, senhor demoníaco ou entidade mais estranha. As forças que chamam os gigantes do pântano às vezes atraem também boggards e ogros, reunidos em culto sombrio. Em vez de favorecer esses humanoides agregados, os gigantes mimam os animais prediletos: krooths, polvos gigantes ou criaturas primevas como dinossauros e deinosuchus crocodilianos.\n\nMal passam de 3,3 m e 450 kg, são pequenos para gigantes, mas compensam a estatura com o zelo.",
    "sections": [
      {
        "id": "gaffs",
        "title": "Bicheiros",
        "body": "Muitos gigantes do pântano lutam com um bicheiro superdimensionado — um comprimento de madeira com um gancho de metal afixado na ponta. Os gigantes usam-nos para afogar a presa como pescadores humanoides os usam para içar peixes. Um bicheiro é uma arma marcial comum do grupo clava. Causa 1d6 de dano de concussão e tem Volume 1. Exige uma mão para usar e tem os traços de arma Derrubar e versátil P. Bicheiros estão prontamente disponíveis em qualquer lugar onde vivam pescadores, custando 1 po."
      }
    ]
  },
  "creature-stone-giant": {
    "description": "Gigantes da pedra são pastores e artistas estoicos e reclusos, com história rica e um acervo de tradições. Habitam cavernas em montanhas altas e cadeias acidentadas, onde a pele acinzentada os deixa misturar-se ao entorno e passar despercebidos, apesar de uns 3,6 m de altura. Viajantes benignos que encontram um clã não precisam se preocupar: gigantes da pedra não convidam confronto. São, em grande parte, um povo pacífico que busca sabedoria na exploração da natureza e em longas meditações sobre os elementos do mundo natural. Os anciãos estão entre os mais sábios dos gigantes, usando carisma e magia druídica para levar os clãs à prosperidade e à harmonia com a natureza.\n\nUm clã em geral cria alguns animais como companhia, favorecendo ursos das cavernas, elefantes ou dinossauros conforme o ambiente. Muitos também aceitam aliados, considerando arbóreos, elementais e até gárgulas parentes pela ligação compartilhada com a terra.",
    "sections": []
  },
  "creature-gorilla": {
    "description": "Gorilas podem ser territoriais, sobretudo se provocados por caçadores ou pela presença de monstros mais perigosos. Um gorila usa as presas e os braços poderosos para morder e esmurrar invasores com abandono selvagem.",
    "sections": [
      {
        "id": "gigantopithecus",
        "title": "Gigantopithecus",
        "body": "Esses parentes ferozes dos orangotangos são três vezes mais pesados que um gorila. São de 4º nível, com estatísticas aproximadamente semelhantes às de um gorila de elite."
      }
    ]
  },
  "creature-smilodon": {
    "description": "Smilodons são grandes felinos dentes-de-sabre, predadores de ápice bem mais musculosos e largos que outras espécies de grande felino. Muitas vezes matam a presa com uma estocada rápida na garganta ou noutro ponto vulnerável. As presas desproporcionais são particularmente cobiçadas como troféu.",
    "sections": []
  },
  "creature-great-white-shark": {
    "description": "Predador de ápice das águas costeiras de superfície onde caça, o grande tubarão-branco é uma das maiores espécies de tubarão. Esses assassinos silenciosos deslizam com graça pelo oceano, sempre em busca da próxima refeição.",
    "sections": []
  },
  "creature-giant-octopus": {
    "description": "Polvos gigantes são encontrados no coração de oceanos profundos e escuros. Espertos e adaptáveis, caçam e devoram todo tipo de animal. Apesar de crescerem até uns 4,8 m, um polvo gigante comprime o corpo para passar por frestas pequenas, desde que caiba o bico.\n\nFavorecem naufrágios, recifes de coral ou cavernas submersas como covil, onde tiram proveito dos estreitos para proteção. Como os parentes menores, gostam de enfeitar e decorar o covil com objetos achados — muitos dos quais, no caso do polvo gigante, também são armas mágicas, escudos ou obras de arte salvadas de navios afundados ou aventureiros caídos.",
    "sections": []
  },
  "creature-ankhrav-hive-mother": {
    "description": "Mães da colmeia ankhrav são predadoras temíveis que se distinguem do ankhrav típico não só pelo tamanho maior, mas pelo par grande de braços afiados como de louva-a-deus.",
    "sections": []
  },
  "creature-awakened-tree": {
    "description": "Regentes arbóreos e outros portadores de magia primordial poderosa concedem sentiência temporária a árvores para proteger a floresta. Investidas de um conjunto funcional de instintos e da capacidade de se mover e atacar, essas árvores despertas seguem as ordens do mestre e lutam para defender o lar. As estatísticas abaixo servem igualmente para folhagem animada por outros métodos: influência mística de outra dimensão, um espírito fey caprichoso e afins.",
    "sections": []
  },
  "creature-abrikandilu": {
    "description": "Demônios destroçadores, também chamados abrikandilus, odeiam coisas belas e fazem de tudo para destruir pessoas e objetos tidos como tais. Um abrikandilu se forma das almas de mortais que foram vândalos, misantropos ou defaceadores de arte — sobretudo se a destruição nasceu de inveja poderosa.\n\nO abrikandilu odeia só uma coisa mais que a beleza: o próprio rosto. A mera visão da cara — refletida num espelho, num escudo ou até numa poça — pode mandá-lo para a fúria. Muitos caçadores de demônios usam essa tática a seu favor, indo à batalha com escudos de aço polido e lâminas de ferro frio à mão.",
    "sections": []
  },
  "creature-air-wisp": {
    "description": "Fagulhas do ar são esferas flutuantes de nuvem e tempestade, zumbindo sem parar num tom leve e sussurrado. São brincalhonas e caprichosas, com grande curiosidade por estranhos.",
    "sections": []
  },
  "creature-amoeba-swarm": {
    "description": "Um enxame de amebas é milhares de organismos unicelulares presos por lodo de cheiro acre. Tão vorazes quanto irracionais, não usam tática nenhuma.",
    "sections": [
      {
        "id": "amoebas-large-and-small",
        "title": "Amebas Grandes e Pequenas",
        "body": "Amebas gigantes e enxames de amebas costumam ser encontrados perto uns dos outros, pois as duas gosmas fazem parte do mesmo ciclo de vida. Quando uma ameba gigante cresce o bastante, pode se dividir espontaneamente em dois enxames de amebas separados, e quando um enxame de amebas se alimenta o bastante, seus componentes individuais podem se fundir numa única criatura."
      }
    ]
  },
  "creature-amphisbaena": {
    "description": "A anfisbena é uma víbora venenosa enorme e agressiva, com uma cabeça em cada ponta do corpo. Move-se como a cascavel-de-lado: lança o corpo para a frente em arco e se ancora mantendo uma cabeça ou a outra no chão o tempo todo.\n\nA presa típica inclui coelhos, raposas, várias aves, cervos pequenos e até humanoides, se a oportunidade aparecer. Territorial ao extremo, ataca quase tudo que se aproxima do covil, independente do tamanho. Muita criança já ouviu o aviso de não ir longe demais na mata sozinha, para não chegar perto demais de um ninho de anfisbena e virar a próxima refeição.\n\nO veneno é potentíssimo: um anão robusto cai em minutos se não tratado. Também entra em vários remédios, o que o torna mercadoria valiosa. Uma pessoa grávida pode ser aconselhada a beber o veneno em doses pequenas e diluídas para proteger a gestação. Misturado a ervas e óleo, vira cataplasma que alivia dores. Por isso a imagem da anfisbena aparece em muitos contextos ligados a cura e alquimia: rótulos de tintura, anotações de herbalistas, ilustrações em livros de medicina.\n\nDizem que a primeira anfisbena nasceu do sangue que caiu quando a cabeça de uma medusa foi decepada. A história provavelmente vem do fato de serem imunes à petrificação, o que leva algumas medusas a criá-las como companheiras — tesouro ou até filho. Apesar da origem lendária e do tratamento especial ocasional, anfisbenas são animais mundanos, de inteligência rudimentar e sem magia inata.",
    "sections": [
      {
        "id": "amphisbaena-variants",
        "title": "Variantes de Anfisbena",
        "body": "Embora a cobra de duas cabeças seja de longe a anfisbena mais comum, o termo às vezes descreve outras criaturas com cabeças nas duas pontas do corpo. De vez em quando, circulam histórias de uma anfisbena monstruosa com corpo de lagarto, pés garrados ou até asas emplumadas. Essas histórias em geral são atribuídas a uma imaginação hiperativa ou a um excesso de bebida, mas persistem mesmo assim."
      }
    ]
  },
  "creature-attic-whisperer": {
    "description": "Cuidado com os soluços do sussurrante do sótão: carregam a ira dolorida de uma criança abandonada que morreu pela negligência ou ausência dos cuidadores. Animado pela solidão, o espírito amargo se prende ao mundo material num corpo feito de restos de infância — blocos de madeira, retalhos de cobertor, bonecas surradas, botões, tralhas talhadas, gude de vidro. Para ter jeito de cabeça, coroam o corpo de retalhos com o crânio de um animal pequeno.\n\nEspreitam com mais frequência em enfermarias velhas, orfanatos e instituições onde crianças foram esquecidas. Dormem décadas na esperança de achar um companheiro de brincadeira. Quando sentem os vivos, tentam atraí-los com a voz de uma criança. Querem só brincar — mas os impulsos sombrios drenam fôlego e voz dos vivos.",
    "sections": [
      {
        "id": "varisian-nursery-rhyme",
        "title": "Cantiga de Ninar Varisiana",
        "body": "_O sótão está sussurrando? Estamos seguros embaixo? Você acha que ele escuta? É aquela a sombra dele?\n\n Você o ouve acordando, Lá em cima da escada? Você o ouve chorando? Ele está mesmo ali?\n\n Consegue dizer \"estou falando?\" Você não diz nada? É você quem está chorando? Foi você que ele pegou?_"
      }
    ]
  },
  "creature-badger": {
    "description": "O texugo típico tem pelo marrom-acinzentado escuro, marcado de branco sobretudo na cabeça, formando uma máscara listrada em volta dos olhos. Ameaçado, vira depressa um combatente feroz, que em geral luta até morrer.",
    "sections": []
  },
  "creature-bison": {
    "description": "Bisões são bovinos grandes, de focinho curto e dois chifres; pesam até cerca de 900 kg e medem até 1,8 m na cernelha. Manadas trovejam pelas planícies gramadas de Golarion. São visão comum nas Planícies Assobiantes a leste de Taldor e nos pastos largos de Karazh, em Casmaron; também aparecem no nordeste mais frio de Avistão, nos Reinos Fluviais até Numéria, e no Reino dos Senhores dos Mamutes e no Sarkoris ocidental.\n\nComunais, reúnem-se em grande número na temporada de acasalamento do verão, antes que os touros se separem para vagar. Adaptaram-se bem aos invernos duros da pradaria: o pelo cresce mais grosso e os isola; diante de nevascas, viram-se contra o vento e abaixam-se para reduzir a exposição.\n\nO jeito de se espojar na terra ou esfregar-se em pedras grandes faz muita gente confundir docilidade com passividade. Essa presunção já arruinou muitas partidas de caça. Carne farta e peles densas são prêmio tentador, mas com o chão trovejando debaixo delas, bisões atropelam caçadores inexperientes despreparados para uma estampida. Essas partidas às vezes contratam aventureiros ousados, que somam magia, aço e ofício para garantir a caçada.\n\nOs bisões das planícies são os mais conhecidos e numerosos, mas têm primos tanto em florestas boreais densas quanto em estepes abertas. Essas variantes são mais altas, mas não igualam a velocidade e a agressão dos parentes menores da planície.",
    "sections": [
      {
        "id": "bison-drives",
        "title": "Batidas de Bisão",
        "body": "Caçar bisões é um empreendimento comunal. Centauros das planícies organizam-se em brigadas de caça e correm ao lado dos membros de uma manada em estampida, lanceando e atirando à queima-roupa. Povos menos móveis usam disfarces para conduzir os bisões à posição antes de assustá-los para que se lancem de despenhadeiros ou entrem em currais onde possam ser abatidos. Uma única manada de bisões pode fornecer carne, peles e pelames suficientes para uma comunidade inteira."
      }
    ]
  },
  "creature-blood-hag": {
    "description": "Bruxas de sangue, também chamadas soucouyants, infiltram comunidades disfarçadas de jovens inocentes. O disfarce é mais que ilusão: a bruxa veste a pele de uma vítima anterior para esconder a aparência verdadeira. De dia, o disfarce é quase perfeito. Depois do pôr do sol, tira a pele, esconde-a num lugar seguro e espreita a noite para beber o sangue que a sustenta.\n\nCapazes de viajar depressa na forma de uma bola de fogo e de esgueirar-se por fechaduras ou pela menor fresta de porta ou janela, alimentam-se de vítimas adormecidas e voltam para casa antes da manhã para vestir a pele roubada.",
    "sections": [
      {
        "id": "blood-hag-skin",
        "title": "Pele de Bruxa de Sangue",
        "body": "A pele de uma bruxa de sangue morta pode ser usada como componente em rituais sombrios que invocam poderes demoníacos. Um herói que saiba disso em geral destrói a pele. Aventureiros menos escrupulosos podem vender esse prêmio por uma soma substancial (80–120 po). Podem depois descobrir que ajudaram o comprador a soltar um flagelo terrível sobre o mundo — se o comprador não os matar primeiro."
      }
    ]
  },
  "creature-brownie": {
    "description": "Brownies fazem lar em troncos ocos, tocas terrosas miúdas e até debaixo de alpendres ou no porão de casas de fazenda. Muitas vezes vestidos de roupa que parece feita de plantas ou folhas, usam cintos forrados de bolsos e ferramentas. Qualquer língua que escolham falar vem recheada de pronúncias estranhas e coloquialismos. A fala pode puxar expressões décadas ou séculos fora de moda, ou misturar metáforas de jeitos esquisitos. Quase parece que adotam esses jeitos de propósito — e de fato não reagem bem a correções. Poucas coisas irritam um brownie mais depressa do que tentar corrigir a gramática. Medem pouco mais de 60 cm e pesam uns 9 kg.\n\nDiante do perigo, raramente entram em combate: preferem confundir os atacantes o bastante para fugir. Contentes com o trabalho honesto e o amor da parentela, mantêm natureza pacifista, importunando criaturas só para afastá-las ou punir um insulto. Apesar disso, todos carregam uma lâmina. Falam da espada com um resto de nojo, e de brincadeira a chamam de “último truque”, reservando-a para as piores circunstâncias.\n\nHonestos até o osso, tomam livremente mas sempre pagam o débito com trabalho ou deixam algo para trás. Podem comer uma maçã do pomar e, em troca, colher a árvore inteira. Podem comer uma torta inteira no parapeito e, em seguida, arrumar a cozinha ou lavar a louça. Um brownie pode dividir o lar com uma família por anos sem ser detectado. A família que sabe da presença em geral acha a relação benéfica e deixa pratos de leite, fruta, bugigangas e às vezes vinho como presentes. Em troca, o brownie mantém a casa limpa, remenda roupa, conserta ferramentas e afasta vermes e predadores pequenos. Gabar-se de ter um brownie em casa é o jeito mais certo de perdê-lo. Desconfiam de raposas, temem lobos e evitam fazendas com cães.",
    "sections": [
      {
        "id": "brownie-bargains",
        "title": "Barganhas de Brownie",
        "body": "Como não são um grupo monolítico de fey e muitas vezes têm as próprias predileções, às vezes é difícil prever o que pode atrair um brownie ou garantir sua ajuda. Um dos presentes mais comuns é um pires de leite ou creme, embora brownies também pareçam apreciar outras iguarias comestíveis. Alguns fazendeiros relatam sucesso ao deixar bugigangas brilhantes, mas insignificantes, como botões, pedras pintadas, vidro liso, dedais ou talheres de prata. Os caprichos dos brownies mudam, então quem quer reter os serviços de um deve variar os presentes que deixa para essas criaturas fey elusivas."
      }
    ]
  },
  "creature-caligni-vanguard": {
    "description": "Crianças caligni nascidas sem olhos — ocorrência raríssima — são consideradas sagradas para as comunidades. Desde cedo são apartadas e preparadas para virar vanguardas, dedicadas a treino marcial rigoroso e a restrições mentais. Outros calignis reverenciam a disciplina e a habilidade de combate, mas o respeito sempre vem tingido de cautela: os motivos das vanguardas costumam ser inescrutáveis. Quase nunca se rebelam contra os deveres ou o papel na comunidade; alguns afirmam que quem o faz é levado pelos owbs.\n\nA armadura da vanguarda está fundida ao corpo em pedaços, e raramente removem o que não está fundido. Essas placas e a audição aguçada as tornam particularmente sensíveis a vibrações sónicas — ao mesmo tempo trunfo e vulnerabilidade.",
    "sections": [
      {
        "id": "vanguard-training",
        "title": "Treino de Vanguarda",
        "body": "Assim que uma vanguarda caligni está velha o bastante para empunhar uma arma, é imersa num regime de treino intensivo que enfatiza austeridade, ascetismo e perícia em armadura pesada. Embora inicialmente dolorosa, a fusão da armadura aos corpos serve de lembrete de suas responsabilidades, e eventualmente acostumam-se à sensação."
      }
    ]
  },
  "creature-camel": {
    "description": "Por gerações, nômades e mercadores dependem de camelos de passo seguro para cruzar desertos e ermos sem trilha. Prosperam onde outros animais definham: pele resistente e a capacidade de guardar nutrientes no corpo. Bem cuidados, esses “navios do deserto” aguentam semanas entre oásis.\n\nTêm três pálpebras contra areia e detritos; uma delas é transparente, e assim veem e viajam no vento forte. Na tempestade de areia, fecham as narinas por completo. A barriga tem pele espessa, que permite deitar em areia escaldante.\n\nAo contrário da crença popular, as corcovas são gordura, não água — energia para ir longe entre refeições. Herbívoros, digerim arbusto duro que outras espécies não comem. Fortes como cavalo de guerra, correm e até disparam por pouco tempo se ameaçados, mas preferem o passo lento para poupar energia.\n\nCamelos de uma corcova, também chamados dromedários, são mais comuns nos desertos do norte de Garund; os de duas corcovas são nativos das estepes secas de Casmaron. Ambos têm porte alto e esguio, cerca de 1,8 m na cernelha e uns 900 kg. Podem ficar rabugentos se maltratados, e não hesitam em morder, coicear ou até cuspir uma substância nauseante em cavaleiros que não os tratam bem.\n\nAlém de transportar gente e carga, são fonte importante de fibra para roupa e tendas, e também de leite. A carne é nutritiva e surpreendentemente saborosa, mas dada a utilidade do animal, esse uso fica para ocasiões especiais ou situações de fato desesperadas.",
    "sections": [
      {
        "id": "camel-cousins",
        "title": "Primos do Camelo",
        "body": "Rumores no alto deserto falam de uma espécie antiga aparentada tanto de camelos quanto de lhamas que ainda vive em vales montanhosos abrigados e ao longo de rios ocultos: o camelops. Maiores e mais fortes que os camelos domesticados, os camelops permanecem criaturas selvagens. Não existem exemplares vivos em cativeiro, embora fábulas de seus pelames luxuosos e resistência indomável levem alguns cavaleiros a procurá-los mesmo assim."
      }
    ]
  },
  "creature-carbuncle": {
    "description": "Lenda e desinformação nunca se encontraram numa testa mais inglória que a do humilde carbúnculo. À primeira vista, não passam de répteis desajeitados. O que os distingue são as habilidades mágicas estranhas e o chifre como gema entre os olhos esbugalhados. Rumores atribuem milagres ao chifre — de cura milagrosa a componente mágico potente; a verdade é mundana: é só um crescimento altamente reflexivo, não muito diferente de uma unha.\n\nPossuem um sentido que detecta tesouro escondido ou obscurecido. Em geral sentem compulsão de se aproximar e permanecer perto. Estranhamente, perdem o interesse quando as riquezas ficam à vista, como se a ocultação fizesse parte do fascínio. Caçadores de tesouro os seguem na esperança de achar riqueza — mas o medo do carbúnculo torna a empreitada difícil. A maioria abandona o ninho depois de um susto, mesmo quando o sentido os puxaria de volta.",
    "sections": [
      {
        "id": "carbuncle-chatter",
        "title": "Falatório de Carbúnculo",
        "body": "\"Um lagarto com uma gema do tamanho de uma maçã saindo da testa? Que ilusão!\"\n\n\"Carbúnculos existem! Quase peguei um, mas embora mal conseguisse andar, a magia dele permitiu que escapasse das minhas garras.\"\n\n\"Os poderes de controle da mente poderiam torná-los familiares úteis, mas se você algum dia pegar um, ele morre de susto.\"\n\n \"Meu conselho é ficar longe dessas pragas. Eles bebem suas esperanças e aspirações pelos chifres, deixando você vazio, restando só azar e dor de barriga.\"\n\n \"Planejando uma caçada a carbúnculo? Melhor deixar o amor-próprio em casa e estar pronto para sair com menos amigos do que tinha no começo!\""
      }
    ]
  },
  "creature-clockwork-mage": {
    "description": "Um mago de corda é uma mistura letal de magia e maquinaria. Cada um desses autômatos traz uma pedra arcana no núcleo, que alimenta magias pela varinha embutida no peito.",
    "sections": []
  },
  "creature-clockwork-soldier": {
    "description": "Essas máquinas diligentes guardam o posto atribuído sem jamais cansar. Um soldado de corda típico mede cerca de 1,8 m e consiste em uns 225 kg de metal e magia.",
    "sections": []
  },
  "creature-clockwork-spy": {
    "description": "Engenheiros, tecnólogos e magos mecanicamente talentosos empregam espiões de corda — construtos miúdos, com jeito de aranha, capazes de gravar e reproduzir áudio — para vigiar inimigos em segredo ou roubar segredos de concorrentes. O corpo esguio e as peças delicadas os tornam inadequados para combate; de fato, a maioria dos construtores inclui um mecanismo de autodestruição para que a intromissão não possa ser rastreada até eles.",
    "sections": []
  },
  "creature-cockroach-swarm": {
    "description": "Embora baratas tendam a se reunir em espaços apertados, uma colônia perturbada às vezes enxameia: centenas ou até milhares de insetos saem dos esconderijos numa jangada de carapaças marrons e pretas brilhantes, sobre milhares de patas. Dado o nojo que muita gente sente por baratas, deparar-se com um enxame desses alarma até aventureiros experientes. Perturbadas, são implacáveis: em contraste com o jeito normalmente arisco e inofensivo, como enxame perseguem quem as provocou e assediam com milhares de picadas ardidas.",
    "sections": []
  },
  "creature-cunning-fox": {
    "description": "Guias espirituais da astúcia são muitas vezes vistos como os mais fracos dos guias, mas também são os mais numerosos e proativos: mostram caminhos seguros às famílias ou deixam comida e água para guerreiros. Guias da astúcia costumam assumir a forma de raposas.",
    "sections": []
  },
  "creature-deep-one-hybrid": {
    "description": "Seja pela fé devota a Dagon, seja pela linhagem biológica, alguns humanos exibem marcas físicas da ligação com os profundos.",
    "sections": []
  },
  "creature-deep-one": {
    "description": "Um profundo maduro médio pesa uns 135 kg e mede cerca de 2,1 m de comprimento, embora pareça mais baixo em terra por causa da postura larga e da corcunda natural.",
    "sections": []
  },
  "creature-draugr": {
    "description": "Cadáveres erguidos de marinheiros que morreram no mar, os draugrs feder a podridão das profundezas salgadas. Os olhos brilham com luz verde pavorosa; algas podres, cracas e criaturas marinhas mortas grudam no corpo. Não falam, mas expressam emoções maliciosas com gorgolejos, como se afogassem para sempre com os pulmões cheios d’água. Querem pouco além de atacar os vivos, sobretudo quem navega. Mesmo em terra, muitas vezes arrastam os cadáveres de quem derrubam de volta à água, povoando as profundezas com ainda mais mortos.\n\nErguem-se nos lugares assombrados do mar, onde espíritos inquietos, marés de energia do Vazio ou tempestades sobrenaturais entregam a morte. Um cadáver pode descansar no fundo por um tempo antes de despertar. Coletando detrito e organismos, o corpo fica cada vez mais nojento até enfim se erguer. A proximidade de vida inteligente apressa o processo: um explorador submarino que topa com um naufrágio pode fazer um corpo despertar de súbito. Esses mortos-vivos não levam a intromissão na leveza, sobretudo no local da própria morte.\n\nEmbora odeiem os vivos, são suscetíveis a lembranças da vida de marinheiro. Em particular, uma canção de marinheiro bem cantada ou uma canção de trabalho de pergunta-e-resposta pode fazer o draugr se perder por um instante. Já foram vistos gorgolejando junto, incapazes de cantar as palavras, mas oferecendo acompanhamento assombrado. A calmaria raramente dura: a beleza da canção logo vira lembrança da tragédia, reafirmando o desejo de sangue e morte.",
    "sections": [
      {
        "id": "draugr-captains",
        "title": "Capitães draugr",
        "body": "Draugrs mais poderosos, de olhos vermelhos em brasa, chamam-se capitães draugr. São criaturas de 3º nível com o ajuste Elite e podem lançar Névoa como magia inata divina 3 vezes por dia."
      }
    ]
  },
  "creature-dream-spider": {
    "description": "As teias da aranha dos sonhos têm um tom iridescente e estão infundidas com o mesmo composto alucinógeno da toxina da criatura. Originalmente habitantes de selvas tropicais, adaptaram-se bem a ambientes temperados, prosperando sobretudo nos telhados de cidades onde alquimistas sombrios usam o veneno para produzir drogas viciantes.",
    "sections": [
      {
        "id": "venom-addicts",
        "title": "Viciados em Veneno",
        "body": "Alquimistas talentosos processam o veneno da aranha dos sonhos numa droga viciante. Quem se vicia pode ser levado pelo desespero a procurar aranhas dos sonhos e permitir que as criaturas mordam sua carne para obter a dose — um arranjo que sai pela culatra de forma horrenda quando as aranhas se alimentam."
      }
    ]
  },
  "creature-earth-wisp": {
    "description": "Fagulhas da terra são esferas rolantes de rocha, lama e folhas, zumbindo sem parar com energia baixa e retumbante. São tímidas e arredias, mas ferozmente leais a quem conhecem e confiam.",
    "sections": []
  },
  "creature-ember-fox": {
    "description": "Raposas-brasa lembram as homônimas caninas, salvo pelas chamas que fazem o pelo e as pontas dos bigodes longos tremeluzirem. Gostam especialmente de caçar elementais do Plano da Madeira.",
    "sections": []
  },
  "creature-fire-wisp": {
    "description": "Fagulhas do fogo são esferas crepitantes de chama e cinza, brilhando sem parar de calor. São despreocupadas, barulhentas e rápidas para agir — às vezes de forma imprudente.",
    "sections": []
  },
  "creature-flaming-skull": {
    "description": "Mais perigosos que cabeças decepadas simples, esses crânios estão envoltos em chamas de outro mundo.",
    "sections": []
  },
  "creature-fuath": {
    "description": "Apesar do tamanho pequeno, fuaths são naufregadores encarnados. No escuro da noite, esses gremlins cortam enxárcias, rasgam velas, esmagam sextantes e sujam provisões. Quando o navio naufraga, voltam para saciar o gosto por carne criada em terra. Embora prefiram pegar a presa dormindo, reservam um fim terrível a marinheiros que os atacam: cercam o rosto de água magicamente coagulada para afogá-los em pé.\n\nConstantemente pingando água, fuaths têm cara de cavalo-marinho, pelo verde-alga sobre pele amarela e garras de lagosta no lugar das mãos. Sem a língua Sakvroth, têm dificuldade de se relacionar com outros gremlins além dos hanivers, mas reverenciam bruxas do mar e fey aquáticos perversos.",
    "sections": [
      {
        "id": "fuath-guardians",
        "title": "Guardiões Fuath",
        "body": "Fuaths solitários às vezes se autoproclamam guardiões da natureza, protegendo áreas de desova da sobrepesca ou impedindo o corte descuidado de turfeiras. A maioria, porém, é de sabotadores impenitentes."
      }
    ]
  },
  "creature-giant-badger": {
    "description": "O texugo gigante, violento e territorial, é um predador implacável. Carnívoro obrigatório, consome presa que vai de coelhos a cervos, gado e até o aventureiro ocasional. As garras são afiadas e fortes o bastante para escavar túneis em rocha sólida. Em geral medem cerca de 1,2 m na cernelha e pesam uns 225 kg.\n\nSão ferozmente territoriais e defendem as tocas com fúria, mesmo quando a criatura não é necessariamente uma ameaça. Essas tocas tendem a ser maiores do que o texugo precisa, o que às vezes atrai outras criaturas em busca de lar. Isso leva a muitos encontros entre texugos gigantes e animais maiores, como ursos.",
    "sections": [
      {
        "id": "trained-diggers",
        "title": "Escavadores Treinados",
        "body": "Kobolds e outros que habitam tocas subterrâneas sabem o valor de ter alguns texugos gigantes treinados no covil, pois eles escavam novos túneis e câmaras com facilidade quando o hábito de cavar é direcionado. Claro, o fato de texugos gigantes acharem kobolds e outros moradores do subterrâneo deliciosos significa que depender desses escavadores treinados pode ser um empreendimento arriscado. Um texugo gigante treinado como escavador ou guardião tende a obedecer aos comandos de um único mestre — e, mesmo assim, pode ser propenso a explosões imprevisíveis sem outro motivo além de birra."
      }
    ]
  },
  "creature-giant-cockroach": {
    "description": "Baratas são criaturas comunais, raramente saindo sozinhas a menos que estejam em busca de comida. Se um aventureiro encontra uma só barata gigante na exploração, é melhor tomar precauções contra outras: é bem provável que haja uma colônia inteira por perto.",
    "sections": [
      {
        "id": "cockroach-species",
        "title": "Espécies de Barata",
        "body": "Além da barata gigante comum, outras baratas carnívoras existem pelo mundo. Essas variações incluem a barata-sibilante gigante, a nauseante barata-veneno, a enorme barata-cuspideira (capaz de incapacitar inimigos à distância), a agressiva barata-serra e a misteriosa e rara barata-dragão."
      }
    ]
  },
  "creature-giant-crab": {
    "description": "Caranguejos são crustáceos carniceiros, famosos pela casca dura e pelo passo de lado. Usam as pinças para se defender, caçar e brigar por território. Diante de ameaças de fora da espécie, a maioria prefere fugir; quando a fuga é impossível, agarram o inimigo com toda a força.\n\nAs estatísticas aqui representam caranguejos gigantes que vivem perto da superfície. Os que vivem mais fundo muitas vezes exibem adaptações mais extremas. Os das profundezas onde pouca luz chega ganham visão no escuro e resistência a frio; os adaptados aos trechos mais hostis do mar profundo detectam criaturas próximas por mudanças sutis nas correntes.\n\nEssas criaturas que se esgueiram são prezadas pela carne deliciosa, mas o tamanho as torna alvos perigosos para a colheita.",
    "sections": []
  },
  "creature-giant-frog": {
    "description": "Sapos gigantes podem crescer até cerca de 1,8 m e pesar mais de 90 kg, com fileiras de dentes afiados como navalha na boca escancarada.",
    "sections": []
  },
  "creature-goblin-snake": {
    "description": "Cobras goblin às vezes treinam cobras como bichos ou companheiras.",
    "sections": []
  },
  "creature-grimple": {
    "description": "Ainda mais que a maioria dos gremlins, grimples ressentem as convenções da civilização: salas comuns de estalagem com cantoria barulhenta, pátios de cavalariça com relinchos, campanários com sinos. Vivem para estragar essas convenções: derrubam placas de taverna sobre os fregueses, urinham em barris de chuva e abrem portas de estábulo. Quando mais nada funciona, literalmente vomitam o desdém em quem passa.\n\nLembram gambás humanoides cobertos de sarna, com presas de javali que os ajudam a fuçar montes de lixo em busca de comida. São escaladores ágeis que planar de beiral a beiral nas membranas frouxas entre os membros. Caçadores de gremlin espertos sabem procurar as cascas de pele e o pelo que grimples deixam cair das peles infestadas de parasitas.",
    "sections": [
      {
        "id": "grimple-allies",
        "title": "Aliados Grimple",
        "body": "Grimples às vezes se unem a outros gremlins para causar problemas. Gremlins mais fortes, como jinkins, usam grimples rabugentos para atrair vítimas a armadilhas perigosas. Deixados por conta própria, grimples intimidam mitflits ou treinam ratos gigantes (Monster Core 288) e enxames de aranhas para cumprir suas ordens."
      }
    ]
  },
  "creature-haniver": {
    "description": "Hanivers são o tipo mais benigno de gremlin — fey caprichosos que rasam as ondas em asas de nadadeira borrachenta. Embora não sabotem o ambiente de propósito, marinheiros lamentam os dedos agarradores. A curiosidade incessante os empurra a examinar qualquer objeto que chame a atenção: cesto de fruta virado, saco de moedas, ou os dentes brilhantes de um tubarão (muitas vezes ainda na boca do tubarão, para o pesar do fey). Se gostam do que acham, roubam — praga de pescadores e estivadores em toda parte.",
    "sections": [
      {
        "id": "mari-haniver",
        "title": "Mari Haniver",
        "body": "Marinheiros às vezes fixam um \"Mari Haniver\" à proa do navio. Feito da carcaça seca de uma raia, esse truque esperto de taxidermia se parece o bastante com um haniver morto para espantar gremlins. Mas se um haniver perceber o blefe, não parará por nada para atormentar seus pretensos enganadores."
      }
    ]
  },
  "creature-hippopotamus": {
    "description": "Hipopótamos adultos típicos se movem rápido em terra e atacam com furtividade na água.",
    "sections": []
  },
  "creature-house-drake": {
    "description": "Belamente coloridos em roxos e azuis elétricos, os dragonetes chamados dracos-domésticos são de fato brilhantes em mais de um sentido. São brincalhões e bondosos e, embora tenham longa tradição de ajudar conjuradores, preferem ser tratados como iguais e parceiros, não como bichos. São bastante inteligentes e não apreciam a condescendência de quem os trata como animais simples.\n\nEsses dragõezinhos aparecem em contos tradicionais varisianos há séculos, mas só relativamente há pouco ficaram conhecidos pelo nome “draco-doméstico”. O nome novo surgiu na cidade de Korvosa, onde se adaptaram particularmente bem à vida urbana. Quando estudantes da escola de magia chamada Acadamae falharam nos estudos e deixaram familiares imp à solta, esses dragõezinhos descobriram que eram especialmente adequados para combatê-los. As duas espécies se equivalem em astúcia. Embora os embates em geral comecem tentando superar uns aos outros, muitas vezes terminam em brigas bagunçadas pelos telhados e becos. Os moradores de Korvosa apreciaram tanto a proteção quanto a aparência e o jeito encantadores. Assim, a população floresceu, e dracos-domésticos são mais comuns em Korvosa do que em qualquer outro lugar do mundo.\n\nTêm hábitos de higiene peculiares: muitas vezes afiam os dentes em moedas de prata ou joias miúdas. Por isso, as mordidas e o sopro vêm tingidos de partículas de prata. Fora isso, são carnívoros: comem vermes e aves pequenas. Embora sejam capazes de caçar, muitos acham a caça um tanto tediosa e aceitam de bom grado doações de comida, preferindo gastar o tempo em outros passatempos. Para cair nas graças de um draco-doméstico de verdade, porém, o presente deve ser de prata. Doações a esses dragonetes viraram prática regular em Korvosa, a ponto de “já pagou algum drake hoje?” ter virado frase comum para sugerir que alguém é um tanto ingênuo e mole de coração. Essas doações são só isso — caridade. Dracos-domésticos evitam qualquer coisa que se pareça com emprego, orgulhosos da autossuficiência e da capacidade de escolher como gastar o tempo.",
    "sections": [
      {
        "id": "ancient-tails",
        "title": "Contos Antigos",
        "body": "Alguns dos contos mais antigos narrados entre viajantes varisianos falam de dragõezinhos enviados por Desna para confortar e ajudar seus seguidores durante uma tirania há muito esquecida. Com a recente redescoberta do antigo império tassiloniano, alguns sugerem que esses contos — e portanto os próprios dracos-domésticos — apareceram pela primeira vez naquela era distante."
      }
    ]
  },
  "creature-ice-troll": {
    "description": "Trolls do gelo são pesadelos congelados de garras manchadas de geada e dentes de geada, que assombram geleiras, montanhas e tundras. A fome incessante os empurra a perseguir manadas de alce, colônias de foca e vilas humanas. Os que regeneram selados em blocos de gelo ou permafrost podem nascer do gelo num degelo depois de meses, anos ou até décadas de fome incessante, até enfim se libertarem.",
    "sections": [
      {
        "id": "mixing-variations",
        "title": "Misturando Variações",
        "body": "Trolls das cavernas e trolls do gelo geram os próprios trolls jotund, trolls de duas cabeças e líderes de guerra. Nesses casos, mude a imunidade, a regeneração e as fraquezas para combinar com a origem. Você também pode atualizar o gatilho da reação e a remoção de dano persistente para combinar com essas fraquezas."
      }
    ]
  },
  "creature-kappa": {
    "description": "Travessos por natureza, kappas se deleitam em pregar peças em viajantes desavisados. Raramente são maliciosos de verdade, mas viram um incômodo sério: roubam roupa de banhistas ou comida esquecida na fogueira. Também gostam de provar o valor em competições de força e, apesar da trapaça, são competidores honrados: cumprem a palavra e permanecem corteses na conversa.\n\nVariam de região para região, mas todos são humanoides anfíbios com jeito de tartaruga: bico, mãos e pés palmeados, escamas viscosas do verde-azulado ao amarelo-pálido. Muitos têm cabelo preto em anel, deixando livre a depressão no alto da cabeça. Água do lago, riacho ou rio natal enche essa tigela, dita a fonte da força deles. Kappas jovens caem fácil no truque de se curvar e esvaziar a tigela; sem a água, ficam letárgicos. Quanto mais tempo a tigela permanece vazia, mais fracos ficam — raramente fatal perto de casa, mas perigoso para o kappa aventureiro longe da água natal.\n\nNão são hostis por natureza e já fizeram amizade com crianças solitárias e ajudaram aventureiros encalhados com direções ou tratamento médico menor. Mesmo assim, muitas áreas onde kappas habitam têm placas avisando da presença e incentivando viajantes perto da água a jogar um pepino — a comida favorita deles — em troca de passagem segura. Às vezes os próprios kappas colocam essas placas para aumentar a chance de um petisco saboroso.",
    "sections": [
      {
        "id": "a-sinister-side",
        "title": "Um Lado Sinistro",
        "body": "Kappas desprezam cavalos e matam e consomem com gosto qualquer cavalo que se aventure perto demais da beira d'água. Por isso, às vezes são confundidos com goblins de armadura estranha. Alguns kappas vis até desenvolveram gosto por carne humana e já foram vistos afogando pessoas antes de despedaçá-las para consumo."
      }
    ]
  },
  "creature-kelpie": {
    "description": "Kelpies são fey malévolos, anfíbios e metamorfo, que atraem mortais para uma cova aquática. Esses predadores cruéis espreitam corpos d’água de qualquer tipo, com leve preferência pela doce sobre a salgada. Atraem ou arrastam a presa para debaixo d’água, afogam e devoram, deixando para trás só o coração e o fígado — as únicas partes da refeição que acham desagradáveis — jogados na margem. Gostam de se disfarçar magicamente de corcel fino ou de estranho atraente; a forma verdadeira é um equino hediondo, de carne verde viscosa que lembra planta aquática.",
    "sections": [
      {
        "id": "kelpie-folktales",
        "title": "Folclore de Kelpie",
        "body": "Algumas histórias fantasiosas sobre kelpies falam deles aparecendo em forma equina usando arreios de montaria, completos com estribos e bridão de prata. Esses contos populares afirmam que cortar o arreio do corpo de um kelpie concede ao portador poder sobre ele ou faz o kelpie adoecer e morrer. Na verdade, fazer isso não tem efeito adverso sobre um kelpie, sugerindo que essas histórias são espalhadas pelos próprios kelpies para enganar ainda mais a presa a cometer erros tolos."
      }
    ]
  },
  "creature-leprechaun": {
    "description": "Leprechauns são trapaceiros sobretudo joviais, que preferem travessura a conflito. Enchem o dia de diversão, vinho e comida. Encontrados sobretudo em regiões florestais, respeitam a natureza e quem a protege.\n\nNão atacam à vista. Conversam, tentam encantar, bajular ou enganar quem encontram para que faça favores ou entregue um item prezado — em geral em troca de riqueza ilusória ou promessas falsas. São mestres em discernir o desejo alheio, o que os coloca em posição forte na barganha. Não se importam de virar gente uns contra os outros em benefício próprio, mas em geral não ao ponto de causar dano de verdade.\n\nNa maioria dos casos, o leprechaun não guarda o bem furtado por muito tempo. Devolve o prêmio bem a tempo de desarmar a tensão, apontando o humor da situação, na esperança de compartilhar o divertimento com a vítima. Se a peça foi longe demais e a vítima se enfurece, foge em vez de lutar. Essa disposição de devolver ou fugir some com a idade. Leprechauns antigos, de milhares de anos, caem numa amargura escura e usam ilusões para empurrar quem os ofende — ou quem não ri da piada — para o perigo… ou para a morte.",
    "sections": [
      {
        "id": "pots-of-gold",
        "title": "Potes de Ouro",
        "body": "Embora seja verdade que leprechauns em geral devolvem os itens que roubam, amam particularmente o ouro e muitas vezes entesouram moedas de ouro e tesouros em potes escondidos em lugares ocultos. Corre o rumor de que uma pessoa que ache uma moeda de ouro na floresta e a devolva ao leprechaun que a deixou cair receberá um desejo como recompensa. Infelizmente, esse rumor é falso — um engano perpetrado por leprechauns para enganar os outros a lhes trazer ainda mais ouro para os potes."
      }
    ]
  },
  "creature-mandragora": {
    "description": "Uma mandrágora parece um tubérculo recém-arrancado que cresceu na forma deformada de uma criança, com rosto grotesco e corpo hediondamente inchado. Essas plantinhas insidiosas em geral nascem quando uma raiz de mandrágora é regada com sangue de demônio. Ao absorver as propriedades de outro mundo, a raiz anima e é forçada a buscar sangue para se banquetear, senão morre de sede.\n\nSempre famintas, vivem vidas assombradas e doloridas, e cometem atos vis e desesperados para obter o sangue que anseiam. Preferem sangue infundido de magia — unicórnio, fey, feiticeiro — e podem subsistir de poções, bombas alquímicas e elixires; em último caso, aceitam o sangue de criaturas mundanas, que acham insosso e amargo, e não hesitam em reclamar para quem as alimenta.\n\nA mandrágora típica tem o tamanho de uma criança humana; algumas continuam a crescer, chegando a tamanhos comparáveis a gigantes. Às vezes, ao crescer, formam membros extras ou rostos rudimentares, virando caricaturas hediondas da forma humana.",
    "sections": [
      {
        "id": "madragora-sucklings",
        "title": "Mandrágoras Lactentes",
        "body": "Às vezes uma mandrágora oferece seus serviços a um conjurador em troca de sustento. Contos falam de feiticeiros ou outras criaturas mágicas que mantêm \"familiares\" mandrágora cuja lealdade é sustentada alimentando as ferinhas com o próprio sangue. Esses contos em geral têm finais horrendos em que a mandrágora é tomada pela sede de sangue e, incapaz de se controlar, devora o mestre."
      }
    ]
  },
  "creature-mimic": {
    "description": "Dizem que nasceram de um experimento falho para animar móveis, ou talvez de uma criação sinistra dos alghollthus. Mímicos são monstros astutos que assumem a forma de objetos fabricados comuns. Rumores preferem portas, mas qualquer objeto com o qual outra criatura vá interagir serve. Predadores de emboscada e comilões vorazes, surpreendem a presa com a capacidade inquietante de imitar mobília e tralha cotidiana. Permanecem disfarçados até aventureiros desavisados passarem — e então atacam.\n\nTêm mentes alienígenas complexas. Muitas vezes cruéis e egoístas, também gostam de conversar com a presa de vez em quando. Por razões desconhecidas, interessam-se especialmente por humanoides; há contos de mímicos que até firmaram parceria por objetivos maiores e compartilhados. Detestam outros da própria espécie e tendem a viver sozinhos. Podem permanecer na forma alternativa por tempo enorme — décadas numa câmara de masmorra. Independentemente da espera, permanecem vigilantes, sempre prontos a enredar a próxima vítima.",
    "sections": [
      {
        "id": "creative-mimics",
        "title": "Mímicos Criativos",
        "body": "Quanto mais velho o mímico, mais criativo o disfarce, mas dentro de limites práticos. Por exemplo, um mímico pode aparecer como uma estante bem organizada com um único livro fora do lugar, uma cisterna seca com algo reluzindo no centro, ou uma porta de madeira discreta com um olho mágico convenientemente posicionado."
      }
    ]
  },
  "creature-nixie": {
    "description": "Esses fey aquáticos costumam guardar lagoas, rios, lagos e nascentes, protegendo lares bucólicos de predadores e de colonos descuidados. Tendem a ser reclusos e a esconder a presença de humanoides, na esperança de que os invasores não lhes deem motivo para agir. Raramente ficam perto de povoados: a indústria tem o hábito de poluir as águas.\n\nHistórias de nixes que concedem desejos miúdos a quem fazem amizade incentivaram mortais a procurá-los — e, ironia, tornaram o favor ainda mais raro. Quem se aproxima com respeito, e melhor ainda com humildade descontraída, tem bem mais chance de resposta favorável. Muitas vezes a nixe pede uma tarefa primeiro: um conto, uma canção, ou algo maior, como afastar um predador ou investigar a fonte da poluição.\n\nSó recorrem à violência se não houver outra opção. Preferem magia primordial para desarmar conflitos antes do sangue. Encantam indivíduos e, se estabelecem influência, incentivam os invasores a partir em paz. Umas tentam confundir e levar sutilmente para longe; outras recorrem a animais locais para assustar os invasores.\n\nOcasionalmente recrutam humanoides encantados como protetores ou para tarefas grandes demais. Se a tarefa for debaixo d’água, usam magia para conceder temporariamente a capacidade de respirar na água. Só quem faz amizade de verdade recebe convite para voltar a nadar ou jantar com o fey, e só os aliados mais confiáveis ganham um desejo menor.\n\nAparecem como humanoides aquáticos do tamanho de uma criança, olhos grandes, barbilhos de bagre, dedos e artelhos palmeados, pele escamada, orelhas pontudas e cabelo longo da cor e textura de alga. Muitas vezes formam comunidades pequenas, e até sociedades submersas se o número for grande o bastante. No folclore de muitas culturas há histórias de nações nixe escondidas no fundo de lagos particularmente grandes.",
    "sections": [
      {
        "id": "bog-nixies",
        "title": "Nixes do Pântano",
        "body": "Nixes que habitam regiões pantanosas tendem a ter atitudes mais vis e estão mais prontas a recorrer à violência. Conhecidas como nixes do pântano, essas fey perversas preferem morar em pântanos fétidos ou charcos devastados e se deleitam em usar a habilidade de conceder desejos para tentar os visitantes a cometer atos de maldade não planejada."
      }
    ]
  },
  "creature-poppet-attendant": {
    "description": "Poppets atendentes estão entre as formas mais comuns. A maioria trabalha em ofícios criativos, sobretudo entre alfaiates e sapateiros.",
    "sections": []
  },
  "creature-severed-head": {
    "description": "O decepado mais comum aparece simplesmente como uma cabeça em decomposição, mal preservada pela magia que a criou.",
    "sections": []
  },
  "creature-spear-frog": {
    "description": "O sapo-lança leva o nome da toxina, tradicionalmente usada para envenenar projéteis arremessados como lanças e adagas.",
    "sections": []
  },
  "creature-terror-bird": {
    "description": "Aves do terror comuns são caçadoras notáveis. Sozinhas, usam a grande velocidade para pegar a presa de surpresa. Em bando, podem abater bestas maiores, como auroques, pelo número avassalador.",
    "sections": []
  },
  "creature-trained-raven": {
    "description": "Essas aves onívoras são carniceiras astutas e oportunistas. Capazes de resolver quebra-cabeças simples para recuperar itens desejados, reúnem-se na orla da civilização, saqueando quando não caçam no ermo. São conhecidas por trapaça, e muitas são treinadas para aprofundar esse instinto. Corvos treinados esperam uma abertura e bicam o inimigo em pontos vulneráveis.",
    "sections": [
      {
        "id": "raven-traders",
        "title": "Corvos Mercadores",
        "body": "Com tempo suficiente para desenvolver a relação e estabelecer o que você quer, é possível fazer uma espécie de troca com um corvo. Colocar um objeto pequeno e brilhante onde o corvo possa tomá-lo pode tentá-lo a agarrar o prêmio e voar embora, voltando 3d6 minutos depois com algo do próprio estoque. Convencer um corvo a negociar exige um teste de Natureza CD 20 bem-sucedido para Comandar um Animal e, claro, um corvo que tenha a inclinação de negociar com você em primeiro lugar."
      }
    ]
  },
  "creature-trilobite": {
    "description": "Muitas vezes desprezados como praga aquática, os trilobitas são uma classe variada de artrópodes dos mares de Golarion. Tão antigos e espalhados que fósseis aparecem tão à toa quanto exemplares vivos. Variam enormemente em tamanho e dieta; os maiores chegam a cerca de 70 cm. O registro fóssil mostra que no passado eram ainda mais diversos e numerosos; a espécie entrou em declínio com a devastação da Queda da Terra.",
    "sections": []
  },
  "creature-trollhound": {
    "description": "Cães-troll são feras baixas e babosas, trolls em forma canina. Com fome quase insaciável atiçada pelo metabolismo regenerativo, matilhas selvagens percorrem as encostas onde trolls habitam em busca de carne em quantidade. Em algumas regiões, trolls os criam como bichos, usando o faro aguçado na caçada.\n\nCobertos de feridas fétidas que choram, carregam um contágio debilitante chamado febre de sangue em brasa. Quem contrai a doença pela mordida sente dor interna profunda, como se o sangue estivesse em fogo. Sintomas extras: perda de coordenação, bolhas de pus, letargia e fadiga. Trolls e cães-troll são imunes aos efeitos maiores da doença, além da irritação da pele.\n\nSão destemidos na caça e no combate, confiando na regeneração. Nem a ameaça do fogo os repele: não reconhecem o perigo. Mesmo assim, fogo é uma das ferramentas mais eficazes contra eles; caçadores espertos queimam até o último resto de um cão-troll tido por morto, pois o poder regenerativo é de fato potente.\n\nEmbora trolls tenham grande sucesso em domesticar, treinar e até fazer amizade com cães-troll, o mesmo não se diz de outros aspirantes a dono. Seja pela exposição constante à baba doente, pela fome voraz que nunca parece saciada, ou simplesmente pelo temperamento ruim e rápido para morder, a maioria das tentativas de usá-los no lugar de guardiões mais confiáveis termina em dor, miséria e uma matilha feral fugindo para o interior.\n\nDeixados por conta própria, reproduzem-se relativamente rápido. Pode levar menos de um ano para uma matilha pequena multiplicar-se a ponto de ameaçar o campo. Melhor deixar os cães-troll para os trolls, como se diz!",
    "sections": [
      {
        "id": "trollhound-genesis",
        "title": "Gênese do Cão-troll",
        "body": "O primeiro cão-troll foi o resultado de um embate entre um warg faminto e um troll da floresta enfurecido. Embora o warg não fosse páreo para o troll, desferiu várias mordidas antes de recuar para a mata próxima. Os pedaços regenerativos de carne de troll na goela sangrenta do warg infectaram o corpo da fera, transformando-a lenta e dolorosamente num proto-cão-troll. Privado de astúcia e inteligência, o warg alterado atacou uma matilha de wargs que se aproximava, espalhando a infecção incomum. Logo, cães-troll tornaram-se a própria espécie, e gerações sucessivas das feras foram descobertas caçando ao lado de trolls, compartilhando um vínculo instintivo com os gigantes pesados. Muitos wargs modernos nutrem uma animosidade enraizada contra cães-troll por causa desse passado. Esse antagonismo é agravado pelo fato de que, em casos raros, um warg que alcance o estágio 5 da febre de sangue em brasa pode se transformar num cão-troll."
      }
    ]
  },
  "creature-water-wisp": {
    "description": "Fagulhas da água são esferas nadadoras de espuma e água, zumbindo sem parar com um lavar de sons suaves. São gentis, cuidadoras e rápidas para ajudar quem precisa.",
    "sections": []
  },
  "creature-war-pony": {
    "description": "Cavalos servem de montaria e besta de carga em muitas sociedades. Fiéis e em geral dóceis, valem ouro para quem precisa viajar longe. Povos menores, como gnomos e halflings, costumam usar pôneis; humanos e outros humanoides Médios preferem cavalos. A maioria que o viajante encontra é domesticada, embora ainda existam manadas grandes no ermo.",
    "sections": []
  },
  "creature-bottlenose-dolphin": {
    "description": "O golfinho-nariz-de-garrafa é a espécie mais comum e espalhada. São predadores sociais que caçam mares rasos e rios em grupos familiares chamados pods. Marinheiros gostam deles e contam como salvaram náufragos ou protegeram a tripulação de tubarões com golpes do focinho poderoso.",
    "sections": []
  },
  "creature-hippocampus": {
    "description": "Hipocampos servem de corcel para humanoides aquáticos ou vagueiam soltos no mar.",
    "sections": [
      {
        "id": "aquatic-cavalry",
        "title": "Cavalaria Aquática",
        "body": "Protegendo o porto de Absalom e as costas da Ilha da Pedra-Estrela, os Cavaleiros das Ondas de elite usam hipocampos treinados para combate como montarias. Os Cavaleiros das Ondas assediam navios inimigos, defendem contra inimigos aquáticos e interceptam contrabandistas."
      }
    ]
  },
  "creature-catfolk-pouncer": {
    "description": "Saltadores catfolk viajam o mundo em busca de experiências novas. Com mola no passo e ânimo positivo, em geral se esquivam ou se recuperam rápido de perrengues — para desgosto dos inimigos.",
    "sections": []
  },
  "creature-elf-ranger": {
    "description": "Muitos elfos aprendem o arco antes de pegar a primeira lâmina. Por isso, muitos atuam como patrulheiros em algum ponto da vida longa.",
    "sections": []
  },
  "creature-dwarf-stonecaster": {
    "description": "Todo anão tem ligação com a terra, mas os lançapedra poliram essa conexão. Anos de meditação lhes deram o poder de criar rochas e abalar o chão. Esses especialistas elementais costumam ser muito respeitados na comunidade, que preza a geomancia. Jovens anões com ligação mais forte que o normal às vezes são enviados cedo a um lançapedra para treinar.",
    "sections": []
  },
  "creature-tengu-sneak": {
    "description": "Tengus são um povo adaptável, originalmente do continente de Tian Xia, cujas viagens os levaram por todo Golarion. Como diáspora, quase sempre aparecem em reinos e comunidades de outros povos, com exceção da nação natal de Kwanlai. Por isso tendem a se reunir em grupos unidos — com outros tengus e com ancestrais minoritários — coletando palavras e costumes como um pássaro coleta treco para o ninho.\n\nEmbora humanoides, têm traços bem de ave, e muita gente diria que lembram mais corvos do que humanos. Bico forte e grosso, garras afiadas nas pontas dos braços e das pernas. A maior parte do corpo é coberta de penas miúdas, do marrom-escuro e azul-noite ao preto brilhante; cores claras são raras, mas existem. Como muitas aves, têm ossos ocos e são bem mais leves que outros humanoides do tamanho; alguns até têm asas e voam.\n\nHá um foco cultural forte no céu: cimos altos são sagrados, e adoram deuses da natureza e das tempestades, como Gozreh ou Hei Feng. Têm tradição longa e orgulhosa de artes marciais e forja, e muitos heróis tian buscam um mentor ou ferreiro tengu. A magia gira em torno de penas atadas num leque, para comandar vento e relâmpago, e alguns até “comem” infortúnio — habilidades que só ajudam enquanto seguem expandindo para terras novas.",
    "sections": []
  },
  "creature-ratfolk-grenadier": {
    "description": "Granadeiros usam técnicas alquímicas e furtividade para defender as comunidades.",
    "sections": []
  },
  "creature-azarketi-crab-catcher": {
    "description": "O cidadão azarketi médio em Absalom vive da pesca ou da captura de caranguejos.",
    "sections": []
  },
  "creature-sedacthy-scout": {
    "description": "Batedores, em geral sedacthies jovens, percorrem o oceano em busca de servos animais ou sobem à terra para caçar. Na superfície, pressionam crocodilos e cobras ao serviço; debaixo d’água, preferem enguias-elétricas e hipocampos.",
    "sections": []
  },
  "creature-velociraptor": {
    "description": "Primo menor do deinonico, o velociraptor é um caçador de matilha rápido e astuto. Não teme criaturas maiores, e um grupo desses dinossauros não hesita em atacar presa do tamanho de um cavalo. Têm juba de plumas que desce pelas costas e pelos lados dos braços, pernas e cauda, enquanto a barriga e os flancos são escamados. As plumas os misturam ao terreno, mas quando assustado o velociraptor pode eriçar a crista e mostrar cores mais vivas normalmente cobertas. Um típico mede cerca de 45 cm de altura, 2,1 m de comprimento e pesa uns 16 kg.",
    "sections": []
  },
  "creature-pteranodon": {
    "description": "Pteranodontes são répteis ágeis, com envergadura de uns 6 m, capazes de pairar nas correntes de vento por horas. Têm bico longo e crista igualmente longa que sai da nuca.",
    "sections": []
  },
  "creature-giant-frilled-lizard": {
    "description": "Encontrados em florestas quentes e savanas tropicais, esses lagartos imensos são ameaça mortal ao viajante desavisado. Quando não dormem nem perseguem presa, passam horas se aquecendo ao sol. Exploradores às vezes os confundem com parentes de dragões pelo tamanho, pela coleira elaborada (que, exibida em agressão, pode parecer asas) e pelos sibilos ferozes para afastar o que é grande demais para comer.\n\nA dieta principal são artrópodes e invertebrados enormes, mas não hesita em completar com vertebrados: outros lagartos, macacos e quase tudo que caiba na boca — humanoides inclusive. Capaz de arrancadas curtas, em geral fica imóvel na caça, à espera de emboscar.",
    "sections": []
  },
  "creature-giant-eagle": {
    "description": "Não são meros animais: águias gigantes têm intelecto agudo e senso forte de honra. Como guardiãs dos lares montanhosos, tentam impedir o avanço da civilização sobre o ermo e a predação de povoados humanoides cruéis. Reúnem-se em ninhos de até uma dúzia e protegem o domínio juntas.\n\nA envergadura chega a 9 m e o peso a uns 225 kg. Uma águia gigante pode deixar um amigo de confiança montá-la, mas resiste a selas, arreios e qualquer equipamento que sugira besta de carga. Longevas, levam dívidas e juramentos a sério, lembrando ofensas por anos e perdoando devagar.",
    "sections": [
      {
        "id": "allies-in-the-skies",
        "title": "Aliados nos Céus",
        "body": "Ninhos de águias gigantes podem tornar-se aliados potentes para quem respeita os territórios e se aproxima sem malícia no coração. Águias gigantes são igualmente propensas a mergulhar e oferecer auxílio não solicitado a quem está nas terras baixas do domínio contra perigos óbvios, mas se não receberem respeito em troca, as águias podem abandonar uma vítima desagradável ao destino em vez de sofrer mais insultos."
      }
    ]
  },
  "creature-skeletal-horse": {
    "description": "Cavalos esqueléticos às vezes servem de montaria a outros mortos-vivos ou monstros.",
    "sections": []
  },
  "creature-tooth-fairy-swarm": {
    "description": "Uma turba de fadas dos dentes trabalhando juntas consegue fazer dentística forçada em segundos.",
    "sections": []
  },
  "creature-dero-stalker": {
    "description": "Perseguidores dero exploram a superfície à noite, em busca de vítimas para sequestra. Enquanto se escondem da luz queimante do dia, muitas vezes ajudam nos experimentos dos magísteres.",
    "sections": []
  },
  "creature-dero-strangler": {
    "description": "Estranguladores dero se especializam em capturar vítimas vivas, e muitas vezes são chamados para ajudar nos sequestros.",
    "sections": []
  },
  "creature-kholo-bonekeeper": {
    "description": "Alguns kholos servem de conduto ao divino e são responsáveis por aplacar espíritos e deuses. Lamashtu é deidade predileta dos guarda-ossos, pois muitos kholos acreditam que a espécie nasceu da Mãe dos Monstros. Uns abraçam a Velha Mãe por completo; outros a veem como poder de pesadelo só a ser abordado se estiverem dispostos a pagar o preço. Outras deidades populares incluem Calistria, Nethys, Mahathallah ou Shelyn.",
    "sections": []
  },
  "creature-hryngar-taskmaster": {
    "description": "Sacerdotes hryngar do deus capataz Droskar muitas vezes assumem liderança nas comunidades, avançando as metas da deidade por coerção e demonstrações de força. Chamados de capatazes, dão ordens a subordinados hryngar e a clientes contratuais subjugados no mesmo fôlego, tratando os dois como intercambiáveis. Por isso, capatazes hryngar são igualmente odiados por praticamente todo mundo.",
    "sections": []
  },
  "creature-umbral-gnome-rockwarden": {
    "description": "Guardiões da rocha gnomos umbrais seguem ensinamentos druídicos e comungam com as influências elementais naturais e os denizens das Terras Sombrias.",
    "sections": []
  },
  "creature-changeling-exile": {
    "description": "Esta exilada cambiante é filha de uma bruxa-cuco.",
    "sections": []
  },
  "creature-arbiter": {
    "description": "Esses aeons esféricos são batedores e diplomatas. Encontrados por todo o multiverso, tradicionalmente vigiam o caos e seus agentes. Com o anúncio da Convergência, muitos árbitros agora servem de intermediários entre a aliança aeon e os associados mortais.",
    "sections": []
  },
  "creature-fey-dragonet": {
    "description": "Embora bem menores que os primos dragões, dragonetes feéricos compartilham muitos traços fisiológicos: pescoço longo, focinho dentado, cauda sinuosa e garras afiadas. Esvoaçam em asas iridescentes de borboleta, cuja cor muda conforme o lugar, dando camuflagem natural. Diferente dos parentes maiores, um adulto permanece do mesmo tamanho a vida toda. A única pista visual da idade é o brilho das escamas, cada vez mais lustroso.\n\nEm geral têm temperamento agradável e bem-humorado, embora um traço travesso os leve a pregar peças. Em busca de diversão, preferem aborrecimentos inofensivos a malícia que fira. Às vezes espontâneos, também podem gastar meses ou anos planejando a peça perfeita. Alvos especialmente reativos cativam o dragonete e podem criar um vínculo para a vida. A reputação de trocista os associa aos fey, com quem os dragõezinhos minúsculos têm relações cordiais — e daí o nome.\n\nPacíficos por natureza, não gostam de confronto. Diante de hostilidade, preferem manter distância e soprar gás eufórico, diluindo a briga numa atmosfera de êxtase. Se o conflito escala, miram os oponentes com magias e usam a astúcia famosa para escapar. Se os companheiros estão em perigo, porém, o desejo de ficar fora do combate muda: protegem os amigos por qualquer meio, combate físico inclusive.",
    "sections": [
      {
        "id": "fey-dragonet-lairs",
        "title": "Covis de Dragonete Feérico",
        "body": "Dragonetes feéricos vivem em florestas antigas ou em lugares onde o véu entre o Primeiro Mundo e o Universo é mais tênue. Muitas vezes decoram os covis com bugigangas brilhantes ou aparam a folhagem ao redor em formas agradáveis."
      },
      {
        "id": "fey-dragonet-treasure",
        "title": "Tesouro de Dragonete Feérico",
        "body": "Os dragões coletam tesouros pequenos, incluindo amuletos ou anéis mágicos. O couro de dragonete feérico também pode ser transformado em armadura para uma criatura Pequena."
      }
    ]
  },
  "creature-cythnigot": {
    "description": "O cythnigot é um parasita fúngico hediondo que cresce e prospera em cadáveres de criaturas pequenas. Veste esses corpos como um terno, mas também ajusta a cobertura de carne às necessidades, e o corpo acaba tão alienígena quanto qualquer coisa nascida nas profundezas Ctonianas. O traço mais identificável é o longo talo de material fúngico que sai do corpo, terminando num jogo de mandíbulas surpreendentemente fortes.",
    "sections": []
  },
  "creature-globster": {
    "description": "A maré lava à praia todo tipo de detrito, de algas e conchas inofensivas aos cadáveres podres de criaturas aquáticas enormes. O globster muitas vezes é confundido com isso, e a suposição não é de todo errada: essas massas sem mente são compostas de criaturas marinhas em decomposição, meio digeridas e fundidas num monte nauseante de lodo gorduroso.\n\nEmbora sem mente, globsters são predadores que buscam presa viva. Muitas vezes se aglomeram no fundo do mar, onde a massa fétida atrai necrófagos que viram a próxima refeição. Quando a maré os lança à terra, simplesmente passam a caçar presa terrestre. Comunidades costeiras costumam notar o cheiro muito antes de ver o globster. Quem vai investigar muitas vezes pensa num cadáver de baleia encalhada — até descobrir que o “corpo” está bem vivo e com fome.\n\nSábios um dia acreditaram que fossem mortos-vivos, carne podre ondulante empurrada a se alimentar, mas embora sem mente estão bem vivos. São atraídos a lixões à beira d’água e barcaças de lixo flutuante, e têm consciência vaga o bastante para se reunir onde a comida é farta.",
    "sections": [
      {
        "id": "fetid-decomposition",
        "title": "Decomposição Fétida",
        "body": "Quando um globster é morto, o corpo decompõe-se numa massa de gosma em 24 horas. Porém, a aura de fedor pode persistir muito além da destruição, durando 1d10 dias, centrada na posição do globster no momento da morte."
      }
    ]
  },
  "creature-giant-crawling-hand": {
    "description": "Uma mão rastejante gigante é o apêndice de uma criatura bem grande, como um gigante.",
    "sections": []
  },
  "creature-azarketi-tide-tamer": {
    "description": "Os azarketis mais ambiciosos e capazes tornam-se domadores da maré, aprendendo a falar com animais aquáticos e treiná-los.",
    "sections": []
  },
  "creature-sedacthy-marauder": {
    "description": "Sedacthies de porte imponente provam o status controlando criaturas aquáticas perigosas, como grandes tubarões-brancos e moreias gigantes.",
    "sections": []
  },
  "creature-dero-magister": {
    "description": "Magísteres dero são líderes na sociedade dero. Executam o grosso das operações cruéis e dos procedimentos de alterar memória infligidos às vítimas.",
    "sections": []
  },
  "creature-giant-moray-eel": {
    "description": "Moreias gigantes habitam águas tropicais quentes e fazem covil em cavernas estreitas e sinuosas de coral. Tamanho, velocidade e mordida poderosa as tornam perigosas a mergulhadores e pescadores. Têm pele borrachenta que secreta uma camada de muco, dificultando o dano de algumas armas.",
    "sections": []
  },
  "creature-giant-anaconda": {
    "description": "A monstruosa anaconda gigante é uma cobra constritora capaz de engolir inteiras criaturas do tamanho de cavalos — para não falar dos cavaleiros. Embora aventureiros novatos vigiem cobras que possam cair do dossel, anacondas gigantes são mais comuns em lagoas e rios, onde se alimentam de peixes-boi e capivaras. Essa tática permite afogar a presa enquanto a constrange, reduzindo o risco de ferimento. Apesar de histórias lúbricas de aventureiros, essas cobras raramente atacam humanoides.",
    "sections": []
  },
  "creature-giant-mantis": {
    "description": "Esses primos enormes dos louva-a-deus comuns são mais altos que um humano médio.",
    "sections": []
  },
  "creature-desert-drake": {
    "description": "Primos distantes de criaturas como dragões de adamantina, são um eco pálido sem o poder e a inteligência dos parentes. Dracos-deserto são predadores de emboscada perigosos, atacando viajantes isolados e postos no deserto por comida e suprimento. As escamas vão do marrom-ferrugem ao areia e ocre, imitando as dunas.\n\nComo os dracos-gelo, uma rampa de dracos-deserto muitas vezes reivindica um território enorme, vigiando a extensão de um pouso nas montanhas próximas ou de um ninho em ruínas. Qualquer criatura visível na superfície pode ser alvo, sobretudo caravanas humanoides. Rampas ao longo de rotas comerciais aprendem rápido a deixar um membro vigiando cada oásis. Em tempos magros, até cavam presa subterrânea: ankhravs, escorpiões gigantes ou ninhos inteiros de formigas gigantes.\n\nEstão entre os dracos mais leves e compactos, o que não deve ser confundido com fragilidade. Chifres recuados e asas finas como pena facilitam escavar. O pescoço poderoso faz se contorcer pela areia e pelo cascalho solto tão fácil quanto andar.",
    "sections": []
  },
  "creature-frost-drake": {
    "description": "Dracos-gelo são um perigo imenso nos ermos congelados que chamam de lar, onde vagueiam longe atrás de caribu, lobos, ursos pequenos, povos da tundra e até gigantes do gelo solitários. Tiraram proveito das distâncias para se esconder das consequências: costumam ser os mais depravados e abertamente maliciosos dos dracos. Também são especialmente insolentes e menos propensos a recuar. Muitos encontraram o fim tentando crueldades além das meios, como enfrentar sozinhos um clã de gigantes do gelo ou um povoado bem fortificado.\n\nCaçam sozinhos mais que outros dracos, por escassez de presa e por temperamento. Embora um só possa causar muita destruição, há contos de aldeões do norte se unindo para defender o lar desses flagelos soltos.\n\nO território de caça é bem grande. Os que vivem nos picos permanentemente congelados já foram vistos mergulhando para arrebatar presa das terras baixas, deixando faixas de terra congelada pelo sopro como único sinal da passagem. As escamas cobertas de geada vão do azul-real ao ciano nítido, às vezes com manchas violetas. A pele é mais fina que a da maioria dos dracos; quando o draco inspira para lançar o sopro congelado, o sangue azul-gelo aparece sob as escamas.",
    "sections": []
  },
  "creature-manticore-scorpion-tail": {
    "description": "Uma mantícora é a fusão monstruosa de leão, dragão e humano, com gosto por carne humana. A cauda distinta é festonada de espinhos como de porco-espinho, que arremessa chicotando a cauda como funda. Esses espinhos mortais permitem abater até guerreiros bem armados do céu.\n\nEmbora o rosto antropomórfico sugira intelecto agudo, a maioria é assassina de uma só ideia. Podem ser mentirosas espertas, porém, e a voz tem um som estranhamente musical que já atraiu muitos viajantes desavisados a uma emboscada. Uma mantícora descoberta por humanoides ignorantes ou rancorosos às vezes vira centro de adoração. Nessa situação, cede à preguiça e deixa os acólitos trazerem tributo em comida e tesouro, devorando os próprios seguidores quando as ofertas escasseiam. Humanoides mais fortes podem intimidá-la e até forçá-la a serviço de montaria. Enquanto estiver bem alimentada de carne humana e o mestre a levar à vitória, uma montaria mantícora pode ser surpreendentemente leal.",
    "sections": []
  },
  "creature-daeodon": {
    "description": "Onde o javali típico é só mal-humorado e pouco amistoso, o daeodon imponente é de fato odiento e violentamente cruel. Embora onívoro (conhecido em algumas regiões simplesmente como javali gigante), prefere carne. É sobretudo necrófago, mas não recua de atacar criaturas que encontra enquanto busca refeições mais fáceis, ou para proteger o que considera invasão do covil ou do pasto. Orcs particularmente bravos ou hábeis gostam de usá-los como montaria ou besta de guerra; cavalaria orc montada em daeodons é força temível.\n\nUm adulto típico mede 3 m de comprimento e 2,1 m na cernelha, e pesa cerca de 900 kg.",
    "sections": []
  },
  "creature-elephant": {
    "description": "Quem vive perto de elefantes aprendeu a ter cuidado ao irritá-los, mas mesmo com precaução às vezes ainda há uma debandada. Há pouco que uma pessoa sozinha possa fazer quando até um único elefante se enfurece. Além disso, uma manada de elefantes zangados ou assustados pode destruir uma aldeia inteira com facilidade.",
    "sections": []
  },
  "creature-orca": {
    "description": "Embora muita gente as conheça como “baleias assassinas”, orcas são na verdade a maior espécie de golfinho. Esses animais poderosos caçam juntos em pods para derrubar focas, tubarões e até baleias. Adultas em geral medem 4,5–7,5 m e pesam 3.600–5.400 kg.",
    "sections": []
  },
  "creature-ankylosaurus": {
    "description": "Quadrúpedes baixos e pesadamente encouraçados, anquilossauros são teimosos e irascíveis. Embora herbívoros, já se soube que atacam invasores só de mau humor.\n\nTêm poucos predadores naturais: a pele óssea é coberta de nódulos espinhosos que saem em várias direções para desencorajar criaturas maiores de morder. Um anquilossauro mede cerca de 9 m de comprimento, 3 m na cernelha e pesa mais de 2,7 toneladas.",
    "sections": []
  },
  "creature-greater-herexen": {
    "description": "Quando um clérigo se rebela contra a deidade e morre no aperto de uma fúria blasfema, as heresias cometidas em vida podem alimentar a transformação num herexen morto-vivo. Herexens buscam vingança contra o deus que um dia adoraram: profanam templos, matam fiéis e reúnem mortos-vivos menores e cultistas da morte na busca ímpia. Embora os dons divinos tenham sido em grande parte corrompidos em vileza de morto-vivo, agarram-se teimosos a restos do poder antigo, ainda empunhando magia e armamentos favorecidos pela deidade que tanto desprezam.\n\nGrupos de herexens que blasfemaram contra a mesma deidade às vezes se juntam numa paródia de congregação, conduzindo ritos blasfemos com algo próximo de euforia. Essas congregações muitas vezes nascem de um culto cujos membros praticaram a heresia juntos em vida e morreram juntos, embora alguns reúnam herexens independentes da mesma fé antiga.",
    "sections": []
  },
  "creature-brimorak": {
    "description": "Esses demônios de cabeça de bode têm olhos vermelhos brilhantes e cascos flamejantes. Nascidos das almas de incendiários, os brimoraks de fogo continuam o trabalho da vida: tudo que tocam queima depressa.\n\nSão mal-humorados até para demônios, embora o rancor vire alegria diante de um fogo crescente. Quem sobreviveu a encontros com esses capetas relata que lembra o relincho da risada tão claro quanto o calor das chamas ou o cheiro sufocante de fumaça.",
    "sections": []
  },
  "creature-gancanagh": {
    "description": "Gancanaghs são amantes, foliões e duelistas elegantes do Elísio. Encarnações do amor livre, atiram-se a cortejar alvos em casos breves mas sinceros até as paixões volúveis mudarem o desejo. Servem Cayden Cailean e outras deidades bacanais e senhores empíreos do Elísio que entendem o gosto por amor e festa. Odeiam seres maus que profanam o espírito do romance e da paixão, pois tais criaturas (sobretudo as tentadoras demoníacas conhecidas como súcubos) reforçam o estigma contra o amor aberto. Não há insulto maior a um gancanagh do que confundí-lo com tal criatura, e mais de um já desafiou um campeão mal-informado a um duelo por esse deslize. Embora gostem de beber e foliar, não suportam fumaça. Ainda assim, muitos carregam cachimbos caprichosos porque acham que os deixa elegantes. Prezando as flautas de prata, apreciam a beleza da música e o poder de mover o coração.",
    "sections": [
      {
        "id": "wandering-azatas",
        "title": "Azatas Errantes",
        "body": "Embora o reino idílico do Elísio seja o plano natal dos azatas, a curiosidade avassaladora e o desejo natural de vagar muitas vezes os levam a viajar longe desse plano. Em outros planos, podem ser encontrados buscando corrigir injustiças, procurando entretenimento ou meramente explorando para ver as vistas. Mais do que uns poucos azatas, tomados por um impulso caprichoso de espalhar a jocosidade às vezes indesejada, veem como dever importunar criaturas mortais rígidas ou sem humor."
      }
    ]
  },
  "creature-vanth": {
    "description": "Protetores do Ossário, guardiões austeros e resolutos dos mortos, vanths são psicopompos que lembram esqueletos com asas de corvo e uma máscara de crânio de abutre. Empunham foices negras contra quem perturbar a progressão natural das almas, e consideram qualquer visitante do Ossário um potencial encrenqueiro. Raramente falam e mais raramente ainda mostram emoção além de uma adesão sombria ao dever.\n\nQuando os exércitos psicopompos vão à guerra, vanths servem na linha de frente. Em especial, daemons atacam sem parar o Rio das Almas, exigindo patrulha constante. Guerreiros implacáveis, voam em formação perfeita. Isso pode sair pela culatra: muitas vezes sufocam qualquer adaptabilidade que tenham enquanto guerreiam.",
    "sections": [
      {
        "id": "vanth-scythes",
        "title": "Foices de Vanth",
        "body": "A arma predileta dos vanths é a foice, uma escolha que acrescenta ainda mais à aparência temível e pode levar a associações infelizes com o Ceifador Sombrio ou Urgathoa entre mortais mais supersticiosos. Vanths acham tais comparações ignorantes na melhor das hipóteses ou insultuosas na pior. Alguns vanths infundem as foices com qualidades diferentes, como ferro frio ou prata, conforme a natureza dos inimigos mais comuns."
      }
    ]
  },
  "creature-choral": {
    "description": "Anjos corais são cantores incríveis que enchem os salões do Nirvana de cânticos pios e hinos sagrados. A maioria se forma das almas de bardos talentosos e outros artistas, embora qualquer um que tire alegria superlativa da música possa subir às fileiras. Embora o dever típico seja espalhar paz e alegria pela música, as encantações santas também transbordam de propósito místico: as canções reforçam proteções angelicais e o próprio tecido dos planos celestiais.\n\nEmbora recuem do conflito, ousam o reino mortal para entregar presságios bons e mensagens auspiciosas. Muitas vezes servem a deusa Shelyn, mas também outras deidades bondosas e senhores empíreos.",
    "sections": []
  },
  "creature-cuckoo-hag": {
    "description": "Bruxas-cuco procuram jovens infelizes com a própria vida, disfarçando-se de figura de confiança — amigo ou parente. Então tecem mundos mágicos idealizados de ilusões e matéria de sonho para prender as vítimas. Uma vez convencido o mortal a ficar no mundo mágico para sempre, a bruxa drena a força vital e aprisiona a alma.\n\nA forma verdadeira é uma criatura com a pele pálida rachada de uma boneca de porcelana quebrada e pescoço e membros quase impossivelmente finos.",
    "sections": []
  },
  "creature-phantom-knight": {
    "description": "Cavaleiros e cavaleiros de ordem que morreram pela causa viram fantasmas de vontade particularmente forte. Embora os motivos variem, muitas vezes buscam continuar as missões da vida mesmo no estado de purgatório, e a força de vontade os torna lutadores formidáveis apesar da incorporeidade. Um cavaleiro fantasma pode procurar seguidores vivos da igreja ou ordem, ou outros mortais que conheceu em vida, como jeito de se ancorar e evitar a corrupção da morte-viva.",
    "sections": []
  },
  "creature-skeletal-giant": {
    "description": "Os ossos reanimados de gigantes fazem lacaios necromânticos excelentes.",
    "sections": []
  },
  "creature-frost-giant": {
    "description": "Gigantes do gelo são saqueadores implacáveis que pilham quem ousa viver perto deles em terras desoladas e gélidas. Os clãs vão de caçadores extremamente territoriais que defendem com fúria a extensão de tundra a famílias nômades que percorrem encostas geladas em busca de povoados para conquistar. O clã é governado pelo membro que exibe maior ferocidade e destreza em batalha — muitas vezes um valentão enorme que exige obediência absoluta do resto.\n\nA aparência reflete os lares gelados, com carne que vai do azul glacial translúcido ao cinza de neve derretida. Um típico mede cerca de 4,5 m e pesa uns 1.270 kg. Muitas vezes usam armadura de metal adornada com peles, pele, dentes e presas de bestas abatidas, e empunham armas do tamanho de mesas de jantar. Um clã bem abastecido cria mamutes de montaria ou força witchwargs a serviço de caça, mas considera o ambiente hostil demais para um conceito mole como animal de estimação.",
    "sections": []
  },
  "creature-jann": {
    "description": "Os seis elementos constroem cada jann e os enchem de um desejo constante de viajar, em geral saltitando pelo Universo. Os mais velhos entre o povo gênio, comandam respeito da prole distante. Qualquer jann pode conceder desejos, não só shuyookhs — vestígio do poder antigo.",
    "sections": [
      {
        "id": "jann-shuyookhs",
        "title": "Shuyookhs Jann",
        "body": "Shuyookhs jann acrescentam as seguintes magias inatas: **4º** _invisibilidade_ (×2), _ler presságios_."
      }
    ]
  },
  "creature-soulbound-homunculus": {
    "description": "A maioria dos homúnculos usa uma dose do sangue do criador como faísca de vida, mas é possível usar uma técnica semelhante à da boneca de alma para dar personalidade e semblante de vida. Esses homúnculos ganham o traço de alma, perdem imunidade a espírito, falam, e não têm vínculo especial com um criador — mas o processo tende a distorcer a alma usada. Com frequência, o que se levanta no corpo novo é uma paródia da vida anterior. Por isso, homúnculos de alma em geral são feitos por conjuradores cruéis para humilhar e atormentar inimigos vencidos.",
    "sections": []
  },
  "creature-gnome-bard": {
    "description": "Ser bardo dá ao gnomo uma desculpa maravilhosa para viajar sem parar, ver lugares novos e ao mesmo tempo criar coisas belas. De vez em quando, esses bardos ganham fama de apresentações inapropriadas ou socialmente críticas.",
    "sections": []
  },
  "creature-halfling-troublemaker": {
    "description": "A bravata de um halfling às vezes o mete em encrenca. Esses trapaceiros muitas vezes vagueiam em grupo tentando superar a última peça uns dos outros. Raramente pretendem matar — mas de vez em quando a brincadeira sai do controle.",
    "sections": []
  },
  "creature-raktavarna": {
    "description": "Raktavarnas são encarnações simples de rakshasa da traição e do assassinato, muitas vezes existindo para testar o temple de quem foi traiçoeiro ou venenoso numa vida anterior. Em geral aparecem como cobra de olhos vermelho-sangue e presas desproporcionais, embora tão frequentemente assumam a forma de uma espada ou de uma joia.",
    "sections": []
  },
  "creature-aiuvarin-elementalist": {
    "description": "Comumente chamados de meio-elfos, aiuvarins muitas vezes têm dificuldade de se encaixar. Isso leva muitos a desviar a atenção inteira para buscas pessoais — como estudar conjuração.",
    "sections": []
  },
  "creature-dromaar-mountaineer": {
    "description": "Montanhistas dromaar são batedores meio-orcs endurecidos que muitas vezes lideram partidas de saque ou reconhecimento em expedições perigosas. Os que lideram muitas expedições bem-sucedidas podem subir a posições de destaque nas fortalezas, e os que reunirem lealdade bastante até reivindicam uma fortaleza própria.",
    "sections": []
  },
  "creature-dhampir-wizard": {
    "description": "Este dhampir é um svetocher, filho de um vampiro moroi.",
    "sections": [
      {
        "id": "dhampir-dwellings",
        "title": "Moradias Dhampir",
        "body": "A maioria dos dhampirs faz lar em áreas urbanas, embora alguns indivíduos mais reclusos reivindiquem ruínas ou masmorras como domínios. Os poucos que mantêm conexão com um progenitor vampiro podem ser encontrados vivendo sob o teto desse progenitor e até herdando uma propriedade depois que o vampiro encontra um fim prematuro."
      }
    ]
  },
  "creature-zyss-serpentfolk": {
    "description": "Até o menor entre os zyss se considera maior que qualquer mamífero. As habilidades mágicas — sobretudo a telepatia — são toda a razão de que precisam para sustentar essa visão. E é verdade que o talento instintivo e a magia de qualquer zyss bastam para superar o humano médio.",
    "sections": []
  },
  "creature-soulbound-doll-impish": {
    "description": "Bonecas de alma são manequins ou brinquedos sinistros imbuídos de um pedaço pequeno da alma de um mortal falecido. Criadas para servir de companhia ou criado, o livre-arbítrio faz a obediência ao criador não ser garantia. Seguidores de Pharasma em geral as abominam como perversão do ciclo das almas, e destruir uma — independente do comportamento — é visto como serviço importante ao Grande Além.\n\nSão as mais simples duma série de construtos de alma. O fragmento não impede a ressurreição nem o progresso ao além, mas extraí-lo de um doador vivo relutante costuma ser letal. A lasca reside numa gema de foco (Solidez 10) no pescoço ou no peito, e em geral se agarra a um traço forte da personalidade original. Apesar do tamanho miúdo, o fragmento torna o punho mais perigoso do que parece e concede uma única magia desproporcional à estatura. A gema intacta de uma boneca destruída pode ser colocada num corpo novo por quem conheça o ofício, reconstituindo a criatura.",
    "sections": []
  },
  "creature-pipefox": {
    "description": "Raposa-cachimbos são cobras felpudas pequenas com cabeça de raposa. Passam o dia escondidas em cantos escuros, penduradas em árvores ou enroladas em canos, observando algo interessante em paz. Não são praga nem animal de estimação: espreitam, acumulam saber e procuram um erudito digno de receber as observações.\n\nSão intensas e caprichosas nas fixações. Uma pode estudar ferraria por seis meses e de repente virar a atenção inteira para o gíria de um bando de ladrões. Sempre estudam de longe, para o objeto da observação não mudar o comportamento. Se descobertas, tentam fugir e só lutam em último caso.\n\nTratam o conhecimento como moeda. Se se revelam, é depois de muito estudo, e nunca de graça. Muitos estudiosos as veem como espíritos e guardiãs do saber: se um cataclismo apagar o mundo, elas poderão devolver o que se perdeu. Por isso, instituições de conhecimento fingem não notar a espionagem.",
    "sections": [
      {
        "id": "hoarders-of-knowledge",
        "title": "Acumuladores de Conhecimento",
        "body": "Nada é tão valioso para uma raposa-cachimbo quanto o conhecimento. Muitas vezes enchem o espaço com os livros e as ferramentas que coletaram em segredo ao longo dos anos. Embora esses livros muitas vezes tratem de temas aparentemente mundanos, não é incomum achar um pergaminho mágico ou dois escondidos no lar de uma raposa-cachimbo."
      }
    ]
  },
  "creature-wrathspawn": {
    "description": "Crias do pecado foram feitas por um dos sete senhores das runas antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Senhor das Runas da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-pitborn-adept": {
    "description": "Um dos tipos mais comuns de nefilim é o nascido do Fosso, que carrega corrupção demoníaca infestando a linhagem mortal.",
    "sections": []
  },
  "creature-aapoph-serpentfolk": {
    "description": "Aapophs têm mais força e veneno mais forte que os parentes zyss, mas lhes falta a magia inata. Diferente dos superiores egoístas, são comunais: caçam juntos, lutam e dormem enrolados em fossos.\n\nMuitas vezes têm mutações físicas — chifres, caudas vestigiais, espinhos saindo das escamas — que pouco mudam o valor em combate, e combate é a medida pela qual os zyss os julgam.",
    "sections": [
      {
        "id": "aapoph-mutations",
        "title": "Mutações Aapoph",
        "body": "Aapophs são propensos a mutações, que você pode escolher ou rolar usando um d%.\n1–45 Sem mutação 46–56 Cauda dupla 57–66 Presas adicionais 67–84 Pescoço com capelo 85–91 Chifres 92–96 Cabeça adicional, vestigial 97–100 Escamas espinhosas"
      }
    ]
  },
  "creature-athamaru-hunter": {
    "description": "No fundo do mar, cardumes de athamarus — humanoides pisciformes armados de lanças e bestas especializadas — perseguem tubarões, serpentes marinhas e lulas gigantes nas costas de moreias gigantes. Os primeiros a atacar usam arpões farpados que abrem leques de alga, atrasando a presa. Uns ousados usam o arpão cravado como alça para cavalgar a presa por um instante. Quando a criatura cansa, o resto termina com lanças longas. Desenvolveram a tradição para forjar guerreiros e dissuadir agressores, em parte por séculos de opressão.\n\nRaramente caçam quem vive em terra: preferem trocar serviço de guia por metal, cerâmica e tubérculos. Socorrem navios danificados e náufragos. Comunidades — em geral vilas de 200 ou menos — são matriarcais; a soberana também é a principal poedeira.",
    "sections": []
  },
  "creature-string-slime": {
    "description": "Encontradas no subterrâneo ou em masmorras, essas cordas de gosma trêmulas, semelhantes a lesmas, vasculham o domínio sem parar em busca de comida. Além da forma, o nome vem da habilidade de disparar fitas expansíveis de gosma que lembram fios emaranhados.",
    "sections": []
  },
  "creature-hyaenodon": {
    "description": "Hienodontes são feras primevas ferozes que lembram hienas. Animais eriçados quase do tamanho de um cavalo, são predadores formidáveis pelo porte e pelas mandíbulas que rasgam carne. Caçam cavalos pequenos, camelos e até rinocerontes jovens. Clãs kholo os acham particularmente úteis como montaria e guardiões.",
    "sections": []
  },
  "creature-pachycephalosaurus": {
    "description": "Paquicefalossauros são dinossauros herbívoros normalmente pacíficos, mas ficam bem mais violentos na época de acasalamento, quando lutam uns contra os outros por parceiros e afastam intrusos. Também se defendem com veemência se predadores chegam perto demais da manada. O crânio tem uma coroa em cúpula cercada de chifres ósseos rombos. Isso, somado ao pescoço poderoso e compacto, permite investidas de aríete capazes de causar dano enorme.\n\nAlguns grupos humanoides os treinam como montaria, mas não são particularmente adequados à tarefa. Crescem até uns 4,5 m de comprimento e pesam cerca de 635 kg.",
    "sections": []
  },
  "creature-winged-chupacabra": {
    "description": "Alguns chupacabras são mutantes com asas répteis grandes e já se soube que carregam cabras — ou até crianças.",
    "sections": []
  },
  "creature-duskwalker-ghost-hunter": {
    "description": "Duskwalkers são infundidos com as mesmas energias dos psicopompos. Esses herdeiros cinzentos renascem no Universo mortal para guardar o ciclo de vida e morte.",
    "sections": []
  },
  "creature-coil-spy": {
    "description": "Alguns serpentfolk passam por treino ritual intenso para aprimorar a habilidade inata de se disfarçar. Muitos se identificam como membros duma sociedade sinistra conhecida como as Espirais de Ydersius, e os mais devotos buscam métodos de reencarnar em formas novas para infiltrar sociedades inimigas ainda melhor. Espiões da Serpente treinam tanto que podem infiltrar uma civilização mamífera por anos. Espera-se que trabalhem só pelo triunfo do povo — mas a maioria também acha passatempos pessoais. Quando são pegos, raramente é por falta de habilidade, e sim por arrogância ou imprudência na busca de desejos hedonistas.",
    "sections": []
  },
  "creature-larval-ofalth": {
    "description": "Ofalths se reproduzem assexuadamente. Ao sair do ovo coriáceo, as larvas lembram um tendão de carne sobre pernas finas, mas logo se envolvem num casulo de lixo que serve de armadura e camuflagem.",
    "sections": []
  },
  "creature-poracha": {
    "description": "Porachas são feras felinas nativas da mística Floresta dos Espíritos em Tian Xia. Na forma natural, essas criaturas graciosas de oito pernas têm pelagem cinza malhada com faixas verde-oliva — mas raramente são vistas assim. Até as mais jovens se escondem dentro de objetos.\n\nO traço mais icônico é dobrar a realidade para se teleportar — o salto — distâncias curtas. Também descansam dentro de objetos, onde o tempo passa muito devagar. Gostam especialmente de marcos à beira da estrada, para maximizar a chance de encontrar viajantes. Raramente pisam terras ocupadas por humanoides, preferindo kami e o habitat natural. São aliadas ideais de quem se perderia na mata, mas caprichosas: tentativas de coação saem caro, pois têm muitos amigos entre os kami e entre os da própria espécie.",
    "sections": [
      {
        "id": "what-is-a-kami",
        "title": "O que é um Kami?",
        "body": "As criaturas espirituais conhecidas coletivamente como kami foram originalmente protetoras do mundo natural, sobretudo daquilo que é incapaz de proteger a si mesmo. Com o tempo, porém, o mandato cresceu, e agora protetores kami estendem os serviços para incluir estruturas e itens artificiais. Em teoria, qualquer animal, planta, objeto ou local poderia ser servido pelo próprio kami, mas nem tudo ainda foi abençoado com tal proteção. A classificação de quais objetos merecem proteção kami — e quais não — é confusa e complicada para todos salvo os próprios kami, que acham o sistema organizacional perfeitamente lógico."
      }
    ]
  },
  "creature-ugothol": {
    "description": "Entre as criações mais sutis dos alghollthus estavam os ugothols — também chamados perseguidores sem rosto. Esses seres torcidos usam mudança de forma para infiltrar povoados e assassinar alvos-chave. Semearam discórdia e substituíram líderes, fazendo organizações indesejadas implodirem e pessoas incômodas perderem a face — e depois desaparecerem.",
    "sections": []
  },
  "creature-rhinoceros": {
    "description": "Rinocerontes são mal-humorados, territoriais e fáceis de assustar, e isso somado à ferocidade nata faz o instinto, quando perturbados, ser atacar. Quando intrusos os incomodam ou surpreendem, respondem investindo de frente e golpeando com os chifres poderosos.",
    "sections": []
  },
  "creature-sweet-hag": {
    "description": "Bruxas doces usam cores vivas, visões agradáveis e guloseimas açucaradas para atrair crianças e os jovens de coração. A presa favorita são jovens pobres que provavelmente não farão falta — oferecem comida e uma verniz de bondade antes de devorar a criança desavisada. Também encantam a comida para enfeitiçar outros, muitas vezes usando esses servos para todo o trabalho braçal. Apresentam um rosto lindo e generoso ao mundo, mas viram vis quando insultadas ou desobedecidas. A forma verdadeira é uma massa de carne babando com olhos de jujuba, muitas vezes lembrando caramelo derretendo.",
    "sections": []
  },
  "creature-lawbringer-warpriest": {
    "description": "Mortais cuja ancestralidade foi influenciada por arcontes são chamados legisladores. Podem ter ancestrais que lutaram ao lado de arcontes contra o mal e a entropia, ou ter nascido da união entre um arconte e um mortal. Muitos buscam aventura para trazer ordem ao mundo.",
    "sections": []
  },
  "creature-azuretzi": {
    "description": "Azuretzis são criaturas sinuosas e serpentinas, com dentes afiados de adaga cobertos de escamas azul brilhante e realces malhados de roxo e rosa que brilham numa aproximação pareidólica de rostos que riem e encaram. As forças caóticas do Maelstrom geram esses proteanos pequenos de fontes variadas: acasalamento físico entre azuretzis mais velhos, a promoção paradoxal de naunets bestiais, e possivelmente peticionários mortais — embora esses azuretzis possam só estar confundindo memórias putativas com experiências de jogos de imitação. Nunca espere que operem por regras racionais e consistentes.\n\nRepresentam o humor do caos, sobretudo na forma de zombaria e paródia por imitação exagerada, torcendo os traços do alvo até virar piada.",
    "sections": []
  },
  "creature-jaathoom": {
    "description": "Com toda a sutileza e elegância do próprio ar, os jaathooms do Plano do Ar operam dentro de sonhos, pesadelos e tempo.",
    "sections": [
      {
        "id": "jaathoom-shuyookhs",
        "title": "Shuyookhs Jaathoom",
        "body": "Shuyookhs jaathoom preferem manifestar desejos informados pelas visões do futuro. Acrescentam as seguintes magias inatas: **5º** _criatura ilusória_, _objeto ilusório_, _pesadelo_ (×2), _sono_ (×2); **4º** _mau presságio_."
      }
    ]
  },
  "creature-vordine": {
    "description": "A vasta cidade de Dis treina legiões sem fim de vordines para guardar as camadas superiores do Inferno e marchar pelos planos às ordens dos arqui-diabos. Rápidos em dobrar o joelho a diabos de patente maior e até a mortais favorecidos por Asmodeus, são implacavelmente cruéis com orts e outros diabos que possam chamar de subordinados.\n\nEmbora postos mais altos no exército infernal caibam a diabos mais poderosos, como os nessaris que servem de generais, uma estrutura labiríntica dá a cada vordine uma patente e certas responsabilidades. Uns comandam esquadrões no campo; outros reléiam ordens de cima ou cuidam de tarefas administrativas da unidade. O maior presente que se pode oferecer a um vordine é uma patente maior para mandar em outros vordines.",
    "sections": []
  },
  "creature-aapoph-granitescale": {
    "description": "Os aapophs mutados apelidados escama-granito têm corpos robustos cobertos de placas cinza duras. Essas escamas oferecem proteção, mas se soltam quando atingidas com força demais. Gostam de entalhar as escamas caídas em lascas pequenas e prendê-las como chocalhos nas lanças.\n\nMuita vítima desavisada ouviu o chiado do chocalho de um escama-granito tarde demais.",
    "sections": []
  },
  "creature-sedacthy-speaker": {
    "description": "Sedacthies de alta patente são esperados tanto a planejar campanhas quanto a entrar na batalha. Esses oradores alcançam o posto acumulando vários servos grandes ou uma única criatura enorme, como um megalodonte.",
    "sections": []
  },
  "creature-woolly-rhinoceros": {
    "description": "Ainda mais robustos que os primos sem lã, esses rinocerontes têm pelagem felpuda de pelo longo e grosso e um chifre enorme em forma de crescente. Habitam tundra árida e estepe fria, passando boa parte do dia pastando.",
    "sections": []
  },
  "creature-giant-tarantula": {
    "description": "Tarântulas são predadoras de emboscada, mas atacam presa ao ar livre.",
    "sections": []
  },
  "creature-elananx": {
    "description": "Esses felinos feéricos estranhos lembram linces largos à distância, mas de perto algo está errado. A forma ondula com calor, os olhos brilham como se tivessem chamas miúdas, e o cheiro pungente de folhas podres numa fogueira gruda no pelo. Quem os vê caçar percebe que não são meros predadores: agem com crueldade esperta, deleitando-se na dor que infligem.\n\nCaçam sozinhos, mas às vezes esses caçadores maliciosos do Primeiro Mundo vagueiam em matilhas chamadas baforadas para derrubar presa grande. Como muitos gatos, não se contentam em rastrear e devorar: preferem brincar com a vítima. Raramente usam a dispersão em cinza para evadir — preferem frustrar a presa bem no fim da caçada, embora, egoístas, reservem um uso “só por precaução”.\n\nRedcaps os estimam como companheiros de caça, mas o elananx odeia ser montado. Têm afinidade estranha com incêndios florestais: imunes às chamas, capricham pelas ruínas fumegantes, e alguns até ateiam o sub-bosque de propósito com a mordida flamejante.",
    "sections": [
      {
        "id": "hunting-grounds",
        "title": "Terrenos de Caça",
        "body": "Embora muitos elananxes habitem o reino estranho do Primeiro Mundo, alguns também são nativos do Universo. Elananxes preferem morar em regiões onde há criaturas inteligentes em abundância para perseguir, caçar e comer, e favorecem bosques e colinas como terrenos de caça principais."
      }
    ]
  },
  "creature-iron-hag": {
    "description": "Bruxas de ferro são sequestradoras, mirando quem é jovem demais até para lembrar de revidar. Na maioria das vezes arrancam bebês do berço, embora às vezes visem crianças medrosas ou jovens angustiados. Então aprisionam as novas pupilas em torres ou masmorras encantadas, aterrorizando-as com histórias do mundo lá fora para desencorajar até a tentativa de fuga. Se isso não funcionar, ficam mais diretas nos métodos de prisão, insistindo que é pelo bem dos cativos.\n\nA forma verdadeira tem braços longos demais. Fiel ao nome, têm dentes de ferro, além de unhas dos pés e garras de ferro compridas.",
    "sections": []
  },
  "creature-sargassum-heap": {
    "description": "Um monte de sargaço é uma massa de alga semi-inteligente que flutua pelo oceano, atraindo vítimas com esporos alucinógenos. Os afetados são puxados em direção ao monte, vendo o desejo mais íntimo: um ente querido perdido, uma criança em perigo, uma sereia encantadora, a promessa de terra seca. Quando a presa chega perto o bastante, o monte golpeia com tendões de alga e esmaga até a morte.",
    "sections": []
  },
  "creature-stegosaurus": {
    "description": "O estegossauro é fácil de reconhecer pelas fileiras gêmeas de placas dorsais em forma de losango que descem pela espinha e pela cauda grossa adornada com quatro espinhos grandes. Essa configuração protege o herbívoro: as placas defletem ataques enquanto ele fere predadores com a cauda.\n\nEm geral é de temperamento uniforme e gentil, apesar do tamanho. Essa combinação o torna ainda mais popular como animal treinado ou guarda — mas mesmo assim convém não irritá-lo: um estegossauro zangado pode atacar com pouco aviso.",
    "sections": []
  },
  "creature-quetzalcoatlus": {
    "description": "Quetzalcoatlus são os maiores membros voadores da família dos pterossauros e muitas vezes são confundidos com dragões pelo tamanho imenso e pela envergadura de uns 12 m. Usando as juntas das asas enormes como membros dianteiros, também se movem bem em terra, arrebatando presa menor do chão ou de riachos.\n\nSão carnívoros, alimentando-se de uma variedade de répteis, mamíferos, peixes grandes, anfíbios e outros vertebrados. Não são agressivos por natureza e se contentam em vasculhar comida, mas diante de presa viva atacam de bom grado quase qualquer criatura menor que eles.",
    "sections": []
  },
  "creature-jabali": {
    "description": "Os jabalis orgulhosos e descarados do Plano da Terra valorizam habilidade física e adoram barganha, jogos de azar e trabalhar metal e pedra.",
    "sections": [
      {
        "id": "jabali-shuyookhs",
        "title": "Shuyookhs Jabali",
        "body": "Shuyookhs jabali realizam desejos da forma mais direta possível. Acrescentam as seguintes magias inatas: **8º** _Terremoto_; **6º** _Resiliência da Montanha_ (à vontade; somente em si), _Petrificar_; **5º** _Disfarce Ilusório_."
      }
    ]
  },
  "creature-living-tar": {
    "description": "Mais comuns no subterrâneo, essas gosmas vasculham cavernas em busca de objetos para dissolver com secreções corrosivas. Essas massas grudentas muitas vezes estão cheias de ossos, fósseis e armamento descartado de aventureiros.",
    "sections": []
  },
  "creature-giant-animated-statue": {
    "description": "O tamanho e o poder aumentados das estátuas animadas gigantes as tornam mais úteis em cofres grandes, câmaras espaçosas ou locais ao ar livre. Tarefas além das capacidades em geral exigem um construto mais avançado, não um objeto animado.",
    "sections": []
  },
  "creature-triceratops": {
    "description": "Tricerátopses são quadrúpedes musculosos de pernas curtas poderosas, pescoço grosso e cabeça coroada por um babado ósseo largo. Embora tenham três chifres grandes, só os usam para se defender ou lutar por domínio. Mal-humorados e obstinados, é improvável recuar duma briga a menos que estejam irremediavelmente em desvantagem — e já se soube que lutam até a morte sem motivo aparente além da teimosia. Muitas vezes servem de montaria a humanoides, sobretudo gigantes, que cabem confortavelmente atrás do babado protetor. Um tricerátops mede 9 m de comprimento e pesa até 10 toneladas.",
    "sections": []
  },
  "creature-axiomite": {
    "description": "Segundo os axiomitas, sua estirpe surgiu dos alicerces matemáticos brutos do universo, manifestando-se como grandes construtores que ergueram as cidades colossais antigas dos Planos Exteriores. Segundo os aeons, axiomitas fazem parte da Mônada, tendo tanto surgido dela quanto se rebelado há muito. Desde a Convergência, a maioria reconheceu isso como verdade fundamental — sobretudo depois que os aeons mostraram como a língua Utópica se formou como amálgama de visão aeon e expressão matemática.\n\nA maioria vive na cidade perfeita de Axis, que não param de melhorar, refinando o próprio conceito de perfeição. Um axiomita particular pode parecer qualquer criatura humanoide; por baixo dessa forma assumida, todos são iguais: nuvens de poeira cristalina brilhante que se enrolam em emaranhados complexos de símbolos e equações. Surgem das almas de mortais fascinados pelos alicerces do Universo — matemáticos, arquitetos, artesãos, filósofos. Essas almas não retêm memórias da vida, mas as habilidades e experiências ainda servem de recurso metafísico valioso na formação.",
    "sections": [
      {
        "id": "axiomites-in-axis",
        "title": "Axiomitas em Axis",
        "body": "Na metrópole planar de Axis, um axiomita desempenha um de três papéis: fabricação e manutenção de seus exércitos de construtos, construção e reparo dos edifícios de Axis, e exploração das leis e constantes que fundamentam toda a realidade."
      }
    ]
  },
  "creature-sarglagon": {
    "description": "Sarglagons habitam os inúmeros cursos d’água, lagos e oceanos do Inferno. Servem de guardiões da Academia das Mentiras — o repositório de segredos em Stygia, a quinta camada. Respiram água e ar com igual facilidade e se movem por água, terra e até ar com rapidez inquietante. Poucos capetas viajam as vias aquáticas do multiverso, mas onde um rio cruza os planos, a chance é que sarglagons já o tenham navegado. O único corpo d’água que evitam é o Rio Styx: ainda não desenvolveram defesa contra as qualidades que apagam a memória.\n\nConjuradores mortais às vezes os vinculam como guardiões de segredos ou tesouros, sobretudo em áreas aquáticas. Mais estranho: às vezes agem como cuidadores inquietantes de mortais que não fazem ideia do que fizeram para ganhar a atenção indesejada desses protetores. A vigilância constante e não convidada muitas vezes sufoca os protegidos.",
    "sections": []
  },
  "creature-balisse": {
    "description": "Balisses, ou anjos confessores, buscam ajudar mortais presos em dilemas morais ou crises de fé. Preferem guiar as pessoas às próprias decisões em vez de exigir obediência a uma causa maior: a crença intrínseca é ainda mais poderosa que a obediência cega. Embora a maioria seja fundamentalmente honesta, usam a habilidade de anjo guia para parecer menos intimidantes e diminuir a chance de o mortal simplesmente aquiescer à opinião de um ser obviamente divino.\n\nPodem surgir de qualquer alma com paciência adequada e conselho forte, mas muitas vezes se formam de almas que cometeram atos maus e foram redimidas. Essas almas reconhecem a luta e a vergonha de quem está em situação semelhante. Muitos servem a deusa Sarenrae, mas também outras deidades bondosas e senhores empíreos.",
    "sections": []
  },
  "creature-giant-hippocampus": {
    "description": "Vivendo nos trechos mais profundos do oceano, hipocampos gigantes não foram avistados perto da costa e muitas vezes são tidos como lendas inventadas por marinheiros.",
    "sections": []
  },
  "creature-krooth": {
    "description": "Krooths, às vezes chamados comedores de crocodilo, são caçadores rápidos e vis de pântano e alagado. Caçam crocodilos, jacarés e praticamente qualquer coisa com carne, mas a presa favorita são homens-lagarto, boggards e dinossauros.\n\nMachos são solitários e territoriais; fêmeas se reúnem em matilhas para criar os filhotes. O acasalamento é um espetáculo grotesco: a matilha caça um macho, e depois o mata e devora a carne — sobretudo os órgãos, ricos num composto vital à gestação. Têm dentes ocos e venenosos: na mordida, um dente se quebra e faz a vítima sangrar em jorro. Carne de goblinoides, sobretudo bugbears, os repele — o que não os impede de matar goblinoides que ameacem os filhotes, em geral só com garras e cauda.",
    "sections": [
      {
        "id": "krooth-guts",
        "title": "Entranhas de Krooth",
        "body": "Além de naturalistas, as enzimas estranhas e outros compostos químicos encontrados nos órgãos internos de krooths machos — em particular o fígado, o pâncreas e os rins — têm grande valor para alquimistas que buscam preparar elixires e poções com efeitos de transmutação. Os órgãos de um único krooth macho, colhidos e preservados corretamente, podem ser vendidos a um alquimista ou naturalista interessado por até 80 po."
      }
    ]
  },
  "creature-nuckelavee": {
    "description": "Quando a poluição estraga um curso d’água natural, puxa o temido nuckelavee do Primeiro Mundo. Esse espírito de ira é um espetáculo hediondo: uma monstruosidade equina com o tronco retorcido de um humanoide crescendo direto do dorso. Para piorar, não há um pedaço de pele no corpo disforme — como se tivesse sobrevivido à própria esfola.\n\nQuando cavalga para fora do domínio, deixa um rastro de destruição na terra em volta. Está entre os fey mais cruéis e monstruosos. Alguns veem neles o castigo de quem polui as águas, mas o nuckelavee não distingue poluidor de quem só estava no lugar errado. Apesar da fama vil entre humanoides, em geral respeitam outros fey; quando a poluição é limpa e naiades voltam, retiram-se em paz.",
    "sections": [
      {
        "id": "unfortunate-victims",
        "title": "Vítimas Infelizes",
        "body": "Nuckelavees se deleitam igualmente em assassinar e se alimentar tanto de camponeses desamparados quanto de naturalistas altruístas empenhados em limpar a poluição. De fato, quem busca purificar tais sítios muitas vezes é visto pelo nuckelavee como a ameaça maior, pois, sem uma terra contaminada onde habitar, o fey hediondo definharia."
      }
    ]
  },
  "creature-ifrit": {
    "description": "Os ifrits ferozes e implacáveis vêm do Plano do Fogo, onde erguem metrópoles e centros de comércio que atraem viajantes extraplanares. Muitos são tirânicos ou belicosos, e a maioria usa a força para cumprir as metas.",
    "sections": [
      {
        "id": "ifrit-shuyookhs",
        "title": "Shuyookhs Ifrit",
        "body": "Shuyookhs ifrit distorcem o enunciado dos desejos para maximizar o sofrimento. Quem deseja mil libras de gemas pode recebê-las na forma de uma avalanche que esmaga ossos. Shuyookhs ifrit acrescentam as seguintes magias inatas: **7º** _Erupção Vulcânica_; **5º** _Bola de Fogo_ (à vontade)."
      }
    ]
  },
  "creature-roc": {
    "description": "Essas rapinas lendárias, capazes de carregar elefantes como presa, medem em geral uns 9 m do bico à cauda e têm envergadura de 24 m ou mais. O bico é curvo para rasgar carne do osso, mas a tática de caça é agarrar a presa nas garras poderosas e deixá-la cair de grande altura antes de se alimentar. Isso cria uma quantidade enorme de carniça, e bandos de necrófagos seguem a roca.\n\nEm geral aninham em cimos e penhascos inacessíveis. São predadoras de longo alcance, caçam terra e mar, e são antissociais: competem em batalhas aéreas ferozes pelo território. Cerca de uma vez por década, um casal se junta para criar os filhotes — e depois cada um volta à caça solitária.\n\nDruidas ou patrulheiros particularmente hábeis às vezes capturam e treinam uma roca como montaria voadora, embora exemplos desse feito sejam raríssimos. O jeito mais fácil é criar desde o ovo, pois o filhote imprime no primeiro ser que vê. Conseguir o ovo, claro, muitas vezes é sentença de morte para o pretenso ladrão.",
    "sections": [
      {
        "id": "roc-s-riches",
        "title": "Riquezas da Roca",
        "body": "Embora a maior parte do tesouro que uma roca possa possuir seja incidental — os restos da presa espalhados ao acaso no ninho ou ao redor —, penas de roca, sobretudo as brancas ou douradas, são muito valorizadas em certos mercados. Ainda mais valiosos são os ovos de roca, especialmente para alguns gigantes que apreciam o sabor único."
      }
    ]
  },
  "creature-silvanshee": {
    "description": "Silvanshees são um contingente furtivo e extremamente curioso de agathions que recolhe informação sobre o mundo mortal para outros da sua espécie. Adoram explorar o Universo e saciar a curiosidade, mas em geral são reclusos e ariscos. Esses dois instintos brigam sempre que algo excitante chama a atenção. Pelo tamanho pequeno, quase nunca são ameaça em combate; em vez disso, servem de olhos e ouvidos de Nirvana no mundo mortal, relatando a superiores ou pedindo ajuda se o perigo apertar.\n\nParecem gatos domésticos, salvo pelos olhos violeta e a mancha de pelagem de outra cor no peito. Voar os denuncia na hora, então só o fazem na companhia de confiança. A cor da pelagem cobre o espectro felino normal. Também podem virar névoa para manter a discrição ou fugir depressa.",
    "sections": [
      {
        "id": "silvanshee-allies",
        "title": "Aliados Silvanshee",
        "body": "Silvanshees trabalharão com heróis que permaneçam pacientes com a curiosidade e o jeito arisco deles. São curiosos, alternando entre afeição e distanciamento. Fazem o que podem para ajudar e defender os companheiros, mas o forte senso de autopreservação significa que provavelmente fugirão se sentirem que não podem vencer uma luta."
      }
    ]
  },
  "creature-shokasura": {
    "description": "Shokasuras são seres trágicos e miseráveis, quebrados pelo desespero diante das verdades cruéis da realidade. Muitos não nasceram asuras: começaram como outros seres espirituais que perceberam que todos os esforços só serviam para propagar uma existência injusta e irrecuperável. Ainda não dispostos a admitir quão fundo vai a podridão, nem a se comprometer a desfazer tudo que um dia amaram, testam mortais sem parar e os forçam a se provar, tentando se convencer de que ainda há gente e coisas que valem a pena salvar. Essas tentativas levam inevitavelmente ao desastre: os mortais falham nas expectativas impossíveis, ou o shokasura testa o escolhido até a ruína.",
    "sections": []
  },
  "creature-animated-silverware-swarm": {
    "description": "Nobres pagam fortunas para animar os talheres, tanto para facilitar a limpeza quanto como novidade em jantares. Quando o encanto vira contra os convivas, garfos, facas e colheres atacam em nuvem.",
    "sections": []
  },
  "creature-domovoi": {
    "description": "Os idosos domovoi são patronos da casa e os mais queridos de todos os espíritos do lar para o povo com quem vivem. Famílias com um domovoi deixam uma tigela de leite no canto em agradecimento, e camponeses muitas vezes se esforçam para convencer o espírito a seguir para a casa nova.\n\nUm domovoi enfurecido convoca a própria casa em defesa. Qualquer coisa no interior pode trair os moradores: louça cai na cabeça, portas batem na cara, tapetes enredam os pés — e ai de quem deixou uma espada pendurada na parede.",
    "sections": []
  },
  "creature-dvorovoi": {
    "description": "Por tradição, o dvorovoi é visto como o irmão mais novo do domovoi e cuida do quintal do camponês, de todos os animais e das ferramentas. Animais favorecidos pelo dvorovoi ficam saudáveis, fortes e obedientes; o gado menos amado sai exausto e miserável. Camponeses com um dvorovoi residente apresentam formalmente o gado novo ao espírito da casa e o aplacam deixando refeições no celeiro. Dvorovoi detestam animais de pelagem branca e espantam vacas ou cavalos inteiramente brancos, embora não tenham a mesma rixa com galinhas.",
    "sections": []
  },
  "creature-ovinnik": {
    "description": "O ovinnik é o mais feroz dos espíritos da casa, e o único que mata se for suficientemente ofendido. Vive em celeiros, despensas e galpões onde se guarda comida — sobretudo grão. Lembra gatos bípedes, mas late como cão para afastar ladrões, e muitas vezes exige presentes de leite, panquecas e galos mortos.",
    "sections": [
      {
        "id": "ovinnik-s-foretelling",
        "title": "Presságio do Ovinnik",
        "body": "Ovinniks, em certos dias, podem dignar-se a contar o futuro. Camponeses aproximam-se da janela ou da porta do domínio do fey e apresentam as palmas nuas. Se o ovinnik os tocar com uma pata peluda, então a vida da família será boa. Uma mão lisa, porém, sinaliza briga à vista."
      }
    ]
  },
  "creature-poppet-mage": {
    "description": "Com tempo extra, cuidado e paciência, poppets podem ser tecidos com magia, tornando-se pequenos conjuradores talentosos.",
    "sections": []
  },
  "creature-raven-swarm": {
    "description": "Um bando de corvos se chama crueldade. O nome faz jus quando o enxame decide trabalhar junto. Na maioria dos casos, um enxame como o desta ficha não ataca inimigos maiores, mas quando forças sobrenaturais o manipulam — ou a fome aperta — uma crueldade de corvos vira ameaça surpreendente.",
    "sections": []
  },
  "creature-trilobite-swarm": {
    "description": "Trilobitas em geral vivem perto dos da própria espécie. Em ocasiões raras, sobretudo quando a presa mais comum é grande demais para um só, formam enxames que parecem cooperar de verdade. Agarram-se à presa, e o esforço combinado de tantos ao mesmo tempo dificulta a fuga.",
    "sections": []
  },
  "creature-hermit-crab-swarm": {
    "description": "Quando caranguejos-ermitões acham uma concha grande demais, esperam outros chegarem e se mudarem, abandonando uma possível troca. Isso pode formar uma fila longa de caranguejos à espera de upgrade. Interrupções os irritam e resultam em ataques contra a fonte infeliz da perturbação.",
    "sections": []
  },
  "creature-compsognathus-swarm": {
    "description": "Embora um compsognato curioso às vezes se meta no acampamento de um aventureiro, muitas vezes está só reconhecendo o terreno para um bando próximo, que pode ter dezenas dos dinossauros bípedes miúdos. Se o bando se sente ameaçado — sobretudo perto de um ninho — corre em autodefesa. Apesar do número, o enxame foge depressa do perigo, e os dentes rangentes carregam a ameaça de veneno para quem chega perto demais.",
    "sections": [
      {
        "id": "dinosaur-swarms",
        "title": "Enxames de Dinossauros",
        "body": "Como todos dependem de pôr ovos para se reproduzir, dinossauros em geral têm áreas de ninho das quais são ferozmente protetores. Embora dinossauros maiores como alossauros estejam um pouco mais preparados para enfrentar uma ameaça sozinhos, espécies menores muitas vezes contam com a segurança do bando para proteger os lares. Quando os ovos são ameaçados, essas criaturas diminutas parecem formar uma nuvem de mandíbulas e garras em frenesi, todas se movendo juntas como se compartilhassem uma só mente."
      }
    ]
  },
  "creature-brood-leech-swarm": {
    "description": "A maioria das espécies menores de sanguessuga não tende a enxamear, mas as sanguessugas-ninhada se reúnem em tapetes ondulantes de gula. Quando o número basta para formar enxame, abandonam o sigilo da alimentação solitária em favor de um banquete rápido e impiedoso. Nesses casos, o veneno brando afeta criaturas bem maiores que a presa usual.",
    "sections": []
  },
  "creature-giant-amoeba": {
    "description": "Essas bolhas de protoplasma quase transparente são idênticas em forma e comportamento às criaturas microscópicas de que evoluíram, salvo pelo tamanho descomunal, que as torna bem mais perigosas. Diferente de lodos, pudins e outras gosmas mortais, amebas gigantes têm uma membrana externa que contém as estruturas internas, o que as deixa mais suscetíveis a armas cortantes do que parentes amorfos. A membrana, porém, é extremamente flexível e permeável, permitindo cercar a presa e absorvê-la, sufocando-a e digerindo-a devagar nos fluidos ácidos.",
    "sections": [
      {
        "id": "amoebas-large-and-small",
        "title": "Amebas Grandes e Pequenas",
        "body": "Amebas gigantes e enxames de amebas costumam ser encontrados perto uns dos outros, pois as duas gosmas fazem parte do mesmo ciclo de vida. Quando uma ameba gigante cresce o bastante, pode se dividir espontaneamente em dois enxames de amebas separados, e quando um enxame de amebas se alimenta o bastante, seus componentes individuais podem se fundir numa única criatura."
      }
    ]
  },
  "creature-giant-fly": {
    "description": "Esta mosca imensa nunca para: os membros tremem, ela se limpa sem cessar e enfia na boca qualquer coisa comestível. Embora sejam sobretudo necrófagas, moscas gigantes às vezes atacam gado ou outros animais lentos demais para fugir. Não são particularmente perigosas; o ódio vem do zumbido insuportável e do hábito de espalhar doença.",
    "sections": []
  },
  "creature-giant-leech": {
    "description": "Capazes de crescer até quase 1,5 m, sanguessugas gigantes têm bocas circulares cheias de dentes em gancho. Preferem água parada ou lenta e rasa, ou vegetação úmida. Cavalos e animais maiores são a presa favorita, mas não recusam a chance de grudar numa refeição do tamanho de um humano ou halfling.",
    "sections": []
  },
  "creature-giant-mosquito": {
    "description": "Estas versões horrificamente ampliadas do mosquito comum muitas vezes atacam megafauna como dinossauros e outras criaturas grandes, mas não recusam a chance de beber o sangue de um alvo menor — como um humanoide.",
    "sections": []
  },
  "creature-fen-mosquito-swarm": {
    "description": "Quando mosquitos mortais do pântano se reúnem em grande número, formam enxames letais capazes de drenar sangue a um ritmo alarmante. Em geral só aparecem em pântanos tropicais, mas nos meses úmidos de primavera ou verão podem derivar para áreas ribeirinhas ou até para a beira d’água de povoados.",
    "sections": []
  },
  "creature-giant-chameleon": {
    "description": "Camaleões gigantes são lendários pela capacidade de mudar a cor da pele conforme o entorno. Os olhos olham em direções diferentes ao mesmo tempo, o que os torna quase tão difíceis de surpreender quanto de perceber.",
    "sections": []
  },
  "creature-giant-opossum": {
    "description": "Espécies maiores de gambá comem quase qualquer coisa do tamanho de um humano ou menor.",
    "sections": []
  },
  "creature-sportlebore-swarm": {
    "description": "Um enxame de sportlebores é um inimigo bem mais perigoso do que um inseto só. Uma vez regurgitado pelo hospedeiro, ataca qualquer criatura que ache que pode consumir.",
    "sections": []
  },
  "creature-giant-maggot": {
    "description": "Moscas gigantes põem ovos nos corpos de monstros maiores ou de gado. Quando eclodem, soltam larvas do tamanho de humanos, jovens vorazes que consomem qualquer carne nas imediações — em geral começando pelo corpo em que nasceram.",
    "sections": []
  },
  "creature-spark-moth": {
    "description": "Mariposas-faísca se reúnem em torno de clima volátil no Plano do Ar.",
    "sections": []
  },
  "creature-moose": {
    "description": "Alces são um tipo grande e solitário de cervo. Majestosos, territoriais e extremamente mal-humorados — traços que os tornam perigosos para viajantes desatentos e predadores pretensos. Os machos são reconhecíveis de imediato, com cerca de 2,1 m na cernelha, cabeças grandes e pescoços grossos para sustentar a galhada palmeada. Perdem os chifres no inverno e crescem um jogo novo a cada ano, depressa.\n\nNa maior parte do ano, alces percorrem tundra, floresta e ermos sozinhos. Os cascos largos ajudam a atravessar a neve frequente do terreno nativo. Só se reúnem na época de acasalamento, quando ficam estranhamente sociáveis uns com os outros, barulhentos e ainda mais agressivos com outras criaturas.\n\nA dieta consiste de folhas, matéria lenhosa como galhos ou casca, e brotos. São tão grandes que preferem as folhas de árvores mais altas que humanos a baixar a cabeça enorme até o chão. Apesar do tamanho, nadam muito bem em água doce e salgada e se alimentam de vegetação aquática.",
    "sections": [
      {
        "id": "moose-tracks",
        "title": "Rastros de Alce",
        "body": "Alces prosperam em climas mais frios e têm muitas adaptações para sobreviver no frio, incluindo pele espessa e pelagem densa que retém o calor. Muitas vezes abrem as próprias trilhas na neve para achar a melhor comida. Aventureiros às vezes tropeçam nessas trilhas e assumem que levam a abrigo, só para se deparar com um alce ferozmente territorial."
      }
    ]
  },
  "creature-sea-snake": {
    "description": "Essas cobras ágeis frequentam as águas rasas de mares tropicais. O corpo azul-esverdeado de cerca de 1,2 m se mistura à água onde espreitam para emboscar a presa. São altamente venenosas, mas muitas vezes escolhem não injetar o veneno ao morder, então encontros raramente resultam em morte.\n\nHá relatos de cobras-marinhas imensas que nadam em águas mais profundas e perseguem navios, esperando marinheiros caírem no mar ou até subindo a bordo para arrancá-los do convés.",
    "sections": []
  },
  "creature-icicle-snake": {
    "description": "Translúcidas e capazes de ficar suspensas e quase imóveis, cobras-pingente sentem o calor de criaturas vivas como ameaça e tentam usar a camuflagem e a mordida gelada contra inimigos.",
    "sections": []
  },
  "creature-gobmob-snake": {
    "description": "Essas cobras goblin mutantes bizarras têm no mínimo três cabeças.",
    "sections": []
  },
  "creature-terror-shrike": {
    "description": "O picanço do terror é uma ave do terror menor, capaz de rajadas de grande velocidade e de um guincho que congela a presa. O bico rasga carne, e a espécie é conhecida por empalar vítimas em espinhos — um aviso que fica no galho.",
    "sections": []
  },
  "creature-ogre-spider": {
    "description": "Essas criaturas aterrorizantes crescem até o tamanho de elefantes. A posição dos olhos acima das mandíbulas largas evoca o riso torto de um ogro. Ogros acham as caras das aranhas ogro ao mesmo tempo engraçadas e adoráveis, mas na maioria dos casos as tentativas de criá-las como animais de estimação resultam em ogros mortos e aranhas bem alimentadas.",
    "sections": []
  },
  "creature-stalker-automaton": {
    "description": "Autômatos espreitadores abrigam as mentes de caçadores hábeis, batedores e assassinos em corpos inspirados nos grandes predadores do mundo natural. Em geral têm forma de lobos, grandes felinos e outras criaturas predadoras. Os artífices antigos aprimoraram as habilidades naturais, acrescentando sistemas especializados de camuflagem e movimento arcanos. Os espreitadores que restam ainda se orgulham de ser caçadores sem par, mesmo depois de se adaptarem às formas animais.",
    "sections": []
  },
  "creature-caligni-caller": {
    "description": "Embora os semideuses misteriosos conhecidos como os Abandonados tenham desaparecido éons atrás, muitos calignis continuam a seguir as tradições antigas de culto.\n\nOwbs, outrora servos dos Abandonados, ainda respondem às preces caligni. Chamadores caligni servem de sacerdotes das comunidades, invocando esses patronos sombrios por orientação, favores e poder. A cerimônia mais importante, o branqueamento, determina o potencial da maioria dos recém-nascidos calignis e molda as formas eventuais.\n\nPor causa dos laços estreitos com os owbs malevolentes, a maioria dos chamadores exibe naturezas cruéis e inescrutáveis. Muitas vezes lideram enclaves caligni ao lado de espreitadores, como conselheiros espirituais. Tendem a ser altamente supersticiosos, vendo presságios em toda parte, e evitam revelar detalhes dos rituais até a outros calignis.",
    "sections": []
  },
  "creature-lampad": {
    "description": "Lampads protegem lugares escuros e ocultos no subterrâneo. Não só defendem cavernas contra ameaças, como também salvaguardam inocentes bem-intencionados dos perigos que espreitam abaixo da superfície. O nome vem das fagulhas de luz mágica que costumam carregar, guiando perdidos à segurança e atraindo ameaças à ruína. A natureza volúvel torna as reações difíceis de prever, embora raramente demonstrem malícia aberta sem provocação suficiente.",
    "sections": [
      {
        "id": "strong-emotions",
        "title": "Emoções Intensas",
        "body": "Embora lampads estejam sempre vigilantes nas tarefas atribuídas, são conhecidas por ficar solitárias e desalentadas, pois a maioria dos habitantes do subterrâneo faz má companhia. Companheirismo verdadeiro e conversa estão entre as poucas coisas que podem impedir uma lampad mal-humorada de chorar esporadicamente, embora, como a maioria das criaturas, achem tais lágrimas catárticas, sentindo-se melhor depois de um bom choro."
      }
    ]
  },
  "creature-kodama": {
    "description": "Um kodama é um tipo de kami que habita uma árvore. Aparecem com frequência em florestas antigas de Tian, sobretudo matas primárias longe da civilização. Na Floresta dos Espíritos em Minkai, por exemplo, tantas árvores são possuídas por kodama que um viajante pode passar por centenas, senão milhares, desses seres ao atravessar um único acre de bosque.\n\nKodama fazem o máximo para proteger as árvores sagradas, mas um kodama só é obstáculo menor para a maioria dos oni ou para quem não tem escrúpulos em profanar florestas. Como árvores numa floresta, kodama são mais poderosos em grande número e entre outros kami, a quem podem fortalecer com as cordas de palha mágicas enquanto distraem inimigos fortes com a presença hipnótica. Por outro lado, não guardam rancor de quem respeita os protegidos, permitindo até que druidas e outras criaturas deferentes habitem os limites. Às vezes guiam sutilmente viajantes perdidos para fora da floresta ou de volta à segurança.",
    "sections": [
      {
        "id": "kami-treasure",
        "title": "Tesouro Kami",
        "body": "Kami não têm uso para objetos de valor nem outras posses materiais, mas os sítios que protegem muitas vezes são ricos em recursos naturais ou até às vezes salpicados de relíquias de eras passadas. Um dos maiores tesouros kami é a _corda espiritual_ de um kodama. Embora essas cordas não concedam poder a mortais, uma _corda espiritual_ dada livremente por um kodama é vista como marca da mais extrema pureza e merecimento."
      }
    ]
  },
  "creature-shikigami": {
    "description": "Shikigami são feitos de papel e passam com facilidade entre uma recorte achatado e uma boneca tridimensional de papel moldado. Diferente da maioria dos outros kami, vinculados aos protegidos por um espírito ou deidade mais poderosos, shikigami são espíritos menores que até praticantes mortais às vezes prendem numa forma de papel miúda e encarregam de guardar obras pequenas, como estátuas de jardim e vasos. Proprietários se deleitam em ter shikigami protegendo os jardins, quer tenham pago um conjurador itinerante para interceder, quer tenham tido a sorte de outro espírito designar um shikigami à terra. Viajantes que encontram um marco ou posto de trilha agraciado por shikigami consideram o encontro um bom presságio.\n\nQuanto à civilização e aos humanoides, os shikigami têm opiniões mistas. Lutam para proteger o protegido contra invasores e profanadores, mas são igualmente capazes de partir — protegido a reboque — se os locais começarem a estragar a área ou demonstrarem desprezo pela natureza.",
    "sections": []
  },
  "creature-betobeto-san": {
    "description": "Um betobeto-san vagueia estradas e atalhos do Plano Material em busca de companheiros de viagem relutantes para sustentar o apetite por medo. Invisível no escuro ou na sombra, à luz aparece como uma massa sombria sem forma, com dois pés de sandália. As sandálias de madeira ou osso fazem o som distinto “beto beto” de onde tira o nome. Uma boca larga e denteada sorri no meio da massa sem feições, e pode manifestar membros longos com garras.\n\nBetobeto-san seguem viajantes noturnos, compelidos a acompanhar até que as criaturas ofereçam verbalmente passagem. A compulsão em geral não é maliciosa: nasce mais de um desejo distorcido de companhia e cortesia; infelizmente, falta a eles entender como o comportamento assusta. Não atacam quem seguem, mas muitas vezes acabam em combate porque a conduta indesejada faz o outro atacar primeiro.",
    "sections": [
      {
        "id": "shadowy-afterimages",
        "title": "Imagens Residuais Sombrias",
        "body": "Betobeto-san são as imagens residuais de viajantes que passaram entre o Mundo Inferior e o Universo. Embora poucas dessas jornadas criem betobeto-san, sábios sustentam que certas emoções ou intenções de quem viaja entre esses planos podem criar essas aparições durante o trânsito."
      }
    ]
  },
  "creature-tikbalang": {
    "description": "Tikbalangs são criaturas da floresta que se deleitam em desviar viajantes. Enganam e desencaminham com magia formidável, saltando de árvore em árvore enquanto riem ou relincham sem controle. Não são maliciosos, mas também não sentem empatia pelas vítimas. Preferem esquecer quem enganaram e deixá-los morrer a reconduzi-los ao caminho por altruísmo culposo.\n\nA magia oculta dos tikbalangs nasce do mistério esotérico de acreditar numa mentira. No instante de criar ilusões ou conjurar espaços extradimensionais, eles mesmos acreditam que o que criam é real. Essa convicção torna as magias mais difíceis de resistir e também os torna mentirosos muito eficazes. Mas a disposição a acreditar os deixa suscetíveis a enganos e ilusões por sua vez.\n\nDiferente de alguns ilusionistas, tikbalangs também podem contar com a força física. Têm pernas incomumente longas que terminam em cascos fendidos e, em pé, são tão altos quanto ogros. Escaladores e saltadores hábeis, também são mestres da luta corpo a corpo, em que os membros longos lhes dão vantagem.",
    "sections": [
      {
        "id": "golden-strand",
        "title": "Fio Dourado",
        "body": "Por que aventureiros se dão ao trabalho de lutar corpo a corpo com um tikbalang? Escondido na juba de ébano luxuosa da criatura está um único fio de cabelo dourado. Quem obtiver sucesso ao Agarrar o tikbalang pode Procurar (CD 29) o fio e Interagir para arrancá-lo da cabeça. Feito de ouro de verdade, esse fio (vale 150 po) retém magia particularmente bem e é muito procurado para criar itens mágicos. Um tikbalang rebrota o fio dourado arrancado em um ano."
      }
    ]
  },
  "creature-ahuizotl": {
    "description": "O ahuizotl é um predador semiaquático cruel que lembra um cruzamento horrendo de texugo e lontra, com patas de dedos palmeados e uma quinta mão na ponta de uma cauda serpentina. Caçador astuto e furtivo, atrai a presa para a ruína imitando gritos de gente em apuros. A mão da cauda é surpreendentemente forte e costuma servir para emboscar. O hábito macabro de se alimentar dos olhos, unhas e dentes da vítima deixa os cadáveres mutilados de um jeito único. Alguns dizem que essas partes são iguarias; outros, que o ahuizotl as coleta como tributo a uma entidade poderosa e desconhecida. O fato de não comer a carne de verdade, e sim depositar os corpos destroçados e encharcados onde amigos ou família os encontrarão, aponta para uma terceira possibilidade, talvez a mais provável: o ahuizotl simplesmente gosta de usar os caprichos violentos da dieta para espalhar medo e desespero.\n\nAnda de quatro, mas as mãos conseguem manipular ferramentas simples. Tem traços mais ou menos mustelídeos e uma membrana extra sobre os olhos, o que lhes dá uma cor opaca sugestiva de catarata e embota um pouco a visão. Apesar da aparência bestial, é quase tão inteligente quanto um humano médio, e mais sábio que a maioria.",
    "sections": [
      {
        "id": "ahuizotl-allies",
        "title": "Aliados do Ahuizotl",
        "body": "Um ahuizotl é inesperadamente astuto no modo como lida com competidores potenciais em seu território e, diante de predadores companheiros capazes de conversa, às vezes firma alianças. Fogos-fátuos são aliados particularmente favoritos, pois podem atrair a presa para as garras do ahuizotl e banquetear-se da angústia depois, quando o cadáver mutilado é descoberto."
      }
    ]
  },
  "creature-hodag": {
    "description": "Como costumam ser descritos em causos disparatados de lenhadores e mineiros, hodags são tidos por muitos como lenda local. Alguns, porém, os encontraram de verdade — e ainda menos viveram para contar.\n\nSão criaturas reptilianas do tamanho de touros. As garras viciais despedaçam em segundos. As costas ostentam dezenas de espinhos longos, do focinho à cauda poderosa. A boca larga está cheia de fileiras afiadas e torcidas de dentes, não muito diferentes das de um tubarão. A pele áspera e escamosa traz tons de verde e marrom, permitindo misturar-se à floresta. Só os olhos vermelhos brilhantes revelam a presença, embora hodags tenham aprendido a usar isso a favor: chamam atenção para os olhos numa área, fecham-nos e se movem em silêncio para outra, desnorteando a presa.\n\nNo inverno, quando neve e gelo cobrem a região, hodags crescem um manto fétido de pelo gorduroso marrom-escuro que brota em tufos entre as escamas. Um hodag típico mede mais de 3 m do focinho à cauda e pesa mais de 300 kg.",
    "sections": [
      {
        "id": "hodag-tales",
        "title": "Contos de Hodag",
        "body": "Quem encontrou hodags tende a criar relatos maiores que a vida do avistamento. Na densa Floresta Verduran, lenhadores que trabalham para o Consórcio Madeireiro se regalam uns aos outros com histórias concorrentes sobre Big Marna, um hodag lendário que os madeireiros afirmam ter matado duas dúzias de pessoas. Habitantes de Echo Wood nos Reinos Fluviais tecem lendas sobre Black Shiv, um hodag avistado assombrando as bordas de pequenos assentamentos, e caçadores e mineiros nos trechos sudoeste de Ravounel falam de um hodag morto-vivo assustador chamado Ghouliegut."
      }
    ]
  },
  "creature-grodair": {
    "description": "Grodairs são peixes bizarros nativos do Primeiro Mundo. A fisiologia sobrenatural inclui um órgão com um espaço extradimensional capaz de guardar milhares de galões de água. Isso lhes permite criar um ambiente adequado em qualquer lugar, soltando a água e transformando a terra em torno num brejo raso. Quando querem ir embora, simplesmente sugam a água de volta. Se preciso, também andam em terra sobre o emaranhado de tentáculos longos e carnudos que pendem da barriga.\n\nTêm dois pares de olhos que funcionam de forma independente. Isso os torna difíceis de surpreender, mas também fáceis de distrair. Em conversa, perdem o foco depressa e têm dificuldade de lembrar coisas. Ainda assim, são conversadores ávidos e gostam de ouvir histórias do mundo. Essa qualidade os torna simpáticos, mas não confiáveis. Têm dificuldade de seguir planos ou horários, e só guardam um segredo se por acaso o esquecerem primeiro.",
    "sections": [
      {
        "id": "grodair-treasure",
        "title": "Tesouro de Grodair",
        "body": "Em meio às entranhas vis e borrachentas de um grodair explodido há um agrupamento de órgãos tubulares do tamanho de um melão que contém o armazenamento extradimensional de água. Colher o agrupamento de órgãos leva 5 minutos e um teste de Sobrevivência CD 22 bem-sucedido. Pelas 2d6 horas seguintes, o agrupamento pode então ser usado para produzir água da mesma maneira que a habilidade Órgão de Água Infinita de um grodair. Porém, numa falha crítica ao colher o agrupamento de órgãos, ele estoura e causa 2d6 de dano de concussão ao coletor."
      }
    ]
  },
  "creature-esipil": {
    "description": "Entre os menores dos sahkils, esipils se deleitam em espalhar medos e incerteza entre quem vive com animais que poderiam se voltar contra eles. Em geral aparecem à presa como alguma criatura benigna, como um cão ou gato doméstico; uma vez que ganham confiança e aproximam a vítima, transformam-se numa criatura aterrorizante, parte cão e parte verme, com gavinhas de vísceras que usam tanto como língua quanto como arma.\n\nDe todos os sahkils, esipils são os mais propensos a se insinuar junto a mortais, às vezes servindo conjuradores poderosos e outras vezes simplesmente vivendo entre vítimas desavisadas, esperando a hora de atacar.",
    "sections": []
  },
  "creature-owb": {
    "description": "Comumente chamados owbs, ou owbs menores pelos mais poderosos profetas owb, a maioria dessas criaturas misteriosas se concentra em manipular a cultura caligni. Entre calignis, um owb se esconde de mortais que considera inferiores — inclusive dos calignis a seu cargo. Prefere escolher um líder caligni para controlar nas sombras, manipulando-o com carisma e magia. Por meio da coerção desses agentes, owbs mantêm mão firme na política da comunidade, abençoando e quebrando pactos com outras criaturas ou servindo de intermediários e embaixadores entre calignis e entidades externas poderosas.",
    "sections": [
      {
        "id": "shadows-among-shadows",
        "title": "Sombras entre Sombras",
        "body": "Pouco se sabe sobre as vidas dos owbs no Mundo Inferior. Mantêm-se tão à parte que a maioria dos outros habitantes sombrios ou permanece alheia à presença deles ou descrê que sequer existam. Alguns rumores sugerem que essas criaturas carecem de qualquer poder real no Mundo Inferior e assim passam a maior parte do tempo manipulando seus estranhos \"filhos\" caligni no Universo."
      }
    ]
  },
  "creature-festrog": {
    "description": "Espocados de cadáveres de quem morreu de doença ou fome e foi torcido por energia de vazio, festrogs exibem uma ferocidade que rivaliza outros mortos-vivos. Lembram humanoides em decomposição, mas com braços alongados, dentes e espinhos ósseos saindo das costas. A tendência de correr de quatro lhes valeu o apelido de cães-carniçais, o que faz o desavisado tomá-los por predadores irracionais.\n\nFestrogs são de fato inteligentes, perseguindo vítimas em matilha e escolhendo terrenos de caça que sirvam às habilidades. Encontram-se muitas vezes em fazendas, florestas abertas ou planícies largas, onde a velocidade quadrúpede alcança a presa. Desmentindo a aparência irracional, usam táticas semelhantes às de caçadores com cães: o líder do bando muitas vezes faz a presa sair da cobertura para que o restante a derrube.",
    "sections": [
      {
        "id": "whispering-hounds",
        "title": "Cães Sussurrantes",
        "body": "Desde a queda de Lastwall e a criação das Terras de Cascalho, festrogs tornaram-se mais comuns. Espreitam as bordas de terras outrora pacíficas e muitas vezes precedem uma horda de horrores adicionais. Rumores começaram a circular de que os necromantes do Caminho Sussurrante usam essas criaturas como batedores avançados para achar vilas vulneráveis e semear terror. Como resultado, ataques que outrora teriam sido dispensados como predação de matilhas de lobos agora evocam um grau muito maior de pânico."
      }
    ]
  },
  "creature-incutilis": {
    "description": "Incutilises são criaturas marinhas inteligentes, semelhantes a náutilos, que atacam o cérebro das vítimas para tomar o corpo, criando marionetes para trabalho, combate ou o próprio divertimento malevolente.\n\nUm adulto é um pouco menor que a cabeça de um humano, e a concha traz um padrão de listras carmesim que lembram os sulcos de um cérebro. Incutilises eclodem nas profundezas do mar, onde começam consumindo crustáceos de fundo e às vezes até baleias ou tubarões. Ao crescer, passam a cobiçar instintivamente os tecidos complexos de outros cérebros — quanto mais complexos, melhor — preferindo humanoides e animais.\n\nPor fim, um incutilis faz uma excursão à terra especificamente para achar uma marionete. Usando os tentáculos para subir à praia ou a um navio, crava as gavinhas diretamente no cérebro de uma criatura terrestre indefesa (ou morta há muito pouco tempo). O hospedeiro — agora chamado marionete — raramente sobrevive à experiência.",
    "sections": [
      {
        "id": "whalers-tales",
        "title": "Contos de Baleeiros",
        "body": "As tripulações de navios baleeiros estão entre as mais propensas a encontrar um incutilis. Cérebros de baleia não são a comida preferida de um incutilis, mas eles podem cravar os tentáculos num por um longo tempo. Quando uma baleia tão infeliz é trazida ao lado do navio baleeiro, um incutilis tem a oportunidade de subir a bordo sem ser visto e atacar qualquer membro da tripulação azarado o bastante para ser pego dormindo."
      }
    ]
  },
  "creature-myceloid": {
    "description": "Os fungos ambulantes chamados miceloides são notórios por espalhar a peste púrpura mortal, controlar mentes e devorar carne humanoide. Para uma colônia, qualquer batalha com humanoides é motivo de animação: a forragem nova apresenta tantas possibilidades deliciosas.\n\nMiceloides consideram que humanoides têm um ciclo de vida ideal de quatro passos simples. Na infância, vagueiam ingênuos e com medo, alheios às colônias. Na vida adulta, descobrem o verdadeiro propósito ao provar a peste púrpura e ficar escravizados pelos esporos. Depois morrem, dando origem a um miceloide novo. Por fim seguem para o além ao virar refeição. Comer carne humanoide não é necessidade — um miceloide sobrevive de qualquer matéria em decomposição — mas é um prazer.\n\nA maioria tem chapéus roxos-escuros cravejados de caroços esbranquiçados. Pescoco e corpo lembram os estipes de fungos duros e coriáceos. Cogumelos menores muitas vezes crescem no corpo, vistos como enfeite ou lanche conveniente. Têm mais ou menos a altura de um anão, com constituição igualmente robusta.",
    "sections": [
      {
        "id": "table-manners",
        "title": "Modos à Mesa",
        "body": "Miceloides fazem refeições comunais consistindo de uma série de cadáveres, começando por criaturas que mataram em combate, seguidas de quaisquer que morreram em serviço enquanto controladas por Dominação por Esporos. Enquanto jantam, oferecem notas de degustação, afirmando que conseguem saborear intangíveis como inocência ou desespero. Guardam qualquer criatura que morreu da peste púrpura como sobremesa. O novo miceloide nascido do cadáver ganha a primeira fatia!"
      }
    ]
  },
  "creature-vermlek": {
    "description": "Vermleks, também chamados demônios-verme, manifestam-se das almas de mortais que profanaram os mortos, como ladrões de tumba ou necromantes. Esses fiends levam as violações a um extremo novo, usando poderes demoníacos para esvaziar horrificamente as vítimas vivas e vestir o casco de carne que resta.\n\nNa forma natural, um vermlek lembra um verme rosado enorme com quatro caudas longas que terminam em fibrilas retorcendo. A boca se abre em quatro segmentos como uma tulipa profana forrada de dezenas de dentes pontudos. Porém, em geral só se encontra o demônio depois que rastejou para o corpo de um humanoide morto e fez da carne oca o hospedeiro temporário. Usam engano e disfarce para infiltrar povoados mortais e influenciar conhecidos desavisados dos corpos que vestem.",
    "sections": [
      {
        "id": "telltale-desecration",
        "title": "Profanação Reveladora",
        "body": "Legistas e sacerdotes em terras infestadas de demônios sabem de imediato que estão lidando com um vermlek quando lhes trazem um cadáver que pouco mais é do que um saco de pele."
      }
    ]
  },
  "creature-zebub": {
    "description": "Zebubs servem de mensageiros e espiões do Inferno. A capacidade de compartilhar o que viram com outras criaturas os torna especialmente úteis — não só para outros diabos, mas também para conjuradores mortais. Alguns senhores infernais os soltam em enxames horrendos sobre terras desprevenidas para aviltar carne e chão ao mesmo tempo, enquanto coletam segredos que a hoste infernal pode usar depois. Zebubs aproveitam qualquer oportunidade para manipular mortais de vontade fraca ou facilmente tentados.\n\nArrogantes e mentirosos, zebubs carecem da astúcia e da confiança da maioria dos diabos, então os esquemas muitas vezes se concentram em satisfazer ambições egoístas ou autodestrutivas. Formam-se das almas de mortais infantis e covardes, remodeladas pelo arqui-diabo Baalzebul nos ermos congelados e imundos da sétima camada do Inferno, Cócito.",
    "sections": []
  },
  "creature-tatzlwyrm": {
    "description": "Tatzlwyrms lembram cobras do tamanho de um humano, com dois braços e cabeça de dragão. Parentes distantes dos dragões, possuem só um nível baixo de inteligência. Falam Dracônico (com sotaque grosso e sibilante), mas a capacidade de raciocinar é limitada e não usam magia. Têm, porém, um nível de astúcia, e alguns chegaram a construir armadilhas rudimentares e até covis. Não acumulam tesouro, então aventureiros não devem esperar um tatzlwyrm sentado numa cama de moedas.\n\nAlguns conseguiram forjar relações de trabalho com dragões, embora seja raro. De tempos em tempos, dragões os usam como mensageiros (porque falam a língua, por mais tosco que seja), batedores (pelo tamanho menor), guias (quando conhecem uma montanha) e até músculo (assediando inimigos que não merecem a atenção direta de um dragão).\n\nHibernam no frio e, quando sentem o inverno chegar, buscam covis subterrâneos, fendas de montanha ou até palheiros. Confrontados, são mais propensos a atacar do que recuar. De fato, às vezes esperam de propósito, usando a camuflagem natural das escamas, à espera da chance de usar o golpe característico: arrotar vapor venenoso no rosto do oponente.",
    "sections": [
      {
        "id": "other-tatzlwyrms",
        "title": "Outros Tatzlwyrms",
        "body": "Pessoas em algumas regiões afirmam ter visto criaturas que parecem tatzlwyrms na maior parte dos aspectos — um corpo longo, dois braços e uma cabeça — salvo que têm traços que não são de origem reptiliana. Viajantes numa savana devem ter cuidado com um tatzlwyrm peludo, de cabeça de leão, protegendo os filhotes, enquanto os das montanhas podem ser atacados por uma variante emplumada (mas sem asas) com a cabeça de uma águia."
      }
    ]
  },
  "creature-wolf-skeleton": {
    "description": "Sem o fardo da carne, lobos esqueléticos atravessam o campo de batalha com velocidade aterrorizante.",
    "sections": []
  },
  "creature-sulfur-zombie": {
    "description": "Brilhando com uma luz âmbar opaca, essas criaturas odiosas nascem de uma combinação de magia sinistra e fogo. As criações destrutivas semeiam o caos e demolam fortificações, tornando-se o flagelo de cidades sitiadas.",
    "sections": []
  },
  "creature-gutter-ooze": {
    "description": "Essas massas pequenas de protoplasma são consideradas as “primas” menores das gosmas de esgoto, emergindo dos bueiros sob a cidade depois da chuva para se alimentar de restos orgânicos que se acumulam nas sarjetas. Como recolhem quase tudo — seixos, cacos de vidro e outros lixos — algumas cidades as consideram mais úteis do que prejudiciais.",
    "sections": []
  },
  "creature-urdefhan-warrior": {
    "description": "Desde o momento em que nascem, urdefhans estão preparados para a guerra. Guerreiros urdefhan estão entre os menos poderosos que se encontra fora das cidades subterrâneas sinistras.",
    "sections": []
  },
  "creature-halfling-street-watcher": {
    "description": "A vista aguçada dos halflings os torna vigias de rua excelentes. Embora o serviço raramente peça briga, a maioria se cobre da cabeça ao tornozelo com a armadura e as armas que conseguir botar a mão.",
    "sections": []
  },
  "creature-soulbound-doll-cruel": {
    "description": "Bonecas de alma são manequins ou brinquedos sinistros imbuídos de um pedaço pequeno da alma de um mortal falecido. Criadas para servir de companhia ou criado, o livre-arbítrio faz a obediência ao criador não ser garantia. Seguidores de Pharasma em geral as abominam como perversão do ciclo das almas, e destruir uma — independente do comportamento — é visto como serviço importante ao Grande Além.\n\nSão as mais simples duma série de construtos de alma. O fragmento não impede a ressurreição nem o progresso ao além, mas extraí-lo de um doador vivo relutante costuma ser letal. A lasca reside numa gema de foco (Solidez 10) no pescoço ou no peito, e em geral se agarra a um traço forte da personalidade original. Apesar do tamanho miúdo, o fragmento torna o punho mais perigoso do que parece e concede uma única magia desproporcional à estatura. A gema intacta de uma boneca destruída pode ser colocada num corpo novo por quem conheça o ofício, reconstituindo a criatura.",
    "sections": []
  },
  "creature-envyspawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-gluttonyspawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-greedspawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-lustspawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-pridespawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-slothspawn": {
    "description": "Crias do pecado foram feitas por um dos sete runelords antigos — cada um abraçando um dos sete pecados. A primeira nasceu do Runelord da Ira, com técnicas que depois influenciaram a deformação de carne. O método caiu nas mãos dos outros; hoje as crias da ira continuam as mais numerosas e notórias.\n\nTêm só uma semelhança vaga com os humanoides de cuja carne foram formadas: emaciadas, braços longos, pernas digitígradas com três dígitos garrados. Veias incham em padrões que lembram runas torcidas; a pele é pálida e sem pelo. A cabeça é alongada, o maxilar se parte no queixo, palpos terminam em mãos minúsculas emoldurando uma língua comprida. Medem cerca de 2 m e pesam tanto quanto um humano emaciado do tamanho. Comportam-se de acordo com o pecado associado.",
    "sections": []
  },
  "creature-shadow-spawn": {
    "description": "Os mortos-vivos misteriosos conhecidos como sombras espreitam lugares escuros e se alimentam de quem se afasta demais da luz.",
    "sections": []
  },
  "creature-vescavor-swarm": {
    "description": "Os vescavors mais comuns e numerosos são os enxames delirantes. Se deixados em paz, muitos acreditam que acabariam se consumindo uns aos outros depois de acabar com tudo à volta. Ainda mais vexatório que a fome é o canto: parece algaravia no começo, mas uma vez mordido, a canção empurra as pessoas ao caos.",
    "sections": []
  },
  "creature-noxious-needler": {
    "description": "Este construto é um pesadelo alquímico ambulante, capaz de infligir toda sorte de ferida dolorosa. A capacidade de seguir ordens vem do cérebro humanoide sem mente que flutua na cabeça em cúpula, permitindo que sirvam de operários e guardas para os criadores.\n\nEm casos excepcionalmente raros, o cérebro usado na criação retém fragmentos de memória ou até intelecto de verdade, resultando num agulheiro nóxio com personalidade e agenda próprias. Criações relutantes muitas vezes caçam os criadores, descarregando a raiva em alvos semelhantes se a vingança for impossível. Outros replicam em branco os experimentos da última memória.",
    "sections": [
      {
        "id": "alchemical-leftovers",
        "title": "Sobras Alquímicas",
        "body": "Quando um agulheiro nóxio é derrotado ou incapacitado, cada uma de suas câmaras alquímicas que permanecer intacta pode ser recuperada. Os fluidos alquímicos no interior valem 50 po em ingredientes para fabricar itens alquímicos."
      }
    ]
  },
  "creature-hadrosaurid": {
    "description": "Hadrossaurídeos são um agrupamento amplo de dinossauros herbívoros que compartilham focinhos chatos cheios de fileiras de dentes moedores, bem adequados a vegetação. Também conhecidos como “dinossauros de bico de pato” pelo formato incomum das mandíbulas, são criaturas pesadas que rivalizam um elefante em tamanho, embora tendam a ser bem menos agressivos e propensos à fuga diante do perigo. Muitas espécies têm cristas de formato único na cabeça, o que os torna fáceis de reconhecer até para observadores amadores.\n\nGigantes e outras criaturas descomunais os domesticam como gado. Apesar de disparar rápido, não fazem montaria particularmente viável por causa do temperamento tímido — mas uma manada em pânico causa estrago enorme.",
    "sections": []
  },
  "creature-alce": {
    "description": "Grifos sem asas, conhecidos como alces, resultam de uma mutação rara. Numa ninhada de grifos alados, o alce em geral é considerado o mais fraco, então raramente se vê um sozinho no ermo — embora com frequência sejam criados de propósito em cativeiro como montaria exótica relativamente acessível.",
    "sections": []
  },
  "creature-bogwid": {
    "description": "A combinação abominável de sapo e polvo, um bogwid arrasta o corpo verde inchado pelos pântanos em busca de refeição para as muitas larvas que carrega no dorso. Apesar da aparência absurda e do cheiro pervasivo, é caçador de emboscada: esconde-se na areia, na vegetação ou no que houver e espera até uma criatura maior — humanoide ou crocodilo — se aproximar. Um bogwid desesperado até ataca um grupo pequeno para alimentar a si e aos filhotes. Quando tem um cadáver grande o bastante, as larvas saltam e brigam entre si pela única chance de sobreviver. A larva restante se enterra no corpo e o devora nas semanas seguintes. Depois, um bogwid adulto emerge do que restou.",
    "sections": [
      {
        "id": "swamp-bodies",
        "title": "Corpos do Pântano",
        "body": "Embora um bogwid não tenha covil e não carregue tesouro algum, a presença de um bogwid muitas vezes é prenunciada pela descoberta de corpos com grandes buracos abertos no peito. Embora com frequência sejam apenas crocodilos e outros predadores grandes, um aventureiro sortudo pode deparar com o cadáver de um aventureiro bem menos sortudo."
      }
    ]
  },
  "creature-dezullon": {
    "description": "Dezullons são plantas-jarro carnívoras perigosas que habitam regiões florestais de dossel denso ou pântanos profundos onde poucas outras plantas crescem. Caçam carne no sub-bosque quando não se aquecem ao sol nos galhos. São espertos o bastante para notar que algumas criaturas se atraem por coisas brilhantes, e às vezes usam tais objetos para montar emboscadas. Assumir que a locomoção é lenta só porque tem raízes é erro tolo: muita aventureiro já foi esmagado por esta planta surpreendentemente ágil. Além disso, são escaladores excelentes, o que torna fugir deles numa floresta ainda mais difícil.\n\nUm dezullon faminto desequilibra a presa derramando sucos digestivos pútridos e psicoativos do jarro central. Além de altamente ácidos, as enzimas, uma vez expelidas, infligem alucinações poderosas e amnésia. Esse efeito secundário os torna muito procurados em certos círculos — usuários de drogas, médicos experimentais e criminosos que lidam com venenos.",
    "sections": [
      {
        "id": "dezullon-venom",
        "title": "Veneno de Dezullon",
        "body": "O dezullon é mais conhecido pelos efeitos psicoativos de suas secreções. Criaturas afetadas sofrem amnésia, esquecendo por um instante onde estão e por que sentem dor. Algumas criaturas, desesperadas para escapar do passado, expõem-se de propósito ao veneno de amnésia de um dezullon na tentativa de fazer as memórias dolorosas se apagarem."
      }
    ]
  },
  "creature-sprigjack": {
    "description": "Twigjacks mais fracos muitas vezes se encontram em florestas cultivadas e até em jardins. Buscam afastar invasores, crescendo à medida que o ambiente se torna selvagem.",
    "sections": []
  },
  "creature-gimmerling": {
    "description": "Gimmerlings são fey pequenos que mudam de forma e montam emboscadas para saciar a fome sem fim e a ganância infantil. Esses fey cruelmente curiosos se obcecam em achar e fazer armadilhas incomuns e armas sádicas, e a diversão favorita é ver as armadilhas dispararem ou as armas serem empunhadas. Em Golarion, costumam aparecer em áreas urbanas, sobretudo favelas ou partes da cidade onde passam despercebidos ou são facilmente esquecidos — e têm vítimas à vontade.\n\nUm gimmerling típico se disfarça de criança em perigo, esperando atrair criaturas para perto o bastante para roubar. Coloca-se em perigo aparente usando uma armadilha, um construto, um aliado subornado ou até um monstro coagido.\n\nComo às vezes trocam técnicas obscuras de ferraria ou de armar armadilhas por presentes que saciem a curiosidade, a ganância ou a fome, já foram adorados como deuses menores da forja. Alguns gimmerlings disciplinados trabalham como artesãos honrados, guardas de elite ou espiões dos semideuses conhecidos como os Primogênitos, que habitam as profundezas do Primeiro Mundo.",
    "sections": [
      {
        "id": "gimmerling-keepsakes",
        "title": "Lembranças de Gimmerling",
        "body": "Gimmerlings colecionam armas, armadilhas, novidades mecânicas e itens mágicos perigosos. É provável encontrar um gimmerling com kits de ferramentas (como kits de artesão, kits de reparo e kits de ladrão) e itens que possa usar para parecer mais vulnerável, como fechaduras, manilhas e kits de ciladas (pelos quais finge estar preso)."
      },
      {
        "id": "hunting-grounds",
        "title": "Terrenos de Caça",
        "body": "Gimmerlings são mais comuns no Primeiro Mundo do que no Universo propriamente dito e favorecem terrenos de caça nas bordas de lugares perigosos, onde possam encontrar criaturas protetoras para enganar com os disfarces."
      }
    ]
  },
  "creature-pukwudgie": {
    "description": "Pukwudgies têm muitos nomes em muitas regiões, mas quem os conhece concorda: desafiar a natureza travessa provoca a ira deles.\n\nEm tempos antigos, viajaram do Primeiro Mundo ao Universo, talvez na esteira da emigração gnomo. Esses fey orgulhosos se obcecam com demonstrações de respeito: tentaram primeiro fazer amizade com mortais, mas cada tentativa acabou em tragédia, pois qualquer deslize era visto como insulto grave. Mortais, temendo essas reações, passaram a vê-los como pragas perigosas. Pukwudgies, por sua vez, passaram a ressentir mortais e os deuses que os favoreciam.\n\nNo melhor, pregam peças cruéis. No pior, já se soube que sequestram e até matam quem não os trata com o respeito devido. Fey violentos como twigjacks e redcaps muitas vezes se reúnem sob liderança pukwudgie, para gáudio deles.\n\nFazem vilas nas florestas mais antigas, ocultas sob magias. Viajam livremente entre o Universo e o Primeiro Mundo por portais miúdos sob colinas, árvores ou pedras. Raramente viajam sozinhos e muitas vezes untam os espinhos ou as armas com um veneno de receita própria antes de entrar em situação hostil.\n\nMedem cerca de 60 cm, com espinhos afiados que crescem da cabeça e descem pelas costas. O tom de pele varia com a região, do cinza pálido ao marrom.",
    "sections": [
      {
        "id": "trepidatious-trade",
        "title": "Comércio Cauteloso",
        "body": "Pukwudgies dependem muito do conhecimento das plantas locais, que usam para comida, medicina, armas mágicas e o veneno característico. Se receberem o respeito devido, pukwudgies trocam seus artesanatos por itens que considerem valiosos. Têm pouco uso para moedas, mas aceitam comidas únicas, itens de beleza e até histórias interessantes como pagamento. A menor transgressão, porém, pode transformar depressa os encontros com pukwudgies em hostilidade."
      }
    ]
  },
  "creature-phantom-beast": {
    "description": "O Rio das Almas, além das almas de humanoides sencientes mortos, também carrega espíritos de monstros, animais e outras criaturas. Da mesma forma, puxa almas de toda a realidade, e assim almas humanas e élficas se misturam com as de criaturas bem mais estranhas de mundos sem conta. Como quaisquer outras, esses espíritos distantes às vezes encalham nas margens do Plano Etéreo, tornando-se fantasmas bem longe das formas humanoides em geral associadas a assombrações e outros mortos-vivos.\n\nA besta abaixo é uma dessas entidades: uma fera estranha de um mundo distante, ecoando os comportamentos da vida enquanto busca o destino post-mortem. A aparência desconhecida pode levar observadores a assumir que é um ser monstruoso e atacar — e a besta fantasma está inteiramente disposta a revidar. Aventureiros mais compassivos talvez tentem ajudá-la a voltar ao Rio das Almas para completar a jornada espiritual.",
    "sections": []
  },
  "creature-deinosuchus": {
    "description": "Poderosos e de aparência primeva, crocodilos são predadores naturais perigosos que habitam pântanos, leitos de rio, alagados e outras zonas úmidas. O deinosuchus é um desses gigantes ancestrais.",
    "sections": []
  },
  "creature-mammoth": {
    "description": "Imediatamente reconhecíveis pela tromba preênsil longa e pelas presas impressionantes, elefantes têm características diferentes conforme o lugar. São usados como bestas de carga em muitas regiões, mas são extremamente espertos e precisam ser tratados com grande cuidado. Mamutes são os primos lanudos das terras frias.",
    "sections": []
  },
  "creature-faydhaan": {
    "description": "Os faydhaans do Plano da Água são mais poderosos que os outros gênios que habitam os planos elementais, mas preferem forjar alianças com diplomacia e lisonja.",
    "sections": [
      {
        "id": "faydhaan-shuyookhs",
        "title": "Shuyookhs Faydhaan",
        "body": "Shuyookhs faydhaan concedem desejos de formas que agradem o maior número possível de pessoas. Acrescentam as seguintes magias inatas: **7º** _Torrente Hidráulica_, _Palácio Planar_, _Conjurar Elemental_; **5º** _Nevasca Uivante_ (à vontade), _Criatura Ilusória_ (×2), _Miragem_, _Fala Verdadeira_ (à vontade); **4º** _Invisibilidade_ (×2), _Forma de Vapor_; **2º** _Criar Água_ (à vontade), _Invisibilidade_ (à vontade), _Ver o Invisível_."
      }
    ]
  },
  "creature-leukodaemon": {
    "description": "Esses daemons de cabeça de crânio e asas de abutre são arautos da pestilência e servos do patrono Cavaleiro do Apocalipse, Apollyon. Manifestações de almas más que pereceram de doença em vida, leukodaemons trabalham sem descanso uns ao lado dos outros para espalhar doença por todos os mundos do multiverso.",
    "sections": []
  },
  "creature-phistophilus": {
    "description": "Diabos de contrato são escrivães, escribas e burocratas do Inferno raramente vistos fora das cortes infernais — e então quase sempre para perseguir contratos potenciais, tentando mortais a vender a alma em troca de desejos mundanos. Se o alvo for desejável o bastante, um phistophilus pode oferecer contratos por preços aparentemente menores que a alma de uma vez, embora neste caso manipule o preço com cuidado para empurrar o signatário rumo às forças do Inferno de qualquer jeito. São criaturas altas, de tons de pele do bronze ao carmesim, com chifres grandes e curvos sobre os quais muitas vezes penduram os contratos favoritos ou importantes.",
    "sections": [
      {
        "id": "infernal-contracts",
        "title": "Contratos Infernais",
        "body": "Os contratos diabólicos criados por diabos de contrato não são as únicas formas de um diabo firmar um acordo vinculante com um mortal, mas são as mais convenientes. Outros diabos precisam realizar rituais complexos ou cumprir formalidades burocráticas para organizar um contrato com um mortal e, na maioria dos casos, a solução mais fácil para diabos nessa situação é simplesmente recrutar a ajuda de um diabo de contrato."
      }
    ]
  },
  "creature-omox": {
    "description": "Aparentemente feitos de imundície viva e animada, omoxes não têm anatomia verdadeira, embora em geral passem a maior parte do tempo em formas mais ou menos humanoides, caricaturas sombrias de humanoides meio derretidos. Embora estudiosos já tenham acreditado que esses demônios vis fossem uma forma pura e concentrada da corrupção que satura as Fendas Exteriores, na verdade surgem das almas de quem rotineiramente sujava e poluía o entorno em vida.",
    "sections": []
  },
  "creature-stone-bulwark": {
    "description": "Baluartes de pedra são construtos lentos e constantes, em geral esculpidos em mármore ou granito. Muitas vezes são feitos para servir de obra de arte quando em repouso, então alguns artífices mágicos empregam mestres escultores para garantir que os construtos façam estátuas belas. Baluartes mais velhos podem estar desgastados, com superfícies riscadas ou rachadas ou narizes e dígitos faltando, mas esse desgaste é sobretudo cosmético e não prejudica a função.",
    "sections": [
      {
        "id": "stone-slabs",
        "title": "Lajes de Pedra",
        "body": "Dependendo do material de que é feito e do cuidado empregado na confecção, um baluarte de pedra destruído pode valer tanto quanto um pilar de mármore esculpido com perfeição ou tão pouco quanto um monte de entulho."
      }
    ]
  },
  "creature-doldrums-heap": {
    "description": "Embora a maioria dos montes de sargaço se divida ao crescer demais, ocasionalmente um monte continua a crescer indefinidamente. Esses “montes das calmas” podem enredar e imobilizar navios, despedaçando-os ou banquetando-se com os passageiros indefesos.",
    "sections": []
  },
  "creature-vampire-mastermind": {
    "description": "Mentes-mestras vampiras são magos maus que controlam cabalas inteiras de mortos-vivos e instilam medo no coração de mortais perto e longe.",
    "sections": []
  },
  "creature-charnel-creation": {
    "description": "Feita de retalhos ímpares de pele e músculo, uma criação carniceira é uma paródia grotesca da vida. Embora não tenha mente, ainda pode entrar em fúria berserk quando ferida, dando um vislumbre fraco de emoção. Esses construtos muitas vezes são feitos para guardar laboratórios secretos, terrenos funerários profanados e casas de carniça sangrentas de deformadores de carne e necromantes que não se constrangem em profanar cadáveres para os próprios fins. Embora se acredite que a primeira criação carniceira tenha sido uma tentativa equivocada de criar vida a partir de elementos simples, esses monstros estão longe de ser humanos. Em casos isolados, ecos de uma personalidade podem surgir se o cérebro usado na construção pertenceu a uma personalidade particularmente poderosa — mas tais tragédias são (felizmente) raríssimas.",
    "sections": [
      {
        "id": "useless-remnants",
        "title": "Restos Inúteis",
        "body": "Poucos compradores querem qualquer coisa a ver com os restos de uma criação carniceira destruída. A melhor aposta de um aventureiro para lucrar com o corpo de uma criação carniceira é desmontá-lo peça por peça, extrair os poucos engenhos de aço e cobre feitos para canalizar eletricidade e vender as peças a inventores que fazem poucas perguntas."
      }
    ]
  },
  "creature-bone-prophet": {
    "description": "Os oradores dos mortos conhecidos como profetas dos ossos ocupam um lugar de estima como vozes do deus decapitado. Ritos funerários, rituais necromânticos e a entrega de enunciados crípticos supostamente sussurrados por Ydersius caem todos sob o domínio desses sacerdotes.",
    "sections": []
  },
  "creature-skeletal-hulk": {
    "description": "Gigantes enormes e outras criaturas descomunais fazem esqueletos poderosos.",
    "sections": []
  },
  "creature-dragon-turtle": {
    "description": "Esses dragões aquáticos imensos têm cascos rochosos semelhantes aos de tartarugas e nadadeiras poderosas o bastante para virar embarcações robustas. As criaturas temíveis gostam de ser consideradas tão perigosas quanto tempestades ou desastres naturais pela gente do mar. Apesar da fama, muitas tartarugas-dragão se deleitam em observar em segredo cidades marítimas crescer e evoluir ao longo das eras. Já se soube que protegem tais cidades de piratas, exércitos invasores ou até outras criaturas marinhas perigosas. Segundo o rumor, essas tartarugas até contrataram aventureiros para lidar com ameaças mais interiores. Tais cidades muitas vezes oferecem tributo à grande tartaruga se descobrirem a intervenção. Embora uma tartaruga-dragão acumule os tesouros dos navios que afunda, considera a dádiva oferecida de livre vontade pela cidade protegida a mais preciosa.\n\nEmbora muitas já sejam grandes o bastante para inspirar assombro, algumas crescem substancialmente mais. Essas tartarugas-dragão antigas e maciças são sonolentas, lembrando ilhas rochosas à distância; os tesouros prodigiosos podem ser fonte de saber marítimo antigo. Lendas persistem de tartarugas-dragão verdadeiramente imensas que passam séculos à deriva na superfície do oceano, longe de rotas estabelecidas, com cascos que servem de ilhas capazes de sustentar ecossistemas inteiros e até, alguns afirmam, povoados pequenos cujos habitantes nada sabem de terra que não flutue pelo mar.",
    "sections": [
      {
        "id": "dragon-turtle-rides",
        "title": "Passeios de Tartaruga-dragão",
        "body": "Receber a oferta de um passeio de uma tartaruga-dragão é uma grande honra. Embora possam prestar transporte de emergência com tal passeio, uma tartaruga-dragão pode oferecer um simplesmente para apreciar a companhia de um amigo querido ou ouvir a sabedoria de um grande sábio."
      }
    ]
  },
  "creature-dryad-queen": {
    "description": "Também chamada hamadríade, uma rainha dríade governa uma floresta inteira, ou uma porção de uma floresta incrivelmente grande, liderando e protegendo todas as dríades dentro. Rainhas dríades muitas vezes têm relações estranhas com fey poderosos e mortais, trabalhando juntas de um jeito dualista apesar das diferenças, com a rainha representando as maravilhas da natureza e o outro fey a ira da natureza.",
    "sections": []
  },
  "creature-naiad-queen": {
    "description": "Rainhas náiades governam ermos intocados centrados em lagos intactos, rios maciços ou outros corpos coletivos de água doce. Canções de bardos e pinturas de artistas dessas ninfas poderosas tendem a retratá-las nas formas um pouco mais humanoides, que vestem quando fazem a rara jornada a terras civilizadas para angariar aliados, reunir notícias ou avaliar ameaças.\n\nA maioria trata com bondade quem respeita o domínio, mas são ferozes — e rápidas em eliminar inimigos. A beleza cegante e a amplitude de magias ofensivas as tornam oponentes temíveis se forçadas à luta.",
    "sections": []
  },
  "creature-island-oni": {
    "description": "Onis da ilha são os poderosos o bastante para reivindicar ilhas costeiras pequenas, muitas vezes criando exércitos improvisados de onis menores que saqueiam terras e águas ao redor. Acumulam essa riqueza material, vestindo-se de roupas luxuosas e adornando os rostos monstruosos com toda sorte de joia.\n\nEm geral vasculham naufrágios submersos em busca de armas, armaduras e tesouro. Isso também pode pô-los em contato com marinheiros mortos-vivos, que onis da ilha já se soube que aliciam a serviço.",
    "sections": []
  },
  "creature-snow-oni": {
    "description": "Onis da neve mantêm o temperamento fervente mesmo nos lares gelados. O isolamento do ambiente lhes dá ares de ascetismo, e muitos buscam a perfeição física, deleitando-se no processo de transformar o corpo em máquina de luta poderosa. São, porém, tão hedonistas e brutais quanto qualquer irmão, e ávidos por se indulgir em banhos quentes, bebida forte e carne humanoide.\n\nComo muitos onis, possuem um terceiro olho no centro da testa. Esse olho dá um sentido místico que permite enxergar através até das nevascas mais espessas.",
    "sections": []
  },
  "creature-caldera-oni": {
    "description": "Tão sanguíneos quanto a lava que inunda os lares, onis da caldeira têm apetite incrível pela emoção da guerra. Embora entrem em batalha para conquistar e controlar outros, também amam o frisson do combate, lutando pelo puro prazer. Apresentar a um oni da caldeira um desafio verdadeiro pode potencialmente ganhar a misericórdia e uma oferta de servir ao lado dele.",
    "sections": []
  },
  "creature-mountain-oni": {
    "description": "Onis da montanha são os mais comuns e muitas vezes considerados os menos sofisticados. Enquanto outros onis talvez tenham ligação mais forte com o mundo espiritual, onis da montanha têm pouco interesse em qualquer coisa além de saciar os apetites implacáveis. Preguiça e gula são vícios comuns, o que pode permitir coexistir com vilas próximas desde que estejam bem alimentados — mas onis da montanha mais ambiciosos muitas vezes se encontram liderando partidas de ogros ou orquestrando assaltos violentos. É raro viverem existências solitárias, mas os que o fazem preferem saquear o campo ou explorar vilas e acumular os despojos para si.",
    "sections": [
      {
        "id": "tetsubo",
        "title": "Tetsubo",
        "body": "Um oni da montanha empunha um tetsubo, que aparece em _Lost Omens Tian Xia Character Guide_. Essa arma marcial incomum custa 3 po, causa 1d10 de dano de concussão, tem Volume 3 e exige duas mãos para ser usada. Tetsubos pertencem ao grupo da clava e têm os traços devastação, empurrar e varredura. O traço devastação significa que, sempre que a arma danifica um objeto, o objeto sofre uma quantidade de dano adicional igual ao dobro do número de dados de dano da arma."
      }
    ]
  },
  "creature-quetz-coatl": {
    "description": "Essas serpentes emplumadas sagradas servem sem descanso os poderes do conhecimento e da justiça. Algumas operam diretamente como mensageiras e intermediárias das deidades; outras operam de forma independente ao auxiliar a causa da retidão. De qualquer jeito, velam mortais e tentam influenciá-los e auxiliá-los das sombras, mudando de plano a plano para espalhar sabedoria e cura onde forem precisas. Alguns quetz coatls são adorados como divindades em sociedades remotas ou isoladas, e embora não encorajem tal veneração, usam a confiança neles depositada para fomentar paz e cooperação com outros.\n\nQuetz coatls em geral medem 3 a 6 m e pesam quase uma tonelada, com escamas iridescentes azul e verde. As asas gloriosas de penas arco-íris têm 4,5 m de envergadura. São carnívoros, alimentando-se de aves, mamíferos e até o ocasional humanoide malicioso.",
    "sections": []
  },
  "creature-kanya": {
    "description": "Kanyas são portadores de bênçãos e fortuna, bem como arautos de sabedoria e crescimento espiritual. Em geral são pacíficos, mas rápidos em agir se uma comunidade em que residem for ameaçada. Orgulham-se de inspirar mortais a tal alegria que a expressem pelas artes, o que leva ao apelido comum de “musas”. Mais de um bardo olha para um kanya como inspiração pessoal — e, como a inspiração, kanyas vêm e vão como querem. Vagueiam o mundo à vontade, oferecendo chuva, generosidade, sabedoria e apoio a quem lhes agrada.\n\nÀs vezes seguem em segredo as aventuras de heróis mortais para registrar as histórias como poemas épicos e canções, que então apresentam nos salões lotados do Elísio. Ao perseguir tais metas, tomam o cuidado de usar as magias inatas para permanecer ocultos, pois preferem observar e registrar sem “poluir” os eventos com a própria intervenção. Ainda assim, um kanya que vê o encargo diante da morte certa muitas vezes não resiste ao impulso de intervir e salvar o dia.",
    "sections": []
  },
  "creature-aesra": {
    "description": "Apesar das lâminas flamejantes e do anel de olhos que não piscam, aesras são os diplomatas da paz entre os arcontes, preferindo justiça via compromisso e benefício mútuo em vez de justiça pela espada. Ainda assim, quando forçados a lutar contra poderes capetas, não hesitam na batalha, montando ofensivas sob comandantes divinos como Iomedae.",
    "sections": []
  },
  "creature-coarti": {
    "description": "Os coartis de asas em brasa são marcados pelos contratos onerosos que aceitaram e presos ao Inferno pelas maquinações de um diabo legalista, em geral um phistophilus. Alguns coartis são de fato um tipo de celestial caído — os presos em acordos horríveis pelo bem maior ou por erros graves de julgamento — mas a maioria surge de almas mortais que estavam no caminho de se tornar celestiais e mesmo assim foram contratualmente vinculadas ao Inferno. Servem em papéis públicos como mensageiros e atendentes pessoais para demonstrar o poder do Inferno e a acuidade legal dos corruptores.\n\nCelestiais universalmente lastimam os coartis e desprezam os criadores, mas os métodos preferidos de lidar com os seres corrompidos diferem. Enquanto anjos argumentam contra causas perdidas nos tribunais de Pharasma, buscando brechas nos contratos volumosos, azatas tramam assaltos ousados contra os depósitos de contratos. Arcontes são os mais duros.",
    "sections": []
  },
  "creature-phade": {
    "description": "No Plano do Ar, e por toda a Esfera Interior, phades servem de espiões e assassinos para os criadores. Mesmo quando invocados no Universo mortal, em geral são chamados para propósitos vis e violentos, o que dá aos phades que viraram as costas ao criador uma opinião ruim também dos mortais.",
    "sections": []
  },
  "creature-quatoid": {
    "description": "Quatoids são elementais peculiares nativos do Plano da Água que lembram polvos de quatro tentáculos com rostos inquietantemente humanoides no manto. Misteriosos até para outros elementais, mesmo assim respondem a invocações mortais. Auxiliam esses mortais em combate, mas parecem preferir oferecer conselho calmo, buscando soluções alternativas mesmo no meio de conflito sangrento.\n\nCom o retorno da senhora elemental do longo cativeiro, quatoids vêm aos poucos ficando mais ativos no Plano da Água. Porém, boa parte da atividade ainda parece centrada no reino mortal.",
    "sections": []
  },
  "creature-rhu-chalik": {
    "description": "Também chamados andarilhos do vazio, rhu-chaliks podem sobreviver às profundezas do espaço indefinidamente, passando entre mundos ao longo dos éons e reconhecendo esses planetas para o Domínio do Negro. Preferem trabalhar sozinhos para reduzir sobreposição potencial nas predações mentais, mas às vezes recebem auxílio de quem acredita que a transmissão de memórias é transcendente. Os seres furtivos são calculistas e infinitamente pacientes, buscando só as mentes mais excepcionais para lançar além das estrelas aos mestres.",
    "sections": [
      {
        "id": "connoisseurs-of-thoughts",
        "title": "Conhecedores de Pensamentos",
        "body": "Rhu-chaliks não têm boca nem sistema digestivo. Em vez disso, obtêm sustento dos pensamentos e emoções de seres sencientes. Cada emoção tem um sabor distintivo para os rhu-chaliks e, como essa alimentação não fere a fonte de alimento, rhu-chaliks muitas vezes jantam repetidamente nas mentes favoritas. Alguns rhu-chaliks até incitam várias emoções na presa para arrancar gostos novos para o paladar mental."
      }
    ]
  },
  "creature-firewyrm": {
    "description": "Serpentes de fogo vivem em tubos de lava fundida encontrados por todo o Plano do Fogo. Esses ambientes estranhos muitas vezes se ligam a vulcões em mundos mortais, dando às serpentes de fogo acesso a uma variedade ampla de presas.",
    "sections": []
  },
  "creature-elemental-avalanche": {
    "description": "Teimosas e ponderosas, avalanches elementais são seres maciços de rocha e terra vivas. Uma vez despertada a ira, tomam o caminho mais curto para resolver o problema — em geral enterrando-o em pedra.",
    "sections": []
  },
  "creature-elemental-hurricane": {
    "description": "Furacões elementais encarnam a ferocidade de tempestades de vento violentas.",
    "sections": []
  },
  "creature-elemental-inferno": {
    "description": "Conflagrações ambulantes de fogo inimaginavelmente quente, infernos elementais são arautos de destruição e caos despreocupado. Mais táticos que muitos elementais, os infernos põem cidades inteiras em chamas para confundir inimigos.",
    "sections": []
  },
  "creature-elemental-tsunami": {
    "description": "Tsunamis elementais são enormes e destrutivos, sem nenhum dos aspectos cuidadosos ou nutridores da água.",
    "sections": []
  },
  "creature-augur": {
    "description": "Esses nós esféricos de músculo fibroso, lâminas serrilhadas e metal ensanguentado são os velstracs mais comuns no Mundo Inferior. Cada augur tem um único olho, pelo qual testemunham os horrores infligidos por outros velstracs, que treinam o augur a esperar e apreciar a dor. Augurs têm 30 cm de diâmetro e pesam 13,5 kg.",
    "sections": []
  },
  "creature-doru": {
    "description": "Esses enganadores sussurram mentiras fétidas, semeando inspiração sombria e pavorosa em ouvidos mortais tolos. Dorus servem como espiões e mensageiros dos divs. Com língua de prata e motivos sombrios, muitas vezes se prometem a conjuradores vaidosos e iludidos, a quem alimentam com conspirações disparatadas e rumores de engano entre amigos e inimigos; no processo, empurram os supostos mestres ao despotismo e à vingança assassina. O tempo todo, dorus extraem segredos — e fraquezas — de suas marcas. No fim, quase todo doru volta-se contra o falso suserano, destruindo a reputação e até causando a morte da pessoa a quem fingia servir.",
    "sections": [
      {
        "id": "doru-secrets",
        "title": "Segredos dos Dorus",
        "body": "Apesar da obsessão dos dorus, nem todos os segredos capturam o foco — em vez disso, cada um se fixa num tópico único. Muitos se interessam pela história de uma ancestralidade mortal particular, enquanto outros mergulham em charadas, quebra-cabeças matemáticos ou até fofoca local."
      }
    ]
  },
  "creature-ostovite": {
    "description": "Verme necrófago que corre pelos campos, comum por todo o Abismo, ostovites vagueiam campos de batalha para colher carne e ossos. Depois de dissolver e sorver a carne para se sustentar, moldam os ossos em cascos elaborados que chamam de “carruagens de osso”.\n\nEssas carruagens de osso movem-se sob o comando dos ostovites e servem como marco importante de patente nos ninhos. Para os ostovites minúsculos, maior é melhor, e construir veículos esqueléticos grandes é o único jeito de subir de posto na vida. Embora se sintam profundamente inferiores a criaturas maiores que eles, esse medo pode ser soterrado pelo desejo visceral de colher os ossos dessas criaturas para aumentar o próprio status. Diante de um esqueleto particularmente enorme, ostovites em geral brigam entre si e acabam dividindo o butim. Há, porém, casos raros em que as criaturas egoístas trabalham juntas para marionetar uma carruagem de osso bem maior.\n\nO entendimento tênue que ostovites têm de anatomia resulta em carruagens de osso que mais parecem uma tentativa de arte de pesadelo do que qualquer criatura de onde os ossos foram tirados. Alguns infernais poderosos e seus admiradores colecionam essa arte estranha subornando ostovites com esqueletos ou achando jeitos de matá-los sem desfazer a carruagem ao redor.\n\nApesar das origens nas Fendas Exteriores, não são demônios nem qlippoth. Sem a proteção dos infernais maiores, fazem lar em recantos e frestas nos cantos do plano natal. Embora não tenham habilidade inata de cruzar fronteiras planares, falhas no tecido das Fendas Exteriores muitas vezes os levam a mundos pelos planos. Ostovites que assim migraram costumam ser bem mais felizes. Longe do abuso demoníaco, em geral ficam perto de criptas mortais e campos de batalha. No Universo, raramente enfrentam ameaças além dos mortos-vivos, clérigos de Pharasma e famílias dos falecidos.",
    "sections": [
      {
        "id": "ostovite-lairs",
        "title": "Covis de Ostovite",
        "body": "Ostovites são encontrados com mais frequência em campos de batalha, vasculhando por comida e ossos, independentemente do plano. Se um dos vermes acha um local adequado e consegue trazer outros consigo, uma colônia pode se formar."
      }
    ]
  },
  "creature-tanuki-village-hero": {
    "description": "Um herói da vila tanuki é bombeiro, matador de monstros, pacificador e altruísta. Heróis da vila são eleitos por voto da comunidade; embora o herói às vezes resmungue que é muita responsabilidade para um só tanuki, a comunidade insiste que não há honra maior do que ser confiado com o bem-estar de todos.",
    "sections": []
  },
  "creature-tripkee-scout": {
    "description": "Batedores tripkee em geral vigiam as bordas dos assentamentos tripkee.",
    "sections": []
  },
  "creature-wyrwood-sneak": {
    "description": "Furtivos wyrwood especializam-se em mover-se sem ser vistos atrás das linhas inimigas, fazendo reconhecimento e eliminando ameaças em silêncio.",
    "sections": []
  },
  "creature-living-boulder": {
    "description": "Penedos vivos rolam e deslizam pelo Plano da Terra, juntando gemas e lascas de metal até que a superfície lembre o casco de um navio coberto de cracas. Pouco mais inteligentes que muitos animais, preenchem no Plano da Terra um papel muito semelhante ao dos grandes animais de manada encontrados nos mundos do Universo.",
    "sections": []
  },
  "creature-rat-snake-swarm": {
    "description": "Uma cobra solitária talvez não alarme, mas uma massa sibilante de cobras em frenesi faz até aventureiros experientes estremecer. Cobras-rato podem chegar a 3 m de comprimento e se reúnem em massa tanto para hibernar quanto para se reproduzir. Embora não sejam venenosas, essas cobras territoriais atacam qualquer coisa que as ameace.",
    "sections": [
      {
        "id": "slithering-packs",
        "title": "Matilhas Rastejantes",
        "body": "Apesar das naturezas solitárias, cobras se reúnem em enxames para fins de hibernação ou acasalamento. Porém, algumas espécies aprenderam a permanecer juntas e coordenar os esforços de caça, levando a matilhas rastejantes de cobras predadoras."
      }
    ]
  },
  "creature-slime-mold": {
    "description": "Um mofo viscoso aparece como um montículo de terra e detrito coberto por uma camada espessa de fungo que exala um fedor fraco de decomposição. O fungo de fato compartilha uma relação simbiótica com o mofo viscoso, servindo de sistema digestivo externo enquanto ganha acesso aos nutrientes de que precisa. A gosma permanece perfeitamente imóvel até que presa viva passe ao alcance, então golpeia com pseudópodes nojentos. Com um toque, um mofo viscoso pode infectar a presa com um contágio hediondo conhecido como podridão de lodo, uma doença horrenda que decompõe dolorosamente a carne da vítima. No início, a doença se manifesta como erupções dolorosas e articulações agonizantes. Nos estágios posteriores, porém, a carne da criatura afetada de fato começa a liquefazer e escorrer em filetes enquanto os esporos continuam a agir. A morte, quando ocorre, faz o corpo resultante se abrir depressa e liberar um mofo viscoso novinho.",
    "sections": [
      {
        "id": "slime-mold-fungi",
        "title": "Fungos de Mofo Viscoso",
        "body": "Os ambientes particularmente fétidos em que mofos viscosos habitam são propícios ao crescimento de cogumelos e outros fungos extremamente potentes e perigosos. Um mofo viscoso morto pode ser fonte de material suficiente para produzir algumas doses de pó de chapéu-da-morte ou outros tipos de veneno. Algumas criaturas, como deros ou aquelas com imunidade inata a doença, cultivam mofos viscosos para colher esses materiais."
      }
    ]
  },
  "creature-stone-lion-cub": {
    "description": "Filhotes de leão de pedra são curiosos, brincalhões e, ocasionalmente, causadores acidentais de travessuras. Apesar das habilidades ainda em desenvolvimento, aprimoram com entusiasmo as próprias capacidades em missões de faz de conta. Muitos esperam um dia se tornar guardiões responsáveis como os pais.\n\nMenores em porte e ferocidade, filhotes de leão de pedra às vezes tentam guardar lugares de importância menor, muitas vezes incluindo fac-símiles dos mesmos tipos de estrutura que os pais atendem. São pouco confiáveis como guardiões, pois têm a atenção e a natureza buliçosa de crianças. Os pais muitas vezes precisam chamá-los à ordem, mandando-os ficar ao lado do pai ou da mãe enquanto ambos permanecem imóveis pelo dia que se levanta.",
    "sections": [
      {
        "id": "bleeding-omen",
        "title": "Presságio Sangrento",
        "body": "Lendas dizem que leões de pedra podem prever tempestades ou enchentes iminentes. Se os olhos, o nariz ou as orelhas de um leão de pedra sangrarem, preparativos devem ser feitos. Sobreviventes solitários desses desastres afirmam que quem menospreza tais presságios como superstição muitas vezes não vive para ver o próximo amanhecer."
      }
    ]
  },
  "creature-akizendri": {
    "description": "Akizendris roem fontes de conhecimento e saber, corrompendo e alterando-as com deleite para vexar estudiosos pelos planos com contradições e inverdades.",
    "sections": [
      {
        "id": "andals-of-chaos",
        "title": "Vândalos do Caos",
        "body": "Quem busca saber secreto além dos próprios meios pode barganhar com akizendris para que lhes forneçam tomos raros em troca de entregar o akizendri imerso a uma biblioteca por meio de outro livro. Dali, o akizendri pode vandalizar livros à vontade sem ser detectado."
      }
    ]
  },
  "creature-divoynik": {
    "description": "Um assentamento unido é abalado até o âmago quando um pilar amado da comunidade é acusado de um crime hediondo. O acusado protesta inocência, mas evidências avassaladoras não deixam espaço para dúvida. Com a justiça feita, a comunidade muda de forma irreversível: o clima de vizinhança dá lugar a uma paranoia persistente — o prato predileto do divoynik.\n\nDivoyniks são metamorfos malévolos, capazes não só de imitar a aparência física de outras criaturas, mas também de arrancar pensamentos e memórias da mente das vítimas. Um divoynik retém a última forma assumida mesmo depois da morte. Magias como anel da verdade ajudam a ver através de um divoynik, e visão verdadeira revela a natureza metamórfica, tornando claras marcações de outro modo imperceptíveis, semelhantes a listras de animal no corpo do divoynik. Além da magia, quem encontra um divoynik sempre pode contar com um outro método de identificação. Embora idêntico à forma imitada em todos os outros aspectos, o corpo de um divoynik não contém sangue nem coração.",
    "sections": [
      {
        "id": "transient-tormentors",
        "title": "Atormentadores Transitórios",
        "body": "Um divoynik se deleita em aterrorizar as vítimas, em geral tomando passos calculados para se revelar ao alvo pretendido muito antes de agir. Talvez permita ao alvo um vislumbre fugaz do rosto numa multidão ou um traço de movimento no canto do olho, só para sumir antes que a certeza se instale. Além de fornecer ao divoynik oportunidades de roubar as memórias da vítima, esse assalto psicológico prolongado muitas vezes empurra a vítima a um estado de desconfiança e agitação extremas, tornando os crimes aparentes da vítima ainda mais críveis."
      }
    ]
  },
  "creature-dziriak": {
    "description": "Essas criaturas estranhas são nativas do Mundo Inferior, onde a natureza colorida se opõe à paleta esmagadoramente monocromática daquele reino. Com média de 2,1 m de altura, d'ziriaks têm quatro braços, duas pernas e um abdômen semelhante ao de um cupim. O par maior de braços, usado na maior parte das tarefas, tem mãos de cinco dedos com garras insetoides afiadas. O par menor fica reservado a manipulações finas e não é eficaz em combate.\n\nAs carapaças de outro modo marrom-opacas dos d'ziriaks são decoradas com inúmeras runas que brilham em cores vivas. Essas runas semelhantes a tatuagens indicam o papel do indivíduo na sociedade d'ziriak e os distinguem dos demais habitantes nativos do plano natal. As runas brilham com bioluminescência natural, e d'ziriaks podem fazê-las brilhar com intensidade por um instante, ao custo de sobrecarregar por um tempo prolongado as glândulas bioquímicas que criam e mantêm as runas. A cor e a forma das runas são em parte naturais, mas podem ser cuidadosamente personalizadas ao longo do tempo para caber à posição do indivíduo.\n\nA língua D'ziriak é uma mistura de zumbidos e chiados, falada por poucas outras criaturas. D'ziriaks preferem comunicar-se com outras espécies por telepatia a suportar o som da língua sendo “massacrada por goelas de carne”. Organizam-se em cidades-colmeia lideradas por um rei e uma rainha. Essas cidades-colmeia consistem em agulhas impressionantes, mas as torres são só a parte mais visível do assentamento, com muitas câmaras que descem fundo abaixo, usadas como residências, oficinas e fazendas de fungos. Os assentamentos d'ziriak são iluminados por dentro e por fora com fontes de luz alquímica e mágica, muitas vezes em forma de runas. Essas torres de brilho tênue oferecem marcos a viajantes e talvez prometam refúgios seguros no Mundo Inferior, de outro modo sombrio.",
    "sections": [
      {
        "id": "light-weavers",
        "title": "Tecelões da Luz",
        "body": "Os mestres do ofício de tecelagem de luz d'ziriak são praticantes ocultistas, quase sempre feiticeiros da linhagem aberrante. Tecelões da luz preferem magias que fornecem luz ou criam escrita mágica. Em suas cidades-colmeia, tecelões da luz criam arte, iluminação, sinalização e proteções mágicas. Também usam a tecelagem de luz para entretenimento e educação."
      }
    ]
  },
  "creature-esobok": {
    "description": "Esoboks são caçadores brutos e sentinelas belicosos que servem como os cães de guarda do Ossário. Esses quadrúpedes baixos e poderosos têm um colar de penas escuras em volta das cabeças distintas, que lembram um crânio de crocodilo. Esoboks raramente incomodam quem está de fato morto, deixando os mortos do Ossário seguirem seus afazeres enquanto permanecem atentos ao perigo. Embora astutos ao farejar ameaças ao Ossário ou aos tratadores psicopompos, estão entre os psicopompos menos inteligentes e raramente falam, salvo para proferir ameaças rosnadas. Os sábios escutam quando um esobok faz uma ameaça, pois ele não a fará duas vezes.",
    "sections": []
  },
  "creature-hound-topiary": {
    "description": "Um cão majestoso pode ser encontrado guardando a entrada de vários jardins nobres por Avistan, muitas vezes como aviso a partidas de goblins saqueadores ou como apelo devoto de proteção a Cayden Cailean ou Dispater, conforme a região. Na natureza, topiárias de cão aparecem em áreas de folhagem densa onde podem camuflar as matilhas. Onde quer que estejam, são formadas de almas que em vida foram extremamente leais e protetoras dos seus, e agora buscam garantir a segurança dos territórios escolhidos.",
    "sections": [
      {
        "id": "topiary-packs",
        "title": "Matilhas de Topiária",
        "body": "Topiárias de cão vivem comunalmente nas áreas selvagens escolhidas, em geral imitando as ações típicas de matilhas caninas. Porém, quando encontram alguém morrendo e sozinho, as topiárias de cão cercam o corpo, oferecendo conforto nos últimos momentos. Uma vez que a alma partiu, a matilha erguerá as cabeças num uivo silencioso e inquietante de luto e lembrança."
      }
    ]
  },
  "creature-kuribu": {
    "description": "Kuribus servem como guardiões de templos e outros sítios sagrados. Têm aparência humanoide e aproximadamente o tamanho de crianças humanas. O corpo parece de pedra, o que permite a kuribus disfarçar-se de estátuas por períodos prolongados (às vezes até séculos). Ao defender seus sítios, kuribus assediam invasores à distância.",
    "sections": [
      {
        "id": "holy-countenances",
        "title": "Semblantes Sagrados",
        "body": "Kuribus podem assumir parcialmente a aparência de animais poderosos e recorrer às habilidades dessas criaturas em combate. Embora a maioria dos kuribus manifeste os animais apresentados aqui, alguns em vez disso recorrem às habilidades de outras criaturas como elefantes ou lobos. Alguns relatos divinos falam de kuribus antigos que podem transformar-se por completo nessas criaturas e permanecer vigilantes por décadas no disfarce de estátuas de animais."
      }
    ]
  },
  "creature-lacridaemon": {
    "description": "Almas que morrem de negligência ou exposição por se perderem, ficarem presas em espaços pequenos ou de outro modo distantes de ajuda podem transformar-se em lacridaemons. Esses daemons mais fracos estão cheios de desespero e em geral atacam qualquer um que vejam, acreditando que os tenham abandonado de propósito ao próprio destino. Muitos lacridaemons nascem das almas de mortais perversos que afastam os outros e assim sofrem mortes solitárias. Nobres corruptos exilados e criminosos violentos deixados a apodrecer em prisões solitárias são comuns entre suas fileiras.\n\nLacridaemons tendem a lembrar humanoides de pele cinza e lisa, com uma cauda estranha e garras vis. Cada um tem manchas de geada pela carne, representando os fins em última instância frios e solitários. Essas manchas aparecem em todo lacridaemon mesmo que a morte não tenha sido por exposição ao frio, como no caso de almas que pereceram sozinhas de sede no deserto.\n\nMesmo no estado infernal, lacridaemons não conseguem deixar de se considerar sozinhos. Não é incomum achar grupos de lacridaemons em que cada daemon age de forma independente, como se os outros não estivessem ali. Tendem a sentar-se sozinhos em cantos escuros que lembram os lugares em que morreram, soluçando alto, mas assim que percebem a presença de não infernais atacam depressa, acreditando que essas criaturas sejam as mesmas que os abandonaram em vida. As habilidades sobrenaturais de um lacridaemon permitem ao infernal sujeitar outros a um destino semelhante à própria morte, tornando difícil escapar do perigo e achar ajuda.",
    "sections": [
      {
        "id": "those-who-die-alone",
        "title": "Quem Morre Sozinho",
        "body": "As almas mais comuns que geram lacridaemons são as de indivíduos perversos abandonados a mortes solitárias. Vilões perigosos e reclusos que encontram o fim nas mãos de aventureiros em covis remotos tendem a tornar-se lacridaemons. Além disso, aqueles que morrem expostos aos elementos naturais, seja por calor intenso, temperaturas congelantes ou sede, podem acabar como lacridaemons."
      }
    ]
  },
  "creature-platecarpus": {
    "description": "Os platecarpuses de tamanho médio são o tipo mais comum de mosassauro. Em geral medem 4,5 m de comprimento, mas espécimes maiores podem chegar a 6 m. As variedades maiores às vezes comem humanoides Médios, mas a maioria se atém a presas menores.",
    "sections": []
  },
  "creature-grioth-scout": {
    "description": "Os primeiros grioths encontrados num mundo novo são batedores. Em geral atravessam a vastidão do espaço por portais de ida só a partir dos mundos natais; batedores grioth nunca esperam ver o lar de novo, pois a liderança grioth garante devoção verdadeira ao esforço de colonização encalhando-os em mundos novos.",
    "sections": []
  },
  "creature-aghash": {
    "description": "Encarnações ambulantes de maldições, infortúnio e mau-olhado, aghashes vagueiam os desertos do Plano Material, buscando os arrogantes, encantadores e persuasivos para humilhar e minar. Aghashes muitas vezes são tomados por alguma forma estranha de bruxa e, como aquelas criaturas, são mestres em maldições.",
    "sections": []
  },
  "creature-earthen-destrier": {
    "description": "Esta onda de terra assume a semelhança tosca dos quartos dianteiros fundidos de um cavalo de guerra em investida e de um cavaleiro rochoso empunhando uma lança rudimentar de pedra cinzenta.",
    "sections": []
  },
  "creature-filth-fire": {
    "description": "Essas criaturas parecem nuvens revoluteantes de fumaça negra agitando-se acima de um montículo de refugo em chamas. Rostos debochados se formam e se desfazem na fumaça acima, enquanto o detrito ardente se contorce em solavancos espasmódicos, claramente vivo.",
    "sections": []
  },
  "creature-living-thunderclap": {
    "description": "Um trovão vivo é uma nuvem de tempestade pequena (às vezes na forma vaga de um humanoide) que estala e estrondeia com trovões.",
    "sections": []
  },
  "creature-mist-stalker": {
    "description": "O espreitador da névoa tentaculado envolve-se num manto de névoa através do qual seu único olho, que nunca pisca, enxerga com clareza, dando-lhe vantagem ao espreitar a presa.",
    "sections": []
  },
  "creature-lovelorn": {
    "description": "Uma forma particularmente macabra de morto-vivo, essas criaturas semelhantes a aranhas lembram corações ainda batendo, com ossos de costela por pernas e gavinhas de sangue coagulado pendendo por baixo. As formas retorcidas apontam para a origem hedionda, pois esses mortos-vivos se formam de quem morre mortes trágicas a serviço de um amor tóxico: amantes fadados que morrem em vez de aceitar uma vida apartados um do outro, pretendentes rejeitados cujos afetos não correspondidos se distorcem em malícia, e outras vítimas de relacionamentos trágicos, românticos ou não. Qualquer um desses pode gerar um lovelorn na morte, a angústia e a fixação no coração partido fazendo o órgão se animar.\n\nUm lovelorn recém-surgido muitas vezes busca quem conhecia em vida, espreitando e atormentando essas pessoas ou, em alguns casos, quem está à volta delas. Na morte-viva, ganham entendimento das emoções e de como manipulá-las, cultivando a miséria, a raiva e a crueldade de que se nutrem. Em geral, esses mortos-vivos anseiam executar vingança sobre quem sentem tê-los levado aos destinos trágicos, embora em casos raros possam em vez disso agir como guardiões sombrios, fixando-se num ente querido em particular e “protegendo-o” visitando miséria sobre qualquer um que o ofenda.",
    "sections": [
      {
        "id": "lovelorn-keepsakes",
        "title": "Lembranças de Lovelorn",
        "body": "Embora um lovelorn tenha pouco uso para tesouro e raramente o colete ou acumule por valor monetário, esses mortos-vivos apaixonados muitas vezes coletam lembranças e bugigangas, tanto das próprias vidas antes de se tornarem mortos-vivos quanto das vítimas desde que se tornaram um lovelorn. Embora muitos desses tesouros possuam pouco valor intrínseco — pinturas, diários, brinquedos feitos à mão e similares — não é incomum que lovelorns encham os ninhos retorcidos de anéis cravejados de joias, colares, pentes antigos ou medalhões de ouro e platina."
      }
    ]
  },
  "creature-nightgaunt": {
    "description": "Nightgaunts espreitam nos sonhos, à espera de raptar o sonhador desatento. Uma vez ligados a tal ser, o nightgaunt alimenta-se das emoções do mortal antes de abandoná-lo — muitas vezes num lugar de onde talvez nunca acorde.\n\nUm nightgaunt aparece como um humanoide ósseo de pele negra como tinta, asas de morcego, uma cauda longa e sinuosa e chifres demoníacos no alto de uma cabeça sem rosto nem feições. A maioria dos nightgaunts tem pouco interesse em qualquer coisa além de saciar a fome de emoções. Acham a arte de induzir pesadelos um jeito certeiro de se banquetear, mas são ainda mais hábeis em atormentar as vítimas fazendo cócegas enquanto as carregam a alturas precárias.\n\nNightgaunts muitas vezes se reúnem em colônias vastas nas Terras dos Sonhos, onde se entretêm compartilhando memórias de emoção de suas refeições por carícias estranhas. Essas colônias representam grande perigo a qualquer aventureiro tolo o bastante para se aproximar.\n\nQuando conjurados a outros mundos, servem só de má vontade, muitas vezes trabalhando com igual empenho para achar um jeito de escapar da servidão e alimentar-se das emoções do conjurador quanto na tarefa que foram compelidos a cumprir.",
    "sections": [
      {
        "id": "emotion-eaters",
        "title": "Devoradores de Emoção",
        "body": "Nightgaunts alimentam-se de emoções por meio do toque, preferindo coquetéis únicos formados de emoções conflitantes, especialmente desespero, horror ou riso nervoso. Tal alimentação tem pouco impacto duradouro na fonte de alimento, mas um nightgaunt só pode alimentar-se de uma dada criatura uma vez. Como resultado, tendem a saciar-se por completo antes de buscar presa diferente."
      }
    ]
  },
  "creature-nucol": {
    "description": "Representando o medo de parasitas e aflição, nucols aparecem como javalis violentos e tomados de pestilência. Poluem o corpo e a mente da vítima, espalhando não só medo, mas uma aflição que altera a mente e agrava sentimentos de autodesconfiança.\n\nEmbora muito agressivos, os infernais são capazes de manipulação astuta. Depois de infectar uma vítima com insegurança potente, oferecem-se a remover a aflição por um preço. Muitos desses acordos são esotéricos por natureza, empurrando a vítima ao desespero e forçando-a a abrir mão do que preza. O nucol sinistro pode até reinfectar a vítima depois de cumprir a barganha, mas um negociador esperto talvez consiga virar o jogo contra o infernal e livrar-se do jugo.",
    "sections": []
  },
  "creature-shae": {
    "description": "Shae são criaturas tênues e tenebrosas nativas do Plano das Sombras. Os corpos amorfos aparecem em constante estado de fluxo. Não lançam sombra própria; em vez disso, ganham e perdem energia umbral para sombras próximas que encolhem e crescem junto com eles.\n\nA maioria dos shae veste roupas fiadas de sombras que se deslocam com eles, embora diplomatas às vezes usem trajes mais convencionais ao entreter forasteiros. O adorno mais distintivo são as máscaras de pedra branca, que shae vestem só quando precisam pôr um “rosto” discernível para interagir com humanoides e criaturas semelhantes. Fazem-no de má vontade, pois se consideram superiores a humanoides, mas vestir as máscaras permite que sejam compreendidos com mais facilidade e assim mantém as interações com seus inferiores tão breves quanto possível.\n\nA dinâmica entre um shae e humanoides muda, porém, quando humanoides passam a adorar um shae. Um mortal que mostre a um shae a deferência devida vale a pena manter por perto, então muitos shae colecionam cultos de personalidade ou séquitos expansivos. Até conseguir uma audiência com um shae tão convencido da própria importância pode ser um desafio que exige lidar com muitas camadas de agregados que insistem em vetar o recém-chegado antes de desperdiçar o tempo precioso do shae.\n\nSegundo o saber shae, eles transcenderam o mundo material e agora encarnam um equilíbrio cosmológico de realidade e ilusão. As pretensões de ascensão metafísica e o conhecimento dos segredos das sombras atraem muitos suplicantes mortais a juntar-se a cortes e cultos shae. Na língua shae, o nome significa “desvinculado”, de acordo com a crença de que a natureza efêmera os liberta das amarras morais e sociais que prendem outras criaturas sencientes, e essencialmente fazem da caprichosidade uma virtude. Shae sentem pouca obrigação de cumprir juramentos ou obedecer leis, então selar um pacto com um mortal pouco significa para eles.",
    "sections": [
      {
        "id": "children-of-shadow",
        "title": "Filhos da Sombra",
        "body": "Embora seja raro, shae ocasionalmente envolvem-se em relacionamentos com mortais, resultando em filhos nascidos como fetchlings. Embora shae mantenham uma superioridade fria sobre os filhos mortais, fetchlings que se juntam ao culto de um shae são colocados em posições de autoridade sobre outros mortais e recebem tratamento flagrantemente preferencial."
      }
    ]
  },
  "creature-shriezyx": {
    "description": "Há muito tempo, magos thassilonianos criaram shriezyx em experimentos retorcidos para atuar como guardas e sujeitos de teste. Essas aberrações de 136 kg sobreviveram aos criadores e em geral fazem lar em ruínas thassilonianas, cavernas e nas profundezas das Terras Sombrias. O corpo é coberto de quitina dura e extremamente inflamável, que muda conforme crescem.\n\nEmbora um shriezyx pareça uma aranha bestial de três olhos, a verdade por trás dessas criaturas é bem mais grotesca. Em vez de fiar seda, um shriezyx cospe da boca fios de carne informe e grudenta. Quando frescos, esses fios carnosos são revestidos de uma toxina que entorpece nervos e retarda a presa. O cuspe-carne semelhante a teia cobre covis e ninhos de shriezyx, envolto em volta dos ossos de refeições anteriores. Por sorte para quem tropeça nesses covis, a toxina de um shriezyx se dissipa ao contato com o ar, deixando as teias carnosas apenas nauseantemente grudentas. Infelizmente para esses mesmos viajantes, shriezyx muitas vezes são criaturas comunais que se reúnem em grande número e atacam depressa os intrusos.\n\nDeros e outros povos subterrâneos às vezes mantêm shriezyx como guardas ou montarias, usando comida e ameaças de fogo para mantê-los na linha. A maioria dos donos de shriezyx se apressa a descartar quaisquer ovos, temendo que um enxame cresça além do controle, mas alguns criadores perceberam que a prole de um shriezyx retém muito do temperamento do progenitor e guardam os ovos dos shriezyx mais leais (ou que mais temem o fogo) na esperança de criar um rebanho lucrativo e mais fácil de controlar. Embora mestres mais cruéis possam usar shriezyx como sujeitos de teste, alquimistas muitas vezes veem essas criaturas como mascotes queridos. As teias grotescas rendem ótimos reagentes alquímicos e fornecem carne de origem ética para experimentos, enquanto o exoesqueleto mudado pode ser usado para criar bombas e outros explosivos.",
    "sections": [
      {
        "id": "infestation-problems",
        "title": "Problemas de Infestação",
        "body": "Shriezyx são resilientes e, mesmo presos em desabamentos, conseguem sobreviver por um período extraordinário com pouco para comer. Quando um projeto de obras públicas em Magnimar revelou uma caverna no Irespan, enxames de shriezyx foram soltos na cidade. Desde então, é prática comum usar ferramentas especializadas para escutar os sons reveladores das garras estalando de um shriezyx antes de demolir quaisquer estruturas ou bunkers antigos e ocos."
      }
    ]
  },
  "creature-stone-lion": {
    "description": "Leões de pedra são visão comum do lado de fora de bancos, templos, palácios e até residências particulares. As expressões ferozes cravadas no rosto lembram os passantes a manter o melhor comportamento.\n\nLeões de pedra permanecem guardiões fiéis de um sítio, independentemente de ele cair em ruína. Mesmo que as pessoas abandonem um lugar, o leão permanece diligente até a estátua estar demasiado gasta ou quebrada para ser habitada por mais tempo.",
    "sections": []
  },
  "creature-viper-swarm": {
    "description": "A massa assustadora de escamas reluzentes, olhos brilhantes e presas pingando veneno que constitui um enxame de víboras já pôs fim a mais de um aventureiro azarado. Normalmente noturnas, essas cobras notoriamente agressivas atacam qualquer coisa que chegue ao alcance, seja membro ou arma. O veneno é uma toxina potente que deixa as vítimas trêmulas e fracas. Os sortudos talvez recebam um bote de aviso sem veneno antes de serem atacados de verdade.",
    "sections": [
      {
        "id": "slithering-packs",
        "title": "Matilhas Serpenteantes",
        "body": "Apesar de suas naturezas solitárias, cobras reúnem-se em enxames para fins de hibernação ou acasalamento. Porém, algumas espécies aprenderam a permanecer juntas e coordenar os esforços de caça, levando a matilhas serpenteantes de cobras predadoras."
      }
    ]
  },
  "creature-catrina": {
    "description": "Nem todos os espíritos que entram no Ossário percebem que morreram. Catrinas encontram essas almas, ajudando a convencê-las da finalidade do destino para suavizar a passagem do espírito. Catrinas são mais propensas a intervir quando um mortal não consegue aceitar a própria morte. Cumprem a tarefa para manter o além-vida calmo, mais do que por verdadeira compaixão pelo luto de um mortal. Catrinas raramente visitam o Universo, em geral para ajudar um mortal extremamente importante a partir.\n\nCatrinas lembram esqueletos vestidos de flores vivas e vestidos coloridos, o que lhes dá uma aparência ao mesmo tempo festiva e macabra. Embora a maioria das catrinas se apresente como feminina, catrinas masculinas ainda se vestem de cores vivas e carregam guirlandas de flores.",
    "sections": [
      {
        "id": "dealing-with-grief",
        "title": "Lidando com o Luto",
        "body": "A morte muitas vezes vem com grande sofrimento emocional. Enquanto catrinas lidam com esses sentimentos para almas no além-vida, as emoções dos entes queridos do falecido podem tornar-se uma complicação. Na maioria dos casos, um tipo diferente de psicopompo — calacas — tratará do assunto no Universo mortal. Semelhantes às catrinas na aparência, esses psicopompos esqueléticos fazem uso da canção para aliviar os sentimentos dos mortais. Em casos extremos, como a ameaça de um ente querido recorrer a necromancia vil para restaurar o morto, uma catrina pode estabelecer uma comunicação breve entre o morto e seus entes queridos."
      }
    ]
  },
  "creature-emperor-cobra": {
    "description": "Essas serpentes poderosas infestam pântanos e terras baixas. Apesar de terem mais de 4,8 m de comprimento e pesarem mais de 90 kg, conseguem subir em árvores em segundos. Cobras-imperador afastam predadores abrindo o capelo e sibilando contra os atacantes. Como muitas cobras venenosas, caçam golpeando a presa com a mordida venenosa, recuando até as vítimas morrerem e então voltando para engoli-las inteiras.",
    "sections": []
  },
  "creature-ether-spider": {
    "description": "Aranhas do éter pertencem a uma taxonomia vaga chamada fauna etérea e são predadoras mortais do Plano Etéreo. São aracnídeos gigantes que moldam a essência bruta do Plano Etéreo com a mesma facilidade com que fiam seda, tecendo-a em padrões complexos que derivam pelo vazio enevoado. Desses ninhos etéreos, famílias inteiras de aranhas do éter podem reconhecer locais adjacentes no Universo, vigiando presa fácil em cantos escuros ou remotos da terra dos mortais. Uma vez que uma aranha do éter avista uma refeição, ancora o ninho e espera no Plano Etéreo que a presa se aproxime. Assim que a vítima está ao alcance, a aranha do éter desloca-se para o Universo, crava as presas na presa e então volta ao Plano Etéreo para esperar enquanto o veneno percorre o sistema da criatura. Aranhas do éter movem-se entre os planos com facilidade, o que as torna extremamente perigosas para quem não consegue ver nem atacar inimigos etéreos.\n\nAranhas do éter não são irracionais nem cruéis — estão simplesmente famintas. Se uma refeição em potencial puder saciar o apetite incrível de uma aranha do éter por outros meios, talvez consiga barganhar pela própria vida. Aranhas do éter têm especial interesse em itens, informação ou aliados que as ajudem contra os inimigos.\n\nAranhas do éter habitam ninhos vastos à deriva no Plano Etéreo, onde até meia dúzia de aranhas do éter podem coabitar. Embora gostem da companhia umas das outras, não formam os mesmos laços que a maioria dos humanoides, e é mais provável que se banqueteiem no cadáver de um irmão caído do que salvem um da ruína certa. Quando não caçam presa, aranhas do éter tendem a baixar a guarda. Viajantes que encontrem uma comuna flutuante de aranhas do éter devem ter mais facilidade de fazer contato pacífico para negociar ou até fazer amizade com esses aracnídeos estranhos. Os ninhos derivam em correntes metafísicas e raramente são vistos nas mesmas imediações duas vezes.\n\nÀs vezes um ponto de interesse no Universo vizinho os compele a amarrar o ninho a uma área, criando um lar semipermanente.",
    "sections": [
      {
        "id": "ether-spider-foes",
        "title": "Inimigos da Aranha do Éter",
        "body": "O Plano Etéreo é um reino pouco povoado em comparação com a maioria, usado mais para viajar do que para habitar. Ainda assim, as névoas profundas aqui ocultam habitantes como seres parasitários monstruosos que usam humanoides como incubadoras para ovos, infernais nascidos dos medos crus da vida mortal, e aranhas do éter que permanecem sempre vigilantes contra as maquinações desses inimigos."
      }
    ]
  },
  "creature-penanggalan": {
    "description": "Penanggalans alimentam-se do sangue e das entranhas dos jovens. Quando a fome canibal ataca, penanggalans banham o corpo numa substância alquímica que cheira a vinagre. Uma vez submersos na mistura, o pescoço rasga de um lado ao outro, permitindo que a cabeça flutue para cima e puxe para fora os pulmões, o estômago e os intestinos. Deixam o corpo no banho de vinagre como um caranguejo que troca o casco deixa a casca velha, então voam para achar uma vítima cheia de sangue e vísceras.\n\nPor mais grotescas que essas criaturas sejam quando famintas, a penanggalan parece jovem e saudável enquanto veste o corpo. Tal é a natureza de sua existência: consorciaram-se com seres de outro mundo, ganhando uma vida de juventude em troca de uma fome maligna pelos jovens. Mas não são imortais. Envelhecem e morrem normalmente, como as pessoas que um dia foram — só retêm a juventude ao longo dessa existência.\n\nPode ser difícil identificar uma penanggalan no meio da população. A cicatriz tênue que circunda o pescoço no ponto de separação pode ser explicada como uma mancha, e pode ser escondida sob um colar vistoso. Enquanto isso, o cheiro azedo e fraco do corpo preservado de uma penanggalan, embora peculiar, não é incomum nos trópicos suados que frequentam.",
    "sections": [
      {
        "id": "tanggal-segmentations",
        "title": "Segmentações Tanggal",
        "body": "Como as penanggalans, outros tanggals alimentam-se de carne e separam-se do corpo de alguma forma. Tais criaturas também têm as próprias fraquezas. O manananggal parte da cintura em vez do pescoço, e o cheiro de vinagre os repele em vez de sinalizar a presença. O balan-balan também se parte do pescoço como a penanggalan, mas deixam troncos de bananeira envoltos em ilusão nos caixões para lembrar os cadáveres que roubaram."
      }
    ]
  },
  "creature-storm-hag": {
    "description": "Impiedosas e temperamentais, bruxas da tempestade são a personificação da fúria de uma tempestade. Párias pelo próprio comportamento, muitas vezes são encontradas em ilhas que transformaram em refúgios pessoais, controlando os habitantes locais por ameaças. Diferente da maioria das bruxas, muitas bruxas da tempestade mostram sinais de de fato se importar com a prole, tanto a adotada quanto a de nascimento. Qualquer criança assim que possua moral, porém, não terá vida fácil, pois em geral fica tentando e falhando em lidar com o temperamento implacável da mãe para com os outros.\n\nA forma verdadeira de uma bruxa da tempestade lembra uma mulher humanoide mais velha, com cabelo branco açoitado pela tempestade, olhos brilhantes como relâmpago e pele azul-escura. Em geral só mostram a forma verdadeira quando estão em fúria, o que faz o viso natural parecer mais aterrorizante do que de fato é.",
    "sections": []
  },
  "creature-velociraptor-pack": {
    "description": "Velociraptores são caçadores de matilha espertos que em geral se sustentam de herbívoros pequenos, mas não têm medo de enfrentar presa maior em grupo. Populações maiores de velociraptores são mais perigosas quando se coalescem num enxame para proteger os filhotes. Mesmo em grande número, esses raptores emplumados permanecem estranhamente ágeis e podem lançar-se de súbito contra os inimigos. Encorajados pelo número aumentado, os enxames atacam com ferocidade as garras e perseguem com tenacidade qualquer ameaça percebida.",
    "sections": []
  },
  "creature-vloriak": {
    "description": "Vloriaks surgem das almas pecaminosas daqueles cujos atos de sabotagem resultaram em desespero e terror, e se deleitam na destruição do artifício mortal. Usam a habilidade de enferrujar metais para destruir estruturas, obras de arte preciosas e ferramentas usadas para criar. Em combate, essa habilidade lhes permite destruir os armamentos dos atacantes. Vloriaks gostam em especial de destruir armaduras e escudos, pois esses itens defensivos em geral trazem desenhos e decorações elegantes que são mais prazerosos de profanar do que os de uma arma.\n\nMuitas vezes chamados demônios devastadores, vloriaks foram os seguidores do senhor demônio há muito morto Xar-Azmak. Seus números diminuíram ao longo dos éons desde a morte do Senhor da Ferrugem; os que existem agora estão espalhados pelas Fendas Exteriores. Os corpos quitinosos e os olhos facetados lhes dão uma aparência insetoide.",
    "sections": [
      {
        "id": "vlorian-influence",
        "title": "Influência Vloriana",
        "body": "Vloriaks vêm do reino de Vlorus nas Fendas Exteriores e, como tal, carregam em si o potencial de decomposição e ruína enferrujante. Outras criaturas que habitam Vlorus — em particular infernais que sobem ao poder ali — também podem ganhar poderes semelhantes sobre a ferrugem. Qlippoth são especialmente adequados a este reino."
      }
    ]
  },
  "creature-yamah": {
    "description": "Yamahs dedicam-se a proteger os outros da magia usada para o mal, em especial a que aprisiona almas ou controla o livre-arbítrio de uma criatura. Deleitam-se em tomar a magia de um conjurador malévolo e voltá-la a propósitos virtuosos.\n\nYamahs muitas vezes ostentam semblantes severos, mas ainda assim apreciam momentos de alegria e capricho como outros azatas. Em particular, deleitam-se em piadas leves e canções alegres quando apropriado. Uma vez que entram em combate, porém, as disposições brilhantes mudam para foco e determinação. Ao lutar contra inimigos da liberdade, yamahs tendem a atacar à distância, usando o voo e as habilidades à distância para assediar os oponentes. Se um conjurador estiver envolvido, yamahs avançam para a linha de frente, tentando interceder entre os aliados e a magia do conjurador.\n\nEclipses lunares e outros eventos celestes notáveis tendem a atrair yamahs ao Universo. Esses azatas aparecem com mais frequência durante esses eventos para auxiliar os seguidores de deidades com ligações a tais acontecimentos, como Desna e a senhora empyreal Ashava. Contos entre essas fés falam de yamahs que se aliam a adoradores em empreitadas contra infernais malignos. Essas histórias inevitavelmente terminam com o yamah partindo depois que a tarefa está completa, deixando o adorador mortal sem uma palavra.",
    "sections": [
      {
        "id": "yamah-bracelets",
        "title": "Braceletes de Yamah",
        "body": "Cada yamah usa um bracelete personalizado, cravejado de gemas de quartzo que refletem o cosmos. Estes são empoderados por magia invisível, recarregando quando o yamah tem 8 horas de descanso. Esses braceletes têm uma conexão divina única com o respectivo yamah, e os braceletes só funcionam para aquele yamah. Ocasionalmente, um yamah presenteia o bracelete a um mortal, mais como um símbolo de confiança e um sinal de que o indivíduo está protegido do que uma tentativa de compartilhar poder."
      }
    ]
  },
  "creature-bodach": {
    "description": "Um bodach, também conhecido nas lendas como o Velho Homem Cinzento, é a encarnação fey da idade e da decrepitude, um ladrão malicioso cuja ganância é sem fundo e desprovida de moral. Também estão associados à chuva miúda cinzenta e incessante do inverno e ao desgaste constante de penhascos e castelos.\n\nNa aparência, um bodach lembra um homem velho, e muitos podem passar por mortal à primeira vista. Um olhar mais atento, porém, os denuncia — tudo que um bodach carrega é velho e em decomposição, cada pedaço de tecido desfiado e cada sucata de metal manchada e enferrujada. Há uma cinzentidão estranha neles, como se a luz nunca os iluminasse direito. Bodachs são vistos com mais frequência no crepúsculo ou em dias nublados; não são prejudicados pela luz do sol, mas também não gostam muito dela.\n\nApesar da associação com a idade, bodachs são bem ágeis. Um bodach é ladrão e trapaceiro por preferência, abordando viajantes e tentando surrupiar-lhes as moedas com uma mentira plausível. De modo mais sinistro, alguns bodachs também roubam pessoas, rastejando por chaminés para raptar as crianças de uma casa.\n\nMuitos não fey acreditam que até vislumbrar bodachs é um mau presságio que anuncia perigos graves ou até a morte, crenças que talvez estejam ligadas ao pavor que essas criaturas inspiram. Contos folclóricos locais dizem que círculos de sal bastam para manter um bodach à distância, embora na verdade isso tenha pouco efeito. Ainda assim, muitas casas encontradas perto de onde avistamentos de bodach são comuns são protegidas por uma linha de sal destinada a “selar” a lareira ou a chaminé.",
    "sections": [
      {
        "id": "gray-men-and-red-caps",
        "title": "Homens Cinzentos e Redcaps",
        "body": "A lenda sustenta que o bodach é primo do redcap, e é certamente verdade que esses dois tipos de fey se dão melhor do que a maioria. Redcaps maliciosos gostam de ter a presa amolecida, enquanto o bodach aprecia ter alguém por perto para fazer o trabalho sujo de de fato matar."
      }
    ]
  },
  "creature-cave-giant": {
    "description": "Gigantes das cavernas são os solitários vis do mundo dos gigantes. Até outros parentes gigantes em geral acham os gigantes das cavernas brutais e antissociais demais para formar alianças. Quanto a eles, gigantes das cavernas — vestidos de peles fétidas enfeitadas com os crânios em decomposição das vítimas — parecem ambivalentes quanto à reputação hedionda.",
    "sections": [
      {
        "id": "cave-giant-allies",
        "title": "Aliados do Gigante das Cavernas",
        "body": "Um gigante das cavernas sortudo talvez consiga capturar e amansar um réptil gigante, como um lagarto-monitor ou uma salamandra gigante, para servir de animal de estimação maltratado ou besta de guarda. Esses répteis muitas vezes são abusados pelos donos cruéis, aprendendo a reagir a todos os humanoides com medo e violência."
      }
    ]
  },
  "creature-cavern-troll": {
    "description": "Necrófagos insaciáveis, trolls das cavernas espreitam a treva eterna das Terras Sombrias, consumindo tudo no caminho — até rochas e minerais. Esses golias rochosos conseguem escavar túneis pela pedra com as garras afiadas como ferro. Apesar de uma vulnerabilidade debilitante à luz do sol que os petrifica em contato sustentado, trolls das cavernas famintos muitas vezes são atraídos ao mundo da superfície, comparativamente viçoso. Mesmo petrificados, os trolls imóveis muitas vezes são tomados por pedregulhos ou outros fenômenos naturais, deixando-os livres para caçar quando a noite cai de novo. Conforme envelhecem, a pele sílex fica cravejada de cristais pequenos e pedras de várias composições. Paragões de sua espécie têm goelas denteadas repletas de presas cristalinas grandes.",
    "sections": [
      {
        "id": "mixing-variations",
        "title": "Misturando Variações",
        "body": "Trolls das cavernas e trolls do gelo geram os próprios trolls jotund, trolls de duas cabeças e líderes de guerra. Nesses casos, mude a imunidade, a regeneração e as fraquezas para combinar com a origem. Você também pode atualizar o gatilho da reação e a remoção de dano persistente para combinar com essas fraquezas."
      }
    ]
  },
  "creature-fire-jellyfish-swarm": {
    "description": "Embora individualmente uma dessas águas-vivas do tamanho de um punho seja apenas um incômodo, em grande número águas-vivas de fogo podem formar enxames perigosos. Boiando na água, criam uma nuvem de tentáculos urticantes. Foram nomeadas em parte pela coloração viva, mas quem é ferroado por águas-vivas de fogo aprende a razão maior do nome — a dor das ferroadas é comparável a ser queimado vivo.",
    "sections": []
  },
  "creature-iguanodon": {
    "description": "Iguanodontes são dinossauros herbívoros grandes que habitam pântanos e florestas, onde pastam a vegetação abundante. O iguanodonte é capaz de mover-se sobre dois pés ou sobre quatro, trocando depressa de uma postura para a outra conforme precise atravessar folhagem densa ou alcançar iguarias penduradas no dossel.\n\nEmbora iguanodontes sejam herbívoros, são notoriamente rápidos em se irar. Os espinhos do polegar tornam as garras armas particularmente devastadoras. Um golpe bem colocado de uma dessas garras pode transformar um predador faminto numa fera acovardada num só golpe rápido. Iguanodontes têm 9 m de comprimento e pesam 2.700 kg.",
    "sections": []
  },
  "creature-mi-go": {
    "description": "Mi-gos são ao mesmo tempo cientistas e colonizadores, mas a natureza extraterrestre e os motivos malévolos tingem as investigações de crueldade. Embora a forma lembre a de um artrópode, mi-gos são de fato um fungo altamente evoluído e inteligente.\n\nNa sociedade mi-go, a busca de conhecimento secular e de epifania religiosa não tem distinção e inspira as empreitadas em conjunto. Veem os Outer Gods e os Great Old Ones menos como deuses a obedecer e mais como musas ou figuras de inspiração. Isso resulta numa mistura estranha de magia e tecnologia que usam para criar itens orgânicos bizarros, cultivados e enxertados tanto quanto fabricados no sentido tradicional.\n\nMi-gos conseguem sobreviver ao vazio do espaço exterior e voar pelo vácuo a velocidades incríveis — embora essas jornadas ainda possam levar meses dentro de um único sistema solar e anos para ir além. Quando chegam a planetas novos para minerar recursos raros em seus mundos natais, usam disfarces espertos que misturam tecnologia e magia para parecer criaturas daquele mundo. Enquanto estão lá, mi-gos escolhem as mentes mais brilhantes do planeta, extraem os cérebros e os preservam como troféus dentro de um cilindro eldritch.",
    "sections": [
      {
        "id": "mi-go-language",
        "title": "Língua Mi-Go",
        "body": "A língua mi-go consiste de pulsações e lampejos de uma ampla gama de cores (algumas das quais não podem ser vistas por humanos) geradas na cabeça de um mi-go. Essa língua pode ser aprendida por outras criaturas, mas elas não conseguem usá-la para \"falar\" com os outros sem o uso de magia de ilusão capaz de gerar a série complexa de cores. Mesmo então, a maioria das criaturas consegue transmitir só noções e conceitos básicos."
      }
    ]
  },
  "creature-vulpinal": {
    "description": "Vulpinals servem como os músicos e menestréis astutos e espertos dos agathions. Incrivelmente de amplo alcance, esses humanoides semelhantes a raposas adoram viajar tanto para aprender quanto para ensinar todas as canções, danças, mitos e tradições que conseguem achar. Embora prefiram viajar sozinhos, vulpinals são extremamente sociáveis com quem encontram nas jornadas. Gostam de participar das festividades das culturas que encontram, e sabe-se que formam pequenos grupos itinerantes de indivíduos de mentalidade semelhante se acreditarem que a expertise compartilhada pode se mostrar benéfica.",
    "sections": [
      {
        "id": "vulpinal-flair",
        "title": "Estilo Vulpinal",
        "body": "Vulpinals bípedes têm cerca de 90 cm de altura, com mãos humanoides garradas e caudas fofas quase tão longas quanto os corpos. Tipicamente aparecem com pelo vermelho, embora líderes ostentem pelagens brancas ou pretas com cinza salpicado pelos focinhos e dorsos. Agathions raposa gostam de usar roupas elegantes, mas funcionais, dos lugares que visitam, muitas vezes enfeitando-se com bugigangas e souvenires pequenos que recolheram pelo caminho."
      }
    ]
  },
  "creature-allosaurus": {
    "description": "O alossauro é um dinossauro bípede enorme feito para caçar presa maior. As pernas são longas e poderosas, e a mandíbula especialmente articulada permite que a boca se abra o bastante para atacar criaturas que se erguem acima deles e para engolir criaturas menores com facilidade assustadora. Os braços curtos terminam em garras afiadas como navalha, e as caudas grossas podem fornecer uma defesa poderosa em varredura na hora do aperto. Ocasionalmente, alossauros vivem e caçam em grupos pequenos, trabalhando juntos para derrubar presa especialmente grande. Porém, preferem permanecer no próprio território, reinando sobre a presa ali dentro. Algumas de suas presas conhecidas incluem o brontossauro, o estegossauro, ou rebanhos inteiros se um alossauro se aproximar demais de terras agrícolas desprotegidas.",
    "sections": [
      {
        "id": "allosaurus-teeth",
        "title": "Dentes de Alossauro",
        "body": "Alossauros têm dentes serrilhados, permitindo-lhes fatiar com mais facilidade a carne de presas grandes ou escorregadias. Esses dentes são valiosos não só pela raridade, mas também pelos múltiplos usos práticos. Dentes maiores de alossauro podem ser feitos em pontas de flecha ou lança, facas pequenas, ou usados como joias para indicar status social. Embora algumas culturas reverenciem esses artefatos, matar alossauros com o propósito expresso de colher os dentes é proibido em muitas regiões por Golarion."
      }
    ]
  },
  "creature-dweomercat": {
    "description": "Dweomercats são felinos de quatro olhos, dotados de magia, vindos do Primeiro Mundo, onde predam outras criaturas e se alimentam de sua energia primordial. Dentro do Primeiro Mundo, formam matilhas que caçam juntas, embora prefiram cuidar dos filhotes por conta própria, criando-os numa dieta de magia e criaturas mágicas. Criaturas curiosas, às vezes são encontradas em áreas do Universo onde o véu para o Primeiro Mundo é tênue ou em regiões onde a magia foi irreparavelmente distorcida. Atraídos pela ressonância mágica única, os dweomercats esperam adquirir fontes incomparáveis de alimento.\n\nOnde avistamentos de dweomercats foram relatados, caçadores especializados aparecem logo depois, na esperança da captura de uma vida. O pelo púrpura-escuro de um dweomercat é cobiçado por colecionadores mágicos, pois os padrões que fluem pelo pelo parecem pintados à mão, com espirais e volutas que lembram runas mágicas. Esses pelames são então exibidos ou incluídos como componentes em rituais raros. Dweomercats são famosos pela habilidade de torcer as cordas metafóricas de magias conjuradas sobre eles ou perto deles, que podem transformar na própria magia defensiva ou usar para se teleportar instantaneamente pelo campo de batalha.",
    "sections": [
      {
        "id": "dweomercat-familiars",
        "title": "Familiares Dweomercat",
        "body": "Conjuradores particularmente poderosos às vezes tomam filhotes jovens de dweomercat como familiares. A independência e a volubilidade, porém, tornam dweomercats aliados um tanto não confiáveis, então nunca se tem certeza se o vínculo com um dweomercat será duradouro ou um caso temporário."
      }
    ]
  },
  "creature-hellcat": {
    "description": "Gatos infernais são predadores astutos nativos dos poços flamejantes do Inferno. Embora as criaturas infernais lembrem smilodontes esqueléticos mortos-vivos, ossos fumegando de calor e pingando sangue fervente, na verdade são prole viva do Inferno cuja carne transparente revela o esqueleto em chamas. Um gato infernal típico tem 2,7 m de comprimento e pesa 450 kg.\n\nDeixados à própria sorte, gatos infernais passam o tempo caçando. Como criaturas infernais, não precisam de sustento mortal, mas devoram a presa pelo puro prazer de infligir dor. Também são bem mais inteligentes do que a maioria assume, e ressentem ser tratados como animais irracionais; quem trata um gato infernal assim pode acabar feito troféu da matilha, pois um gato infernal fará de tudo para coordenar vingança elaborada contra quem não lhes mostrar o respeito devido.\n\nEmbora não possam falar, gatos infernais conhecem Diabólico e podem comunicar-se por telepatia com qualquer criatura capaz de fala. Raramente dizem muito, salvo para sussurrar ameaças e reconhecer as ordens dos mestres diabólicos.\n\nGatos infernais recuam depressa se claramente superados ou diante de oponentes que não conseguem alcançar, mas nunca esquecem a presa que lhes escapa.",
    "sections": [
      {
        "id": "cats-and-dogs",
        "title": "Gatos e Cães",
        "body": "Se há uma coisa mais certa de enfurecer um gato infernal do que ser tratado como um mero animal, é compará-lo de qualquer forma a um cão infernal. Gatos infernais consideram cães infernais pouco mais que vermes infestando as paisagens infernais que chamam de lar e gostam de torturá-los mais do que qualquer outra criatura."
      }
    ]
  },
  "creature-drainberry-bush": {
    "description": "Arbustos de bagas-dreno são arbustos flutuantes originários do Primeiro Mundo, com videiras longas e espinhentas e densos cachos de bagas vermelho-vivas. Os espinhos ocos sifonam sangue depressa, que é como as plantas carnívoras se alimentam, e transformam rapidamente o sangue consumido em novas fornadas de bagas deliciosas. Exalam um brilho branco tênue que resulta de energia vital armazenada.\n\nArbustos de bagas-dreno exibem inteligência incomumente alta e têm um senso astuto de valor. Quando criaturas tentam colher as bagas, em geral se ofendem com a falta de barganha. Criaturas que tentam conversar com arbustos de bagas-dreno descobrem que as plantas transmitem telepaticamente só frases curtas e simples: com mais frequência, “Dinheiro, por favor”, “Bom negócio”, “Negócio não é bom”, “Quero aquilo” (com um gesto na direção de um item que cobiça), “Obrigado, cliente” e, se necessário, “Sem reembolso”. Embora um arbusto de bagas-dreno considere o valor de mercado das bagas 25 po, prefere de longe objetos de arte interessantes como pagamento — mesmo os de valor significativamente menor.",
    "sections": [
      {
        "id": "drainberry-collections",
        "title": "Coleções de Bagas-dreno",
        "body": "Conforme arbustos de bagas-dreno vendem as bagas a outros, coletam moedas e curiosidades pequenas — como um camafeu retratando um nobre fey, uma mecha de cabelo dourado atada num padrão complexo, ou um anel inscrito \"Para minha queridíssima Memdaria.\" Nem todas essas bugigangas têm valor monetário, mas as que não têm certamente tinham valor emocional para o dono original. Ocasionalmente, um arbusto de bagas-dreno aceita mercadorias intangíveis, como odes celebrando a grandeza do arbusto."
      }
    ]
  },
  "creature-brontosaurus": {
    "description": "Brontossauros são beemotes verdadeiramente gigantescos, herbívoros grandes o bastante para não temer senão os predadores mais maciços. Têm corpos robustos e pescoços e caudas longos e sinuosos. Embora os pés possam esmagar prédios inteiros, esses herbívoros em geral prestam atenção em onde pisam.",
    "sections": []
  },
  "creature-tyrannosaurus": {
    "description": "Amplo considerado o rei dos dinossauros, o tiranossauro é um predador maciço com a boca larga cheia de dentes vicentemente afiados. Algumas tribos de gigantes até os treinam como montaria ou bestas de guerra.",
    "sections": []
  },
  "creature-cave-worm": {
    "description": "O mais comum e infame dos vermes das cavernas dá nome à família inteira — um monstro temido que vagueia os túneis retorcidos das Terras Sombrias e é capaz de escavar sistemas de cavernas inteiros. Túnel aberto por um verme das cavernas nem sempre dura muito depois da passagem, e as áreas onde nidificam são labirintos enlouquecedores de passagens que não levam a lugar nenhum; ainda assim, navegar o labirinto até o ninho central muitas vezes rende tesouros incríveis deixados pelas vítimas anteriores.",
    "sections": []
  },
  "creature-magma-worm": {
    "description": "Entre os mais perigosos de seu tipo estão os vermes de magma flamejantes. Além de ainda maiores que os vermes bentônicos, o verme de magma tem predileção por escavar regiões vulcânicas que, ao longo das gerações, infundiram-no com um vínculo sobrenatural com o Plano Elemental do Fogo. O coração em chamas de um vulcão ativo é um covil atraente, assim como os campos vastos de rocha fundida nas profundezas das Terras Sombrias. Lendas de sociedades anãs antigas e colonos dos Planos Elementais povoando fossos de lava com vermes de magma provavelmente têm base na verdade — embora os métodos para manter esses “vermes de fosso” contidos, e impedidos de roer os alicerces da fortaleza, devam ter sido significativos.\n\nVermes de magma às vezes frequentam áreas na superfície onde o vulcanismo cria fontes termais ou outros traços geotérmicos, mas mesmo então preferem passar a maior parte do tempo escavando o solo na busca sem fim por sustento. Terras de superfície reivindicadas por vermes de magma destacam-se pelos montes de toca que deixam para trás ao cavar.",
    "sections": []
  },
  "creature-benthic-worm": {
    "description": "O verme bentônico é uma criatura azul-profundo mais à vontade em túneis alagados do que em cavernas secas. Embora nade bem, prefere esperar emboscado nas paredes, no piso ou até no teto de cavernas inundadas, pronto para saltar contra quem nade por ali. Culturas das Terras Sombrias o odeiam e temem de modo particular: um verme bentônico que fura um túnel muitas vezes traz consigo as águas do rio ou lago submerso que chama de lar. Quando fica óbvio que um verme bentônico está perto de um povoado das Terras Sombrias, os habitantes depressa formam uma partida de caça para lidar com a ameaça antes que traga ruína.",
    "sections": []
  },
  "creature-kraken": {
    "description": "Um kraken é um leviatã enorme, semelhante a uma lula, com inteligência cruel. Caça navios, baleias e heróis. O ódio e a inveja que krakens nutrem pelos alghollthus, seus rivais, levou muitos a fazer covil em cidades submersas, onde peneiram saber antigo e desenterram segredos arcanos há muito perdidos.",
    "sections": [
      {
        "id": "kraken-locations",
        "title": "Locais de Kraken",
        "body": "Um kraken habita fossas oceânicas profundas, cidades submersas, ou cavernas e recifes perto de fontes hidrotermais. Busca alimento perto da superfície, porém, onde pode predar embarcações marítimas."
      },
      {
        "id": "kraken-treasure",
        "title": "Tesouro de Kraken",
        "body": "O tesouro de um kraken inclui o saque de navios perdidos no mar e a riqueza de cidades submersas. Praticamente qualquer coisa pode ser encontrada num covil de kraken, mas eles cobiçam sobretudo pergaminhos, grimórios e outros tomos de saber antigo, bem como gemas e matérias-primas raras encontradas só nas profundezas do oceano."
      }
    ]
  },
  "creature-megalodon": {
    "description": "Tubarões pré-históricos de tamanho, força e ferocidade incríveis, megalodontes varrem águas profundas e rasas para saciar a fome considerável. A presença de um megalodonte afeta de forma inegável o ecossistema aquático local.",
    "sections": []
  },
  "creature-sea-serpent": {
    "description": "Essas feras lendárias lembram cobras imensas com fileiras longas de espinhos com nadadeiras descendo as costas. Temperamentais e territoriais, serpentes marinhas viram um barco com facilidade, e a maioria não hesita em fazê-lo quando faminta ou ameaçada. Abundam histórias de capitães ofendidos que passam a vida inteira caçando o monstro elusivo que afundou o navio e levou o sustento. Essas caçadas dependem de rumores e vislumbres, pois poucos sobrevivem às catástrofes causadas por serpentes marinhas.\n\nEmbora muitos contos de pescador as pintem como guardiãs nomeadas pelos deuses ou como agentes demoníacos, a verdade é que a maioria das serpentes marinhas é simplesmente uma besta muito grande, com talento para evitar detecção mágica.",
    "sections": [
      {
        "id": "shipwreck-lairs",
        "title": "Covis de Naufrágio",
        "body": "Embora uma caverna submersa sirva, serpentes marinhas preferem “construir” covis afundando navios. Uma serpente marinha pode até criar um cemitério submarino maciço ao destroçar vários navios no mesmo local e deixar os destroços se empilharem no fundo do oceano."
      }
    ]
  },
  "creature-giant-flytrap": {
    "description": "Porque se misturam tão bem com a folhagem ao redor, dionéias gigantes usam o elemento surpresa para golpes rápidos contra aventureiros desavisados e viajantes da floresta.",
    "sections": []
  },
  "creature-deadly-mantis": {
    "description": "Esses louva-a-deus gigantescos fazem lar em florestas pré-históricas.",
    "sections": [
      {
        "id": "sacred-insects",
        "title": "Insetos Sagrados",
        "body": "Louva-a-deus mortais são sacrossantos para os seguidores de Achaekek, o Deus Louva-a-deus. Seus adeptos, inclusive os infames assassinos da Louva-a-deus Vermelha, convidam ou atraem louva-a-deus mortais para perto dos assentamentos, vendo as criaturas altíssimas como sinal do favor do deus. Seguidores de Achaekek oferecem sacrifícios de gado ou de inimigos capturados para manter os insetos maciços bem alimentados. Clérigos de Achaekek defendem o território de um louva-a-deus mortal como se fosse o próprio, acreditando que seja solo sagrado."
      }
    ]
  },
  "creature-goliath-spider": {
    "description": "Aranhas golias habitam as selvas mais profundas, onde constroem teias do tamanho de templos e se banqueteiam com presas tão grandes quanto hipopótamos.",
    "sections": []
  },
  "creature-bandersnatch": {
    "description": "Bandersnatches são grandes felinos de seis patas com espinhos vis correndo pelo corpo até a ponta da cauda poderosa. Como outras criaturas lendárias do Primeiro Mundo — o jabberwock, por exemplo — pertencem ao grupo infame conhecido coletivamente como os “Tane”. Esses caçadores aterradores se deleitam em abater outros predadores mortais ou inteligentes, adaptando-se perfeitamente a qualquer ambiente. Um bandersnatch espreita a presa antes de atacar com velocidade e ferocidade. Quem sobrevive confirma: embora presas e garras sejam mortais, os olhos são a arma maior. Os olhos do bandersnatch mudam o tempo todo de cor, intensidade e desenho, fazendo quem recebe o olhar cair em pânico confuso.",
    "sections": [
      {
        "id": "rare-hunters",
        "title": "Caçadores Raros",
        "body": "Embora um bandersnatch possa viver por milhares de anos, uma fêmea só se torna fértil uma ou duas vezes por século. Se conseguirem encontrar um parceiro, darão à luz apenas um ou dois filhotes por ninhada. A mãe só protege os jovens por um ano, depois do qual são deixados para crescer e caçar por conta própria. Bandersnatches também já foram vistos caçando os próprios se se aproximarem demais. Todos esses fatores levam a uma população muito pequena."
      }
    ]
  },
  "creature-banshee": {
    "description": "Banshees são as almas furiosas e atormentadas de quem ficou preso ao mundo por uma traição que definiu as horas finais da vida. Algumas surgem de quem foi morto por amigos e aliados de confiança, ou de quem foi traído no leito de morte por quem amava. Outras nascem de quem, pouco antes de morrer, cometeu atos traiçoeiros que mancharam a alma. Seja qual for a origem, banshees desprezam os vivos. Esse ódio à vida muitas vezes é uma inversão horrenda da personalidade em vida. Alguns especulam: quanto mais bondosa a pessoa (e mais dilacerante a traição), mais cruel a banshee.\n\nRaramente se afastam de onde pereceram e em geral assombram florestas densas e pântanos cobertos onde pouca luz toca o chão. Muitas banshees são elfas e podem ser encontradas na nação élfica de Kyonin, especificamente em Tanglebriar, o domínio sinistro do demônio Treerazer. Da mesma forma, um número grande espreita os ermos congelados do norte de Avistão, criadas por uma traição cruel e ampla de séculos atrás.",
    "sections": [
      {
        "id": "born-from-tragedy",
        "title": "Nascidas da Tragédia",
        "body": "A banshee representa um dos mortos-vivos mais trágicos: uma alma tão dilacerada de agonia e fúria por uma traição em vida que, na morte, permanece como um grande mal. O fato de a maioria das que se tornam banshees não ter sido má em vida só aprofunda esse tema trágico, e muitos aventureiros elfos veem como dever não só pôr banshees para descansar, mas também reparar o erro que as criou."
      }
    ]
  },
  "creature-lich": {
    "description": "Um mago cujo desejo insaciável de poder arcano eclipsou a vida mortal: o lich é um conjurador verdadeiramente astuto e versátil.",
    "sections": []
  },
  "creature-graveknight": {
    "description": "Cavaleiros da tumba são guerreiros mortos-vivos a quem uma armadura amaldiçoada concedeu a não-vida.",
    "sections": []
  },
  "creature-mummy-pharaoh": {
    "description": "Enquanto guardiões múmia são mortos-vivos feitos dos cadáveres de sacrificados — em geral vítimas relutantes — e retêm só fragmentos de memória, um faraó múmia resulta do abraço deliberado da morte-viva por um governante sádico e cruel. A transformação de vida em não-vida sob a areia escaldante do deserto é só um pouco menos horrenda, mas como a transição é uma aposta intencional para escapar da morte por uma personalidade poderosa que abraça por completo as repercussões blasfemas da escolha, o faraó múmia retém memórias e personalidade intactas.",
    "sections": []
  },
  "creature-grim-reaper": {
    "description": "O Ceifador Sombrio é a personificação inflexível da morte. Silencioso como a sepultura e inevitável como o tempo, esse ser lendário caça e acaba com criaturas que evadiram a morte por tempo demais. Às vezes chega sem aviso; outras, para terminar o trabalho que outras criaturas não conseguiram. Não serve a deus, capeta ou aeon. Psicopompos e celestiais o desprezam e temem, mas poucos — se algum — ousam atravessar-se no caminho. Como uma praga eterna, mata quem tenta curar o multiverso de sua presença. Permanece só e ouve só o próprio conselho; súplicas e raciocínios de mortais e imortais caem em ouvidos moucos uma vez que o Ceifador se fecha sobre a presa. O próprio raciocínio é silencioso aos ouvidos mortais e inescrutável à mente mortal, mas o resultado é inflexível e final.\n\nAlgumas lendas dizem que o Ceifador Sombrio aparece diante de todos na hora da morte; a verdade é bem mais perturbadora. Tais vigílias pertencem aos psicopompos, imortais encarregados de proteger e guiar almas mortais pelo além. O Ceifador tem pouco interesse em proteger ou guiar almas. É impelido por agendas sinistras que surgem no reino noturno de Abaddon, onde governam os Cavaleiros do Apocalipse. Há muitas semelhanças de forma entre o Ceifador e Caronte, o Cavaleiro da Morte, mas não há registro dos dois trabalharem juntos. Em vez disso, o Ceifador serve como uma espécie de manifestação de Abaddon e, nesse sentido, alguns acreditam ser uma encarnação do misterioso Primeiro Cavaleiro. Quando vem a um mundo, não vem como anjo de misericórdia, e sim como ceifador implacável de vida. Quem cai diante dele não estava destinado a morrer tanto quanto foi selecionado, caçado e assassinado.\n\nTalvez as lendas mais assustadoras digam respeito à natureza como entidade singular: alguns acreditam que existe mais de um ceifador sombrio no Grande Além. Esses sussurros falam de um cabal de pelo menos nove dessas criaturas que espreitam a realidade, ceifando os vivos como servos inexplicáveis da entropia verdadeira. Segundo certos cultos da morte, a meta final do Ceifador Sombrio é encerrar o ciclo inteiro de vida e morte e servir como senhor silencioso de um universo vazio.",
    "sections": []
  },
  "creature-lesser-death": {
    "description": "Ninguém tem certeza do que são as mortes menores, embora alguns afirmem que são avatares do Ceifador Sombrio. Diferente daquele caçador estranho, porém, mortes menores caçam em matilha em ocasiões raras. Com mais frequência, manifestam-se de itens mágicos amaldiçoados. Outras vezes, são simplesmente os executores da morte, caçando do mesmo jeito que o Ceifador Sombrio — em silêncio, sem remorso nem quartel. Raramente, várias mortes menores trabalham juntas para ceifar uma população grande, as foices cortando multidões e deixando cidades inteiras sem vida, inspirando rumores (espera-se falsos) de múltiplos Ceifadores Sombrios.",
    "sections": []
  },
  "creature-skulltaker": {
    "description": "Descendo de picos enevoados e através de desfiladeiros uivantes como um vento mau, o vórtice de ossos conhecido como colhedor de crânios é uma manifestação terrível do delírio e da agonia experimentados por alpinistas condenados e desbravadores perdidos pouco antes do fim. Em alguns lugares, um colhedor de crânios também é conhecido como saxra.",
    "sections": [
      {
        "id": "skulltaker-insight",
        "title": "Perspicácia do Colhedor de Crânios",
        "body": "A cooperação de um colhedor de crânios é um trunfo poderoso, pois essa massa rodopiante de morte retém as memórias coletivas das criaturas cujos ossos formam o corpo. Como viajantes das montanhas vêm de perto e de longe, o saber de um colhedor de crânios muitas vezes é vasto, abrangendo uma gama de tópicos."
      }
    ]
  },
  "creature-dybbuk": {
    "description": "Os espíritos descorporificados chamados dybbuks surgem de almas a quem foi negado o descanso no além, muitas vezes porque cometeram alguma grande transgressão em vida. Diz-se que esses espíritos se agarram à vida possuindo vítimas para escapar do castigo que as espera. Só aprisionando, intimidando ou destruindo tais espíritos um mortal pode esperar afastá-los.\n\nDybbuks, que com mais frequência são espíritos de homens, escondem-se nas vítimas possuídas. Os alvos em geral são mulheres jovens na véspera do casamento, o que pode ser visto como presságio de um par malajustado, sobretudo em casamentos arranjados. Vítimas masculinas e não-binárias também existem, em menor quantidade, e também muitas vezes na véspera de um casamento conturbado. Ninguém sabe ao certo por que dybbuks são atraídos a tais situações, embora possa ser porque a alma transgressora busca trazer caos aos aspectos mais rigidamente regimentados da sociedade.\n\nUma vítima possuída por um dybbuk pode ser barulhenta e grosseira, recusar comida e bebida, praticar atos profanos ou de outro modo agitar a casa. A vítima não tem memória desses eventos depois que a posse termina.\n\nCertas classes de sacerdotes especialmente treinados podem expulsar dybbuks por exorcismo. Em geral isso usa uma metodologia que combina fumaça, o toque de um chifre de carneiro e a recitação de versos sagrados. Exorcismos, porém, são extremamente difíceis e perigosos, e exigem grande conhecimento e habilidade do sacerdote por causa do poder desses espíritos malevolentes.",
    "sections": [
      {
        "id": "cruel-puppet-masters",
        "title": "Mestres de Marionetes Cruéis",
        "body": "Dybbuks se deleitam em enganar mortais e usar as habilidades telecinéticas para semear medo no coração de quem está ao redor. Criam o caos nas casas das vítimas usando as habilidades mágicas inatas. Vítimas possuídas por dybbuks muitas vezes são controladas indefinidamente, até o dybbuk se entediar delas ou até alguma alma corajosa achar um jeito de libertar a vítima do tormento."
      }
    ]
  },
  "creature-phoenix": {
    "description": "A fênix é uma ave primordial feita de calor e chama que habita as regiões mais inóspitas do deserto. Embora altamente inteligente e em geral transbordando de compaixão, fênix são mais conhecidas pela habilidade icônica de ressuscitar quando abatidas, emergindo reborn das cinzas do próprio cadáver. Muitas vezes são procuradas pelo conhecimento de habilidades de cura, pois não suportam a visão do sofrimento e negam o socorro só às criaturas mais vis e irredimíveis.\n\nFênix apreciam a companhia de dragões pacíficos, e os dois podem forjar amizades para a vida, mantendo-se atualizados sobre as notícias da região.\n\nEmbora a maioria seja benevolente, não são infalíveis. Quando uma fênix perde o rumo, ainda retém o apetite forte por conhecimento. Fênix malevolentes são conhecidas por assaltar universidades e bibliotecas na busca de poder — não só para ganhar informação nova, mas também para incendiar os textos e assim acumular esse saber só para si.",
    "sections": [
      {
        "id": "servants-of-sarenrae",
        "title": "Servos de Sarenrae",
        "body": "Embora fênix não sejam habitantes dos Planos Exteriores, há muito se associam à deusa Sarenrae. De fato, muitas fênix veem a Flor da Alvorada como patrona e aderem à missão dela de redimir os que sucumbiram ao mal."
      }
    ]
  },
  "creature-norn": {
    "description": "No Universo mortal, alguns mortais adoram norns como deidades; outros, sobretudo bruxas e bardos, as admiram como patronas ou musas. Quem as eleva a deidades é conhecido como Seguidores do Destino. Norns nem desencorajam essa veneração nem se esforçam para apoiá-la. Clérigos que veneram norns podem adorar uma norn específica, um triunvirato, ou todas as norns como um todo, mas ganham os mesmos benefícios independentemente da escolha. O símbolo religioso dos Seguidores do Destino é um par de tesouras cortando um fio dourado, e suas áreas de preocupação são destino, fado e o processo de envelhecer.",
    "sections": []
  },
  "creature-cloud-giant": {
    "description": "Os graciosos e régios gigantes das nuvens são facciosos: mais ou menos metade dos clãs acredita que deveriam governar humanoides independentemente do tamanho, e o resto se esquiva de qualquer contato com forasteiros. Por causa da distância física e ideológica entre clãs, a maioria recorre a mensageiros águia gigante ou roc para arranjar casamentos e trocar arte sem pôr o pé no território uns dos outros.\n\nA cor da pele vai do branco leitoso ao azul em pó. Fazem lar em qualquer lugar velado por nuvens — em geral cumes ou vales isolados, mas ocasionalmente pântanos enevoados ou florestas tropicais nubladas. Persistem lendas de cidades flutuantes governadas por rainhas e reis gigantes das nuvens dotados de magia. A maioria dos gigantes das nuvens afirma claramente que tais alegações são pura fantasia; outros ficam misteriosamente calados ou evasivos sobre o assunto.",
    "sections": []
  },
  "creature-fire-giant": {
    "description": "Os mais militaristas dos gigantes, gigantes do fogo focam obsessivamente em aprender técnicas de combate, dominar as artes de forjar armas e armaduras, e achar novos jeitos de dominar inimigos. A maioria das comunidades é construída em torno de fendas elementais, fontes termais ou caldeiras vulcânicas e não se move com facilidade, inspirando defesa inabalável contra qualquer invasor. Como resultado, as estruturas sociais e políticas estão firmemente ancoradas em hierarquias marciais, com ênfase estrita em seguir as ordens do superior.\n\nAssim que um gigante do fogo consegue andar, recebe a primeira armadura forjada. Essa armadura é constantemente remoldada e substituída à medida que o gigante amadurece. Além do que forjam nas fornalhas vulcânicas, também buscam amansar dinossauros, dracos e cães infernais como ferramentas de guerra.\n\nEm geral são identificados pela estatura poderosa e pelo cabelo laranja-brilhante que treme e dança como se em chamas. Um gigante do fogo típico tem cerca de 4,2 m, pesa em torno de 3.200 kg e vive até os 350 anos.",
    "sections": []
  },
  "creature-rune-giant": {
    "description": "Gigantes das runas são tiranos entre os próprios, dotados de poder para comandar e controlar magicamente outros gigantes. Um dia serviram mestres ainda mais poderosos — magos potentes conhecidos como runelords — e, ao fazê-lo, comandaram exércitos inteiros de gigantes a serviço dos impérios dos runelords.\n\nNos éons desde o colapso desses impérios, gigantes das runas persistiram, embora para o mundo exterior sejam pouco mais que horrores lendários. Em geral habitam as cadeias montanhosas mais remotas e acidentadas, mas também podem ser encontrados em ruínas imensas sobre ilhas perdidas, vales glaciais ou regiões ainda mais remotas ou mágicas.\n\nDezenas de runas decoram a carne carvão marcante. São criaturas altíssimas, em média 12 m de altura e 11.000 kg.",
    "sections": [
      {
        "id": "the-first-rune-giants",
        "title": "Os Primeiros Gigantes das Runas",
        "body": "Em Golarion, os primeiros gigantes das runas foram criados pelos governantes poderosos da antiga nação de Thassilon. Os senhores das runas concederam aos gigantes das runas a habilidade de controlar outros gigantes, usando-os para comandar exércitos de construtores e soldados descomunais para criar e defender estruturas descomunais."
      }
    ]
  },
  "creature-shadow-giant": {
    "description": "Gigantes das sombras são nativos do Submundo, onde habitam o crepúsculo perpétuo há milênios. Vivem em grupos familiares e mantêm um modo de vida nômade, percorrendo terras ancestrais entre florestas sombrias e abismos enevoados. Esses caçadores-coletores passam o saber por histórias orais, fazem peregrinações a zigurates ímpios de pedra negra e banham-se no sangue de inimigos de longa data, inclusive clãs rivais de gigantes das sombras e capetas do Submundo empenhados em escravizá-los.\n\nCom 4,5 m de altura, pele cinza e cabelo só um tom mais claro, gigantes das sombras são inimigos temíveis, com reputação bem merecida de belicistas zelosos e combatentes impiedosos. Raramente interagem com forasteiros, embora possam tratar com guerreiros comprovados que mostrem o respeito e a deferência que sentem merecer.",
    "sections": []
  },
  "creature-great-cyclops": {
    "description": "Solitários gigantescos, os grandes ciclopes são os parentes menores em escala maior. São mais fortes e mais violentos, mas a visão descontrolada de futuros possíveis os empurrou para além da razão. Veem cada instante como uma tempestade potencial de fúria incontrolável e, num desejo desesperado de paz, silêncio e fim da fome, atacam quem se aproxima. Criaturas sábias evitam grandes ciclopes a qualquer custo. É sorte para humanoides que prefiram habitar longe de povoados.\n\nO debate sobre a origem desses gigantes maciços e destrutivos dura há muito. São tão grandes que por muito tempo se assumiu que os parentes menores os usavam como bestas de carga, agora livres para caçar e matar sem freio. Outros eruditos acreditam que o grande ciclope é o destino final de toda a espécie. Qualquer decisão tola ou maldição desgarrada que causou o fim da civilização ainda se desenrola, ocasionalmente fazendo um ciclope retirar-se dos seus, perder todo vestígio de intelecto e mutar-se num colosso feral e desajeitado.",
    "sections": [
      {
        "id": "cyclops-seers",
        "title": "Videntes Ciclopes",
        "body": "Grandes ciclopes são tradicionalmente criaturas violentas, mas alguns retêm fragmentos dos modos antigos que os embalam em períodos de calma. Nesses momentos, podem ser fontes incríveis de informação, mas é preciso ter o cuidado de estar bem longe do covil do grande ciclope antes que a fúria bestial desperte outra vez."
      }
    ]
  },
  "creature-crag-linnorm": {
    "description": "Embora esteja entre os linnorms mais fracos, o linnorm do rochedo é um predador devastador, capaz de cozinhar depressa os inimigos com o sopro de magma.",
    "sections": []
  },
  "creature-tarn-linnorm": {
    "description": "Embora existam linnorms mais poderosos, o linnorm do lago de múltiplas cabeças pode causar uma devastação de inspirar assombro.",
    "sections": []
  },
  "creature-gogiteth": {
    "description": "Um gogiteth é um pesadelo babante de dentes, olhos e pernas peludas de aranha, e a aparência fica invariavelmente gravada na mente de quem o testemunha. Colmeias desses monstros que se esgueiram assombram os trechos mais baixos das Terras Sombrias, competindo com vermes das cavernas e outros horrores subterrâneos por comida e recursos. Um gogiteth raramente está só: aprenderam que o melhor meio de sobrevivência é ficar com outros do próprio tipo. Até os habitantes mais resistentes das Terras Sombrias buscam abrigo quando um gogiteth é avistado, pois onde há um, um enxame está para seguir.\n\nGogiteths fazem um estalo ao se esgueirar. As juntas das muitas pernas estalam a cada movimento, embora possam suprimir isso voluntariamente e caçar em silêncio. Também podem emitir um assobio agudo que ecoa pelas cavernas. Alguns nativos relatam que grupos de gogiteths às vezes se unem em canções estranhas e dissonantes.\n\nA anatomia inspirou especulação sobre as origens. Alguns acreditam que são o resultado de um experimento de deformação de carne que deu horrivelmente errado. Outros pensam que podem estar relacionados de algum modo ao Domínio do Negro — possivelmente primos distantes ou algum exílio estranho dessas entidades alienígenas. Segundo esse mito, uma vez que chegaram a Golarion, os gogiteths rastejaram para as profundezas da terra, recuando do sol abrasador acima.\n\nGogiteths são uma ameaça a todo outro denizen das Terras Sombrias. Quem vive em regiões infestadas de Sekamina ou Orv frequentemente pede tréguas temporárias quando um enxame de gogiteths é avistado. Como até uma colmeia média pode abrigar até duas dúzias dos horrores, chamados para erradicá-los são missões de fato perigosas.",
    "sections": [
      {
        "id": "great-gogiteths",
        "title": "Grandes Gogiteths",
        "body": "Por mais mortais que os gogiteths sejam, persistem rumores de ameaças ainda mais aterradoras conhecidas como grandes gogiteths. Diz-se que têm quase 30 m de ponta a ponta e são capazes de gerar as próprias hordas de gogiteths em reação a um ataque; grandes gogiteths também têm fama de inteligência incomum. Os rumores afirmam que grandes gogiteths se contentam em grande parte em espreitar nas cavernas profundas e remotas, passando eras sonhando com sadismo e violência."
      }
    ]
  },
  "creature-grikkitog": {
    "description": "Grikkitogs, também conhecidos como a “terra faminta”, são parasitas estranhos do Plano da Terra que infestam terra, rocha e pedra para alimentar a fome sem fim. Um grikkitog jovem é uma aparição sem forma até corromper um hospedeiro elemental da terra, formando o núcleo. Um grikkitog pode então possuir a terra e a pedra próximas com a essência voraz, formando goelas e olhos por toda parte. Essas criaturas podem ser particularmente perigosas para criaturas pequenas que fazem covil nas fendas entre rochas, bem como para alpinistas em busca do apoio perfeito para a mão.",
    "sections": [
      {
        "id": "grikkitog-origins",
        "title": "Origens dos Grikkitogs",
        "body": "Grikkitogs muitas vezes figuram como bichos-papões em histórias assustadoras contadas por habitantes do Plano da Terra. Quem se lembra das guerras entre os senhores elementais acredita que o primeiro grikkitog foi criado como arma experimental por Ayrzul, o Rei Fossilizado do Plano Elemental da Terra. Porém o senhor elemental maligno não percebeu o poder bruto de sua criação. A fome do grikkitog cresceu tão voraz que ele escapou do confinamento, infestou um guardião elemental da terra e começou a se espalhar pelos planos. Agora grikkitogs escavam por todo o Universo, devorando os desavisados."
      }
    ]
  },
  "creature-mukradi": {
    "description": "Criaturas temíveis semelhantes a centopeias, mukradis são predadores de três cabeças com um arsenal devastador de jeitos de matar, queimar e desmembrar. Rumores falam de uma versão que habita as Terras Sombrias. Diz-se que esses mukradis variantes têm escamas negras, e todas as cabeças cospem um gosma ácida negra que se anima antes de ser reabsorvida.",
    "sections": [
      {
        "id": "from-a-god-s-nightmares",
        "title": "Dos Pesadelos de um Deus",
        "body": "Rumores dizem que os primeiros mukradis nasceram nos pesadelos febris de um semideus adormecido de uma dimensão além dos sonhos, que pereceu quando os primeiros mukradis esvaziaram a mente inconsciente e usaram a carne para transitar ao reino mortal. Essa lenda provavelmente não passa de fantasia, mas certamente fala da natureza mortal desses monstros imensos."
      }
    ]
  },
  "creature-guthallath": {
    "description": "Um guthallath é um construto enorme criado há muito, provavelmente como máquina de guerra, por um império há muito esquecido. Com quase 30 m de altura, essa estátua maciça de pedra em geral lembra um guerreiro robusto vestindo só um pano e um casquete. Poucos viram o corpo inteiro de um guthallath; na maior parte do tempo, a relíquia está enterrada até o pescoço, coberta de musgo e encalhada num lugar esquecido. Ainda assim, de vez em quando um desses arautos da destruição se reativa em resposta a algum estímulo desconhecido ou chamado de reunião, e quando isso acontece, ai de quem se interpuser.\n\nEmbora os inimigos antigos do guthallath provavelmente já tenham ido, ainda é um motor de destruição pura, feito para arrasar por semanas, até meses. Não é inteligente o bastante para gozar ou lamentar os atos e não pode ser convencido — também é imune à maior parte da magia e imprevisível em como escolhe os alvos (e as criaturas que poupa).",
    "sections": [
      {
        "id": "guthallath-slumber",
        "title": "O Sono do Guthallath",
        "body": "Civilizações inteiras foram apagadas devido à investida devastadora do guthallath. Ainda assim, para quem busca sobreviver ao ataque, há uma pequena esperança. Em geral, depois de algum tempo, o guthallath encerra o massacre de forma rápida, porém aparentemente aleatória. O colosso então acha um local remoto no fundo da natureza selvagem e se enterra, entrando num sono profundo por anos — se não séculos — antes de despertar e recomeçar o ciclo destrutivo."
      }
    ]
  },
  "creature-ofalth": {
    "description": "Ofalths adultos capturam vítimas e as comem vivas, devagar.",
    "sections": []
  },
  "creature-vescavor-queen": {
    "description": "Uma rainha vescavor é uma visão horrenda. Como os enxames, lembra uma vespa verde ácida, mas o abdômen está anormalmente inchado e coberto de espinhos que vazam ácido; a boca ocupa a maior parte do rosto e está cheia de dentes grandes e retorcidos, cada um do tamanho de um dedo humano. Possui só um par de braços, cada um do comprimento do corpo inteiro mas anormalmente dobrado e mantido perto, e os cinco pares de asas estão empilhados de um jeito antinatural que tornaria o voo impossível para qualquer criatura natural. Essas rainhas garantem que os enxames nunca terminem a marcha medonha rumo a onde houver comida. Não só criam enxames vescavor aos poucos, como também podem fazer enxames existentes dobrarem de número num instante. Esses enxames fortalecidos também são abençoados com vigor e velocidade aumentados. Além disso, o cuspe ácido da rainha está impregnado de feromônios que enlouquecem os enxames, o que ela usa para direcioná-los a alvos prioritários.\n\nOcasionalmente, um capeta poderoso captura uma rainha vescavor e a usa para criar enxames num ambiente controlado. Porém, a prática foi depressa abandonada. Por todo o dano que esses enxames possam causar aos inimigos de um mestre capeta, raramente vale o custo de manter a rainha e os enxames infinitos de filhos alimentados e sob controle. Até manter a rainha num lugar só pode ser caro e difícil: é quase impossível achar uma jaula da qual uma rainha não consiga comer a saída, dado tempo suficiente.",
    "sections": []
  },
  "creature-astradaemon": {
    "description": "Esses daemons inquietantes representam a morte por ataque direto contra uma alma ou força vital. Raramente vistos no Universo mortal, astradaemons passam a maior parte do tempo caçando os caminhos entre o mundo dos vivos e o além. Ali capturam almas migratórias, arrancando-as das recompensas ou punições devidas e arrastando-as a Abaddon como tributo aos mestres imortais. Esses predadores horrendos dos mortos também podem ser encontrados espreitando as margens do Rio das Almas no Plano Astral, onde caçam sem parar novas vítimas.",
    "sections": []
  },
  "creature-venedaemon": {
    "description": "Quem foi morto por magia ou morto na busca da magia pode surgir como venedaemon. Embora estejam entre os daemons mais fracos, essas figuras enroupadas muitas vezes servem de pesquisadores ou escrivães por todo o plano. Mesmo no Universo mortal, eruditos barganham almas ou saber arcano com venedaemons por seus segredos e auxílio.",
    "sections": []
  },
  "creature-shemhazian": {
    "description": "Shemhazians surgem das almas de torturadores e de quem se deleitava em mutilar os corpos físicos das vítimas. Com 10,5 m de altura, um shemhazian está bem equipado com uma gama de garras, pinças e presas para continuar infligindo tais tormentos em quem encontra.\n\nShemhazians se deleitam em atormentar mortais, claro, mas mais do que a maioria dos demônios, gozam de dividir a dor com os próprios. Outros demônios os temem e odeiam por isso, e só os mais poderosos estão dispostos a trabalhar com um shemhazian para uma meta compartilhada. Mesmo então, o shemhazian está sempre atento a uma oportunidade de trazer dor e sofrimento aos aliados junto com qualquer inimigo.",
    "sections": []
  },
  "creature-gylou": {
    "description": "Embora gylous estejam profundamente enraizadas nas maquinações expansivas e complexas do Inferno, são agentes altamente hábeis, capazes de diplomacia nuançada, engano magistral, finura física e quase qualquer outra tarefa a que se proponham. Essa versatilidade as tornou difundidas em todas as camadas do Inferno, permitindo filtrar informação-chave aos mestres sobre os planos e esquemas de outros diabos. A lealdade não é segredo, mas as habilidades são tão grandes que diabos poderosos empregam uma ou mais gylous mesmo assim. Embora a maioria tenha forma feminina (combinada com o papel, essa é a origem do apelido comum de “dama de companhia”), algumas têm outras apresentações de gênero, e quase todas assumem ilusões cuidadosamente cultivadas para melhor servir os papéis que preenchem. Com mais frequência, gylous surgem quando diabos menores que demonstraram utilidade excepcional e habilidades inestimáveis são elevados a uma forma nova, embora em ocasiões raras sejam moldadas das almas de mortais maus que mostraram desenvoltura ímpar em empreendimentos burocráticos.",
    "sections": []
  },
  "creature-augnagar": {
    "description": "Os brutos e glutões augnagars vivem para banquetear-se — de preferência com carne podre e, quando possível, carne de demônio. Mas para eles a iguaria maior é a carne de outros augnagars. Têm pernas inchadas semelhantes a aranha com membranas coriáceas como asas de morcego, e três caudas que terminam em ferrões de gancho perfeitos para fatiar carne.\n\nUm augnagar que se empanturra o bastante, sobretudo de outros augnagars, pode crescer tão maciço que nem se move, debaten­do-se e apodrecendo onde jaz. Acaba entrando em frenesi de autocanibalismo, rasgando a própria carne para se banquetear. Dos restos ruinosos emerge um thulgant — um qlippoth menor, mas mais poderoso.",
    "sections": []
  },
  "creature-akhana": {
    "description": "Akhanas são olhos maciços formados de matéria cósmica que monitoram o equilíbrio de nascimento e morte. Entendem a influência profunda que os seres vivos têm no cosmos e executam em silêncio os deveres de sustentar e podar a vida. Parecem totalmente despreocupadas com o destino das almas após a morte, muitas vezes deixando mortos-vivos no rastro ou atraindo daemons necrófagos. Psicopompos muitas vezes se desesperam com as ações crípticas das akhanas, forçados a limpar atrasos súbitos de almas ou até a batalhar os aeons diretamente. A “cauda” é uma coluna retorcida de energia cósmica que pode drenar vitalidade das criaturas e selar o destino delas.",
    "sections": []
  },
  "creature-pleroma": {
    "description": "Entre os mais poderosos de todos os aeons verdadeiros, pleromas são a manifestação máxima da dualidade de criação e destruição. A manifestação física é um estado constante de fluxo entre esses dois extremos; as formas estão drapejadas num manto encapuzado, variável, de noite negra onde galáxias e outros objetos celestes aparecem e desaparecem a cada instante, como se retratassem a vida, a morte e o renascimento constantes de um universo minúsculo e autocontido.\n\nPleromas veem o multiverso como eterno e cíclico, condenado e maleável, terminando só se esses ciclos se desequilibrarem. Acreditam que a Convergência atual é necessária para obter esse equilíbrio essencial, e agem para garantir que o grande desenho da Mônada seja cumprido até o menor detalhe.",
    "sections": []
  },
  "creature-yamaraj": {
    "description": "Os maiores juízes entre os psicopompos são os yamarajes, cuja sabedoria é lendária e cujos éditos são inapeláveis salvo a ushers ou à própria Pharasma. Um yamaraj lembra um dragão imenso com escamas escuras e emplumadas e um olhar sem emoção, desapaixonado, atrás de uma máscara emplumada. Quando não servem de magistrados seniores, senhores e generais do Ossário, yamarajes perseguem passatempos altamente individualistas, como jardinagem ou literatura.",
    "sections": []
  },
  "creature-morrigna": {
    "description": "Caçadoras de recompensa e investigadoras, morrignas buscam criaturas que frustram a morte ou interferem no fluxo natural das almas. Vestem-se de seda de aranha fluida e usam máscaras que lembram teias, pois consideram as aranhas pacientes e vigilantes suas parentes espirituais.",
    "sections": []
  },
  "creature-keketar": {
    "description": "A casta governante dos proteanos, keketars orquestram ataques contra os bastiões da lei e julgam disputas proteanas com confiança e capricho. Um keketar lembra uma criatura serpentiforme cintilante com espinhos, garras e uma cabeça de dragão. A aparência real está em fluxo constante, mas em geral ficam com cerca de 5,4 m de comprimento e uns 680 kg. Embora as formas físicas variem, duas coisas permanecem constantes: primeiro, os olhos de um keketar são sempre um tom penetrante de âmbar ou violeta. Segundo, a marca de ofício — uma coroa de símbolos mutáveis que flutua sobre a cabeça — nunca muda. Um keketar não pode remover a coroa, mas pode suprimi-la, embora a maioria relute e considere tal ato covardia ou vergonha.\n\nKeketars preenchem um papel na sociedade proteana semelhante a um sacerdócio, operando como intermediários entre os outros proteanos e os Falantes das Profundezas. Todos os outros proteanos deferem aos keketars, tratando-os de um jeito semelhante a como cidadãos de uma cidade mortal tratariam nobres respeitados; até proteanos mais poderosos deferem à vontade dos keketars. Como em muitas religiões, dogma e teologia estão sujeitos a interpretação e mudança, e entre os proteanos a situação é ainda mais pronunciada. Seja qual for a natureza e os desejos dos Falantes das Profundezas, keketars individuais muitas vezes chegam a conclusões dramaticamente diferentes quanto à vontade e à intenção. Para os proteanos, porém, essa dissonância inerente é uma força, não uma fraqueza.",
    "sections": []
  },
  "creature-irnakurse": {
    "description": "Acredita-se que irnakurses sejam elfos submetidos a práticas de deformação de carne particularmente cruéis e humilhantes, embora estejam tão corrompidos pela transformação que é quase impossível dizer. O processo de forjar um irnakurse torce o elfo infeliz numa massa de membros deslocados, carne frouxa e protuberâncias ósseas — partes que deveriam ser internas muitas vezes ficam em plena exibição. Esses seres periodicamente rastejam à superfície das profundezas das Terras Sombrias, levando alguns eruditos élficos à suspeita macabra de que são remanescentes dos elfos que viajaram para o subterrâneo a fim de escapar da Queda da Terra.",
    "sections": []
  },
  "creature-aolaz": {
    "description": "Aolazes são grandes bestas esculpidas de pedra e metal e magicamente imbuídas da essência da vida. O meio exato de criação é um segredo há muito perdido, e são tão raros que eruditos têm pouca oportunidade de estudar espécimes ativos. Os aolazes mais conhecidos são peças de museu ou relíquias de campo de batalha destruídas ou desativadas séculos atrás, embora registros fragmentados sugiram que muitos mais foram feitos e talvez permaneçam, ainda por desenterrar.\n\nA maioria dos aolazes é construída na forma de grandes bestas terrestres, como elefantes, rinocerontes ou dinossauros. Independentemente da criatura específica que um aolaz foi construído para lembrar, não está preso a andar a terra como as inspirações — é imbuído da habilidade mágica de perseguir pela água e até pelo ar. Poucos escapam da ira de um aolaz uma vez que ela é ganha.",
    "sections": [
      {
        "id": "jistkan-behemoths",
        "title": "Beemotes Jistkanos",
        "body": "Há milhares de anos, o Império de Jistka dominou a arte da criação de construtos, e o aolaz representa o auge de seu ofício. Os jistkanos usavam magia primal para infundir nos construtos espíritos da natureza. Porém, quando os criadores jistkanos se voltaram aos Planos Exteriores — e aos capetas em particular — como fonte para impulsionar construtos ainda maiores, orquestraram sem saber a própria ruína."
      }
    ]
  },
  "creature-aeolaeka": {
    "description": "Aeolaekas, também conhecidas como azatas de pedra, encarnam a alegria da pedra esculpida por mãos de artistas ou por forças naturais. Pedra muitas vezes é pensada como firme e imutável, mas, vista numa escala maior ao longo de vastos períodos, pode transformar-se em coisas tão diversas quanto cristais intricados e pó fino. Aeolaekas são fascinadas pelas mudanças graduais encontradas na pedra, da areia aos diamantes aos fósseis às montanhas altaneiras.\n\nComo resultado da afinidade com a pedra, aeolaekas parecem menos caprichosas que outras azatas — embora isso se deva sobretudo a agirem numa escala geológica diferente — e algumas forjaram de bom grado acordos duradouros com mortais. Muitas vezes visitam o Plano da Terra, lutando contra elementais da terra maus, juntando-se a festivais jabali ou simplesmente vagando pelas veias e túneis daquele reino enquanto se banham em suas maravilhas pétreas. A pele de pedra faz com que às vezes sejam tomadas por estátuas; usam esse fato para se esconder à vista de todos quando não querem que a presença seja conhecida.",
    "sections": []
  },
  "creature-gigantopithecus": {
    "description": "Esses parentes ferozes dos orangotangos são três vezes mais pesados que um gorila.",
    "sections": []
  },
  "creature-warsworn": {
    "description": "Um jurado de guerra é uma massa animada de cadáveres composta de dezenas, às vezes até centenas, de vítimas de batalha. São formados por deidades da morte-viva ou da guerra ou, raramente, manifestam-se espontaneamente da devastação de uma batalha especialmente horrenda.",
    "sections": [
      {
        "id": "alternate-warsworns",
        "title": "Jurados de Guerra Alternativos",
        "body": "Embora seja única em seu horror, a guerra não é a única tragédia que pode levar a mortes em massa. Outras formas de mortos-vivos em massa, semelhantes ao jurado de guerra, às vezes podem surgir de causas como fome ou desastre. Jurados das chamas surgem de multidões grandes mortas pelo fogo, enquanto praganascidos surgem quando vilarejos inteiros ou até cidades perecem de doença."
      }
    ]
  },
  "creature-morlock-tinkerer": {
    "description": "A maioria dos morlocks tem pouco talento para fabricar, mas muitos têm um jeito inexplicável para consertar. Os sons de maquinaria e peças em movimento tendem a atraí-los. Esses morlocks gostam em especial do tique-taque de autômatos de corda. Muitos contos de viajantes das Terras Sombrias descrevem morlocks capazes de pegar armadilhas mecânicas usadas ou desativadas e restaurá-las, aparentemente mais para satisfação própria do que por qualquer desejo de usar o dispositivo.",
    "sections": [
      {
        "id": "morlock-machinery",
        "title": "Maquinário Morlock",
        "body": "Morlocks tendem a ações brutas e tradições violentas e têm pouco interesse em melhorar as sociedades ou criar arte. Porém, têm uma obsessão estranha por maquinaria antiga e itens mágicos, em particular construções de corda. O jeito que têm para remendar ajuda a manter guardiões e armadilhas antigos funcionais, mesmo que o trabalho dê errado de vez em quando."
      }
    ]
  },
  "creature-munsahir": {
    "description": "Munsahirs são um povo elemental que vive no Plano do Fogo, muitas vezes descritos de forma tosca por mortais como anões de bronze. Têm corpos robustos e largos, ombros amplos, pele metálica reluzente e cabeças coroadas de chamas.\n\nA sociedade munsahir organiza-se em papéis tradicionais herdados pelas linhas familiares, e o papel de um munsahir é indicado com clareza pelos metais que usam nas saias de armadura. A cultura foca em tradição e história, dando alto valor à obediência e à conformidade dentro da comunidade, e por isso muda devagar. Muitos munsahirs orgulham-se dos papéis ancestrais e de cumprir os deveres herdados, prestando serviços necessários nas comunidades.\n\nHá muito tempo, os valores tradicionais munsahir de autossuficiência e comunidade unida os levaram a erguer fortalezas poderosas pelo Plano do Fogo, onde se isolaram de outros habitantes planares e até de outras comunidades munsahir. Esses valores, infelizmente, também levaram à ruína. Sem conexões nem comunicação regular com outros assentamentos, essas fortalezas foram conquistadas com facilidade pelos ifrits de Medina Mudii'a, o poder dominante no Plano do Fogo. Agora a maioria das fortalezas munsahir jaz abandonada e em ruínas, com redutos livres tão raros e distantes que a maioria acredita que todos se perderam.\n\nMunsahirs nascidos dentro do Domínio da Chama dos ifrits pertencem às populações que foram conquistadas e assimiladas ao império eras atrás. Vivem em serviço perpétuo ao império, desconectados da história e da cultura, mas formaram a própria sociedade unida em Medina Mudii'a sob o jugo duro dos gênios do fogo. Um punhado de comunidades munsahir escapou à conquista ifrit, na maioria das vezes vivendo longe dos reinos dos gênios. Alguns desses munsahirs agora residem em áreas quentes e vulcânicas das Terras Sombrias em Golarion, enquanto outros fugiram para as profundezas remotas do Plano do Fogo. Forasteiros intrometidos, porém, buscam sem parar esses assentamentos, ansiando pelos lendários bens forjados por munsahirs.",
    "sections": [
      {
        "id": "munsahirs-on-other-planes",
        "title": "Munsahirs em Outros Planos",
        "body": "Embora a maioria dos munsahirs viva no Plano do Fogo, alguns grupos emigraram para outros planos. Em Golarion, várias comunidades grandes existem em Flume Warrens, parte das Terras Sombrias sob as Montanhas Mindspin. Outro grupo instalou-se sob as Montanhas dos Cinco Reis depois de uma fuga angustiante da opressão em Medina Mudii'a. Lendas falam de uma nação elemental antiga liderada por um munsahir imortal que governou uma porção da Selva Valashmai em Tian Xia, mas o destino dessa nação é desconhecido, e poucas de suas ruínas restam."
      }
    ]
  },
  "creature-grioth-cultist": {
    "description": "Cultistas grioth representam o degrau mais baixo do culto impiedoso — adoradores do Elder Mythos encarregados de liderar missões de reconhecimento em mundos novos. Embora ranqueados acima dos batedores na cadeia de comando, ocupam um lugar humilde na hierarquia religiosa geral. Embora rumores sussurrados descrevam os rituais lendários necessários para arrancar mundos de seus sóis, esses cultistas não aprendem essa magia potente. Tais segredos ficam com os sumos sacerdotes grioth, que são sempre os últimos a chegar num mundo colonizado.\n\nA maioria dos grioths adora o Outer God Nyarlathotep numa de suas muitas encarnações, embora alguns adorem outras entidades do Elder Mythos, como Azathoth, Nhimbaloth ou Yog-Sothoth. Nos casos altamente raros em que um grioth é cortado da sociedade e recebe a oportunidade de explorar outras religiões, ainda assim inclina-se a fés associadas às estrelas ou à noite, como Desna ou Zon-Kuthon. Porém, esses grioths são odiados pelos outros da própria espécie, que os veem como hereges perigosos.",
    "sections": []
  },
  "creature-shambler-troop": {
    "description": "Esta massa cambaleante de carne em decomposição move-se com foco embotado, mas singular.",
    "sections": []
  },
  "creature-tripkee-rain-caller": {
    "description": "Influentes nas comunidades, esses druidas sábios detêm poder sobre a água e o clima.",
    "sections": []
  },
  "creature-dig-widget": {
    "description": "Ladrões cobiçam as bugigangas escavadoras, construtos especializados feitos para infiltração. Cada bugiganga escavadora contém inúmeras ferramentas simples, inclusive um conjunto de dispositivos mecânicos que funcionam como ferramentas de ladrão, dois braços com brocas e dois braços com trados para prender-se e escalar superfícies. Uma vez ativadas, esses dispositivos impulsionam-se para frente. Embora tenham as faculdades típicas de um construto, em geral seguem uma rotina simples: evitar ser notado, abrir qualquer fechadura que barre o caminho, escavar obstáculos e atacar se forem pegos. Raramente são deixadas sem supervisão, pois um ladrão precisa estar por perto para seguir atrás — tanto para roubar bens quanto para impedir a bugiganga escavadora de seguir na ladroagem depois de alcançar o objetivo.\n\nA fonte de poder de uma bugiganga escavadora é tanto mecânica quanto mágica. As engrenagens e molas que lhe dão mobilidade são um aprimoramento sobre criações de corda verdadeiras mais primitivas (cujas funções exigem corda constante para permanecer móveis), mas ao custo da segurança, pois as peças móveis de uma bugiganga escavadora podem ser desmontadas depressa por ladrões e outros com o treino adequado.\n\nEmbora muitas autoridades proíbam bugigangas escavadoras, têm mais dificuldade de confiscá-las do que se esperaria. Um número considerável de quem encontra bugigangas escavadoras, de aventureiros contratados a kobolds tuneladores, está bem mais inclinado a ficar com os construtos do que entregá-los para serem desmontados. Muitas vezes, isso se deve simplesmente à novidade da bugiganga escavadora, mais do que a qualquer desejo de usá-la.",
    "sections": [
      {
        "id": "widget-workshops",
        "title": "Oficinas de Bugigangas",
        "body": "A primeira bugiganga escavadora veio das oficinas de uma guilda anã de ladrões chamada Trapaceiros de Godak, que usou teorias de mecanismos de corda mágicos mais avançadas como trampolim para essas engenhocas mais simples, mas não menos eficazes. Com as bugigangas escavadoras, os Trapaceiros atormentaram as autoridades de vários assentamentos anões ao longo dos anos. As viagens espalharam a tecnologia da bugiganga escavadora, e inúmeras melhorias desde então levaram a versões mais rápidas e confiáveis. Embora mecânicos anões honrados tenham observado bugigangas escavadoras e reconhecido a complexidade da tecnologia, recusaram-se firmemente a adaptar algo com origem tão inescrupulosa."
      }
    ]
  },
  "creature-gnokesh": {
    "description": "A estrutura de um gnokesh, uma roda de tomos antigos, reflete seu papel em Heaven. Esses arcontes encarnam perfeitamente o conhecimento de Heaven, em particular a busca diligente de estudo e pesquisa. Cada gnokesh dedica-se a um assunto em particular. Esse assunto é crucial à identidade deles de um jeito que poucos além dos gnokeshes conseguem entender. Esses arcontes evitam a violência, achando a busca do conhecimento bem mais interessante. Preferem reunir-se com outros da própria espécie em grandes bibliotecas ou servir de guardiões de registros ou tutores para arquivistas, pesquisadores, generais, conselheiros e outros que possam usar a expertise.",
    "sections": []
  },
  "creature-ostiarius": {
    "description": "Ostiários, como emissários dos velstracs, cuidam dos portais entre o Mundo Inferior e o Universo. Não só escoltam outros velstracs ao mundo dos mortais, mas também trabalham para atrair mortais aos reinos dos velstracs — dos quais a maioria dos mortais nunca sai. Entre os velstracs mais agradáveis e persuasivos, ostiários estão preparados para conversar por horas sobre qualquer tópico, e são hábeis em voltar, de novo e de novo, ao assunto dos deleites encontrados nas filosofias perversas. Ostiários têm mais de 1,8 m de altura, e os indivíduos vão de esqueléticos e magros a enormemente volumosos.",
    "sections": []
  },
  "creature-sabosan": {
    "description": "Sabosans são humanoides inteligentes semelhantes a morcegos que vivem em florestas quentes e bebem o sangue de outras criaturas, em particular de pessoas. Têm torsos finos e emaciados e asas largas e coriáceas que podem alcançar uma envergadura de quase 6 m. A cabeça, o pescoço, os ombros e o peito superior dos sabosans são cobertos de pelo vermelho ou marrom-escuro que oculta a carne esticada e fina. Embora as orelhas sejam grandes e pontudas como as de um morcego e possam ecolocalizar como os morcegos, a visão também é bem forte, o bastante para rastrear a presa com facilidade em luz baixa.\n\nAlguns estudiosos naturalistas acreditam que sabosans sejam descendentes distantes de humanos acometidos de vampirismo que conseguiram evitar sucumbir à morte-viva. Outros postulam que um dia foram um culto de adoradores de demônios cujos ritos sombrios os transformaram nas formas atuais. Sejam quais forem as origens verdadeiras, sabosans têm reputações infames entre vilas e cidades ao sul do equador de Golarion. Até meros rumores de sabosans numa área bastam para disparar caçadas em toda a cidade, e os verdadeiramente supersticiosos não hesitam em atear fogo perto de cada gruta, recanto e toca que encontram para defumar as criaturas noturnas.\n\nSabosans caçam nas horas do crepúsculo ou logo após o anoitecer, quando a ecolocalização lhes dá vantagem sobre a presa adormecida. São caçadores capazes, mas indiscriminados quanto às fontes de alimento; o metabolismo rápido significa que sabosans precisam comer quase 9 kg de carne e fruta por dia, suplementados, claro, com quantidades copiosas de sangue.\n\nA fé obscura dos sabosans reverencia duas deidades: o Senhor Demônio morto Vyriavaxus, Senhor das Sombras, e o deus-sol quase esquecido Easivra. Vyriavaxus tem um vínculo óbvio com as criaturas, com a aparência de um morcego gigante, mas a conexão com o deus-sol sugere uma profundidade complexa nas crenças sabosan.",
    "sections": [
      {
        "id": "the-sabosan-kingdom",
        "title": "O Reino Sabosan",
        "body": "Sabosans nem sempre estiveram tão confinados às bordas da natureza selvagem. Outrora, muitos de sua espécie ocupavam a metrópole de pedra de Jaytirian no coração da selva Mwangi e a defendiam contra as forças bestiais do temível Rei Gorila. Porém, ao longo dos últimos poucos séculos, alguma força desconhecida expulsou os sabosans, e agora vagueiam a Expansão Mwangi em números minguantes, buscando um lar novo."
      }
    ]
  },
  "creature-skaveling": {
    "description": "É preciso realizar um ritual hediondo para fazer um skaveling. Embora às vezes chamados morcegos carniçais, são mortos-vivos especificamente fabricados, não carniçais verdadeiros. Os urdefhans sugadores de sangue das Terras Sombrias criam morcegos gigantes com um fungo tóxico e a carne de carniçais — especificamente os cérebros. Ao alcançar a maturidade, esses morcegos gigantes são ritualmente mortos por veneno. Embora isso faça apodrecer a carne da maioria das criaturas, os morcegos especialmente preparados erguem-se imediatamente da morte como skavelings.\n\nApesar das asas esfarrapadas e da pele flácida, skavelings são bem capazes de voo, mesmo carregando uma criatura nas costas. Urdefhans muitas vezes os usam como montarias. A inteligência é mais avançada que a de um morcego gigante típico, e em combate comportam-se mais como aliados do que como animais, capazes de tomar decisões táticas.",
    "sections": [
      {
        "id": "skaveling-intellect",
        "title": "Intelecto de Skaveling",
        "body": "Como um efeito colateral curioso da criação, skavelings absorvem muitas memórias dos cérebros de carniçais dos quais foram alimentados. Embora fossem meros animais superdimensionados em vida, na morte-viva essas memórias coalescem numa forma estranha de inteligência que concede a skavelings a habilidade de falar e raciocinar, tanto melhor para servir os mestres urdefhan. Skavelings permanecem leais a urdefhans e nunca tomam ações numa luta que prejudicariam os criadores."
      }
    ]
  },
  "creature-tiger-topiary": {
    "description": "Topiárias de tigre são encontradas com mais frequência nas Terras Impossíveis e em Tian Xia, acrescentando uma aparência perigosa a um jardim encantador. Almas de indivíduos muito orgulhosos e voláteis podem tornar-se topiárias de tigre, virando espreitadores e caçadores silenciosos. Seguindo intrusos pelo território até estarem no momento mais vulnerável, são conhecidas por abater partidas de aventureiros desavisados um membro de cada vez. Fundindo-se sem costura à natureza, só viajantes experientes conseguem avistar uma topiária de tigre a tempo de traçar outro rumo.",
    "sections": []
  },
  "creature-urdefhan-tormentor": {
    "description": "Conjuradores urdefhan com jeito para o divino são invariavelmente adoradores profanos da estirpe daemon, em geral tomando um dos quatro Cavaleiros do Apocalipse de Abaddon como deidade patrona. Com os dons profanos, esses atormentadores urdefhan conjuram daemons para a batalha e fortalecem os aliados com magia profana, preferindo ficar na retaguarda a entrar no combate diretamente.",
    "sections": []
  },
  "creature-beetle-carapace": {
    "description": "Criada a partir do exoesqueleto de um besouro-veado gigante, essa casca sem mente pode cortar um inimigo ao meio com as mandíbulas poderosas. O abdômen desse morto-vivo rastejante está vazio, e mais de um necromante já usou esse espaço para esconder carga valiosa.",
    "sections": [
      {
        "id": "crawling-cargo",
        "title": "Carga Rastejante",
        "body": "Mortos-vivos formam os passageiros mais comuns dentro do abdômen de uma carapaça de besouro, mas enxames muitas vezes se amontoam apertados dentro das criaturas. Insetos tendem a ficar mais à vontade em torno de mortos-vivos do que outros tipos de animais. As seguintes criaturas são boas opções para encontros de combate, nas quais podem ser soltas num momento dramático para uma surpresa grotesca.\n\nEnxame de Formigas-correição\n\nEnxame de Centopeias\n\nEnxame de Baratas\n\nEnxame de Mosquitos do Pântano\n\nEnxame de Escorpiões\n\nEnxame de Aranhas\n\nEnxame de Vespas"
      }
    ]
  },
  "creature-blizzardborn": {
    "description": "Congelando e derretendo num ciclo quase constante, nascidos da nevasca lembram formas humanoides compostas de uma mistura de neve parcialmente derretida e granizo. Esses elementais movem-se com passadas crocantes, os corpos em constante agitação e desprendendo lascas de gelo. Por causa da capacidade de recongelar, nascidos da nevasca podem viajar com segurança a ambientes mais quentes, embora nessas áreas tendam a parecer mais com lamaçais de neve.",
    "sections": []
  },
  "creature-divine-warden-of-pharasma": {
    "description": "Este guardião divino serve Pharasma, a deusa do nascimento, da morte e do destino. Protege um templo ou santuário da Senhora das Sepulturas.",
    "sections": []
  },
  "creature-evangelist": {
    "description": "Evangelistas, os embaixadores não oficiais dos velstracs, vagueiam os recantos mais distantes dos planos para espalhar a palavra da crença abominável de sua espécie na perfeição pela dor. São, portanto, os velstracs mais frequentemente encontrados no Universo, liderando covens de escultores de carne mortais hedonistas ou servindo de carcereiros de masmorras hediondas. Em regiões governadas por poderes infernais, evangelistas podem servir de tenentes ou conselheiros, sussurrando caminhos secretos ao poder em troca de almas mortais ou de carne mortal escolhida. Evangelistas têm o mesmo tamanho que humanos, embora com a carne transformada em algo que lembra uma paródia de trajes aristocráticos, e muitas vezes pesam 159 kg ou mais.",
    "sections": []
  },
  "creature-graveknight-captain": {
    "description": "Capitães cavaleiros da tumba um dia lideraram com orgulho esquadrões de tropas em batalha.",
    "sections": []
  },
  "creature-hungry-ghost": {
    "description": "Fantasmas famintos surgem daqueles que não receberam enterros adequados ou cujas tumbas foram negligenciadas. Não estão vinculados a um sítio ou item, mas são compelidos a ver oportunidades de cometer boas ações na esperança de ganhar favores que os ajudem a alcançar o descanso final. A necessidade de alimentar-se de energia viva, porém, muitas vezes conflita com essa meta.",
    "sections": [
      {
        "id": "unremembered-unmourned",
        "title": "Não Lembrados, Não Lamentados",
        "body": "Um fantasma é impelido por uma necessidade que consome tudo, ligada à morte, mas muitas vezes pouco clara para o próprio fantasma. Fragmentos da vida anterior ainda se ligam à identidade do fantasma, mas tornam-se encobertos ou distorcidos a serviço da energia de morte do fantasma. Puxam o fantasma a cometer atos horrendos e vingativos, como fios invisíveis de marionete apertados por uma força sinistra. Essa desconexão significa que o fantasma raramente é útil a quem espera pô-lo a descansar, forçando-os a buscar pistas no ambiente ou nas recordações de outras criaturas. Mesmo um fantasma faminto, compelido a cometer boas ações, é impotente para manter o controle contra a necessidade de alimentar-se."
      }
    ]
  },
  "creature-maftet-guardian": {
    "description": "Maftets são humanoides de asas de falcão com corpo inferior leonino que habitam ruínas antigas e cidades tidas como perdidas, em geral em regiões de deserto ou montanha. Veem-se como guardiões e praticam uma técnica especializada de empunhar duas cimitarras tão central à cultura que as cimitarras de um maftet muitas vezes são heranças familiares prezadas. A maioria dos maftets venera os ancestrais além de várias deidades, e até uma criança consegue detalhar a linhagem familiar por várias gerações. Os bandos maftet tendem a ser matriarcais e isolacionistas, embora maftets não sejam necessariamente hostis a forasteiros que respeitem seus lares e não busquem saqueá-los.\n\nQuando um maftet jovem chega à idade adulta, recebe tatuagens rúnicas de um ancião do bando. Essas tatuagens são imbuídas de magia que permite a um maftet encantar as armas empunhadas, mas os desenhos individualizados contam dos ancestrais do maftet, das aventuras da infância e das qualidades positivas. Tais tatuagens são consideradas sagradas e nunca são dadas a não maftets.",
    "sections": [
      {
        "id": "shared-duties",
        "title": "Deveres Compartilhados",
        "body": "Ocasionalmente, maftets e girtablilus compartilham um lar. Como ambos os grupos respeitam os locais e a história, em geral formam uma parceria tácita para guardar ruínas em conjunto, com maftets vigiando dos céus enquanto girtablilus patrulham o chão."
      }
    ]
  },
  "creature-sand-sentry": {
    "description": "Esta criatura de areia pura move-se com uma graça inquietante, alternando entre a semelhança detalhada de um humano e uma forma bípede apagada e sem feições. A sentinela de areia é muitas vezes chamada por conjuradores para guardar uma área de grande importância; esses elementais são participantes pacientes nesses papéis, o que os torna bem adequados a serviço de longo prazo.",
    "sections": [
      {
        "id": "sand-simulacra",
        "title": "Simulacros de Areia",
        "body": "Sentinelas de areia não têm cultura ou sociedade verdadeiras próprias, mas são fascinadas sem fim pela sociedade e cultura dos humanoides que encontram. Conseguem moldar a aparência para imitar quaisquer humanoides de tamanho semelhante e, embora sempre permaneçam obviamente compostas de areia, fazem o melhor para copiar as atividades cotidianas que observam outros humanoides desempenhando. Claro, estruturas e objetos que sentinelas de areia constroem de areia nunca duram, mas isso nunca parece sufocar a obsessão."
      }
    ]
  },
  "creature-skull-peeler": {
    "description": "Descascadores de crânios, apesar do apelido feroz e bem merecido, são considerados por muitos francamente adoráveis, sobretudo quando vistos a uma distância segura. O pelo macio, malhado de marrom, ajuda-os a esconder-se nos dosséis da floresta, e têm asas insetoides cintilantes e olhos grandes que captam os raios de luz mais tênues. À primeira vista, um descascador de crânios parece um bicho de estimação fofo ou um familiar de mago. Quaisquer ilusões de domesticar tal fera são depressa descartadas ao ver como um descascador de crânios come, porém.\n\nDescascadores de crânios evoluíram para pendurar-se imóveis nos dosséis das árvores enquanto esperam até que presa adequada apareça, em geral dinossauros de pescoço longo, mas também primatas que se balançam pelos galhos e aves grandes. O descascador de crânios então dispara a língua longa, decepando a cabeça da criatura do corpo e puxando o crânio destacado de volta às patas famintas. Então usa as garras para rachar a cavidade craniana — daí o nome — antes de lamber o interior saboroso.\n\nApesar dos hábitos alimentares macabros dos descascadores de crânios, algumas empresas e indivíduos não resistem ao impulso de acrescentar essas feras às coleções. Fey e outras criaturas com laços com o Primeiro Mundo, como gnomos, ocasionalmente conseguem persuadir um descascador de crânios a uma forma de domesticação. Embora as feras adoráveis nunca possam ser plenamente amansadas por causa dos instintos de caça hiperevoluídos, podem ser subornadas com comida e, se mantidas saciadas, exibidas num poleiro ou terrário interno como exemplo da astúcia e da letalidade do mestre. Com a mesma frequência, esses descascadores de crânios pseudodomesticados acabam devorando um convidado, um animal de estimação ou o pretenso dono, mas essa possibilidade não impede senhores do crime em ascensão de tentar amansar os predadores miúdos. Descascadores de crânios mantidos em zoológicos bem administrados saem-se um pouco melhor, mas essas criaturas espertas nem sempre ficam nas jaulas, o que levou a descascadores de crânios selvagens em lugares que viajantes talvez não esperem.",
    "sections": [
      {
        "id": "a-grim-nature",
        "title": "Uma Natureza Macabra",
        "body": "Embora exploradores e aventureiros que encontram descascadores de crânios na natureza selvagem muitas vezes assumam que as feras pequenas resultaram de algum experimento mágico mal-avisado de um mago tolo, na verdade são uma espécie de ocorrência natural. Embora a combinação incomum de características possa carregar alguma influência menor do Primeiro Mundo, descascadores de crânios evoluíram de outros mamíferos arborícolas ao longo de milhares de anos. Na forma atual, são predadores bem-sucedidos no ambiente, alimentando-se sobretudo de dinossauros de pescoço longo — presas que outros carnívoros bem maiores ainda têm dificuldade de derrubar!"
      }
    ]
  },
  "creature-smoke-creeper": {
    "description": "Rastejantes de fumaça mudam e modificam a aparência enquanto flutuam pelo Plano do Ar, mas preferem assumir uma forma vagamente insetoide, com asas que deixam um rastro de fumos asfixiantes e olhos vermelhos brilhantes.",
    "sections": [
      {
        "id": "air-and-smoke",
        "title": "Ar e Fumaça",
        "body": "Elementais de fumaça, como o rastejante de fumaça, muitas vezes são cruéis nos ataques a criaturas que respiram, fazendo-as engasgar e tossir com os fumos nóxios. Alguns acreditam que guardam lealdades secretas a Ymeri, que detém domínio sobre fogo e fumaça."
      }
    ]
  },
  "creature-striding-fire": {
    "description": "Encarnando a velocidade e o caos de um incêndio que se espalha, um fogo andarilho aparece como um humanoide esbelto e de membros longos composto de chamas de tons mutáveis revoluteando em torno de uma armação semelhante a um esqueleto.",
    "sections": []
  },
  "creature-verdurous-ooze": {
    "description": "Gosmas verdejantes são encontradas em florestas temperadas, selvas quentes ou outros lugares onde a vida vegetal cresce em abundância. Diferente de muitos tipos de gosma, gosmas verdejantes não são particularmente boas escaladoras e já se soube que ficam presas em abismos naturais ou artificiais. Senhores da guerra e magos às vezes aproveitam esse fato e mantêm gosmas verdejantes como guardiãs em fossos em torno das muralhas de fortalezas ou torres.",
    "sections": [
      {
        "id": "verdurous-congregation",
        "title": "Congregação Verdejante",
        "body": "Quando gosmas verdejantes se reúnem em número suficiente, podem fundir-se em formas conjugadas. Essas massas ampliadas desenvolvem vasos de conexão vermelhos e brancos que pulsam hediondamente enquanto fluido verde e espesso se move dentro deles. Enquanto conjugadas, as gosmas movem-se como uma só criatura. As auras usuais de Avivar a Folhagem e Gás do Sono dobram de tamanho, e tornam-se ainda mais agressivas, alimentando-se vorazmente de qualquer metal ou carne que achem."
      }
    ]
  },
  "creature-wihsaak": {
    "description": "Esses sahkils esguios e insetoides atormentam os inimigos focando num medo generalizado de insetos e de vermes que rastejam e se arrastam. Diferente dos primos mais sutis, wihsaaks não espreitam na periferia e em vez disso enfrentam os alvos diretamente, usando o zumbido inquietante para desorientar e aterrorizar.\n\nAo encontrar múltiplos inimigos, wihsaaks tentam espalhar medo a todos antes de golpear com as garras devastadoras.",
    "sections": []
  },
  "creature-witchwyrd": {
    "description": "Witchwyrds ocultam a maior parte do rosto, deixando só os olhos sem máscara. A inescrutabilidade é um trunfo para um de seus interesses mais significativos — o mercantilismo — e muitos witchwyrds altivos deleitam-se abertamente no desconcerto inspirado pelos disfarces e maneirismos misteriosos. Witchwyrds têm olho aguçado para oportunidades e mercados novos, e quase sempre sabem quando alguém tenta enganá-los.\n\nEssas criaturas humanoides de quatro braços têm pele azul-acinzentada sem pelos, em geral têm cerca de 2 m de altura e pesam 136 kg. As mãos têm três dígitos de tamanho e espaçamento iguais numa disposição semelhante a um tripé. Quando não tentam misturar-se à comunidade local, witchwyrds favorecem roupas extravagantes e folgadas em vermelhos ou amarelos vivos e um chapéu cônico característico. Tendem a preferir as regiões mais secas e quentes das terras que visitam — talvez um indicador do mundo natal misterioso. Witchwyrds são notoriamente calados sobre detalhes desse lugar distante, e com boa razão: a maioria dos witchwyrds em Golarion nunca visitou o lar ancestral. Para esses witchwyrds, a noção de um planeta natal é um espinho constante no lado, e quando perguntados muitos escolhem ignorar a questão de vez. Outros agitam-se tanto com essas indagações que respondem com impaciência ou até violência. Alguns estudiosos teorizaram uma conexão entre witchwyrds e várias outras criaturas de quatro braços, mas como nas perguntas sobre o lugar de origem, witchwyrds têm pouco a dizer sobre o tópico.",
    "sections": [
      {
        "id": "alien-allies",
        "title": "Aliados Alienígenas",
        "body": "Witchwyrds de alta patente ou ricos raramente viajam os planos sozinhos, empregando guarda-costas para acompanhá-los e liderando séquitos compostos de vários seres estranhos que encontraram durante as viagens."
      }
    ]
  },
  "creature-aqudel": {
    "description": "Aqudels são obcecados com controle. Consideram tudo à volta aberto à manipulação, e a posição na hierarquia alghollthu os leva a senhorear redes de ugothols ou sociedades pequenas e estabelecidas que muitas vezes intimidam e exploram das sombras. Aqudels respondem só a vidileths, seguindo as ordens com uma combinação de submissão bajuladora e desconfiança conspiratória.",
    "sections": [
      {
        "id": "alghollthu-hierarchy",
        "title": "Hierarquia Alghollthu",
        "body": "Vidileths são os líderes dos alghollthu, influenciando sutilmente eventos para fomentar o que consideram o desfecho mais favorável, e algumas das tramas levam séculos para se concretizar. Controlam redes vastas de seus parentes, dirigindo-os a influenciar alghollthu inferiores e alavancar o conhecimento para manipular seres menores do que eles (que é como veem todos os outros). Aqudels e nymoluses preenchem o papel de administradores de patente média, recebendo ordens de mestres velados e então pondo os planos em prática com recursos derivados das próprias redes. Um aqudel talvez supervisione só uma célula pequena, enquanto um nymolus talvez cubra uma dúzia."
      }
    ]
  },
  "creature-arboreal-reaper": {
    "description": "Embora algumas florestas tenham uma qualidade idílica e pacífica, outras parecem distintamente hostis ou até sinistras — essas florestas são os covis prediletos dos ceifadores arbóreos. Às vezes esses bosques são procurados por praticantes secretos de artes maliciosas que afirmam que o ambiente inquietante auxilia as habilidades; ceifadores arbóreos não veem razão para interferir em tais práticas desde que o equilíbrio das florestas não seja prejudicado.\n\nTodos os arbóreos variam em aparência conforme o entorno, mas ceifadores arbóreos sempre parecem vagamente sinistros, quer vigiem um bosque sombrio ou uma floresta tropical. Muitas vezes um pouco deformados, retorcidos e cobertos de protuberâncias espinhosas, ceifadores arbóreos às vezes brotam em torno de ruínas antigas ou outras estruturas permanentes, decompondo e incorporando as estruturas conforme amadurecem e tornam-se mais móveis.\n\nCeifadores arbóreos focam na fase essencial de decomposição do ciclo de vida de uma floresta, tornando-se especialmente ativos nas estações de outono e inverno. A influência muitas vezes se vê na explosão de cogumelos num tronco podre ou nas frondes atraentes de uma planta carnívora viçosa. Como os guardiões arbóreos, esses guardiões da mata reagem mais depressa a ameaças percebidas do que os regentes mais deliberados ou os arquivos reclusos — ao menos pelos padrões arbóreos.",
    "sections": []
  },
  "creature-elasmosaurus": {
    "description": "Elasmosauros são répteis primevos de pescoço longo que habitam oceanos e mares profundos. Embora não sejam verdadeiramente um dinossauro, elasmosauros muitas vezes são encontrados em locais semelhantes e são criaturas igualmente titânicas. Mantendo os corpos maciços debaixo d’água, elasmosauros usam os pescoços longos para pegar presa e respirar ar para os pulmões enormes enquanto permanecem em grande parte ocultos da superfície acima. Um elasmosauro tem 9 m de comprimento e pesa 2.700 kg.\n\nPor mais raros e reclusos que sejam, elasmosauros às vezes são tomados por criaturas ainda mais raras chamadas orms aquáticos, habitantes aquáticos lendários de lagos remotos conhecidos pela elusividade e pela astúcia. Enquanto elasmosauros são criaturas mundanas de inteligência animal, orms aquáticos são seres mágicos com inteligência quase humanoide e um fascínio curioso por mortais, e parecem deleitar-se em confundir observadores. Como resultado, teoriza-se que um orm aquático típico fica mais do que feliz em levar um grupo de espectadores a um elasmosauro perdido, tanto para despistar os perseguidores quanto pela hilaridade que inevitavelmente se seguirá.\n\nEmbora elasmosauros muitas vezes sejam encontrados em mundos perdidos e regiões despovoadas, os que habitam os oceanos do mundo não contêm os terrenos de caça a regiões específicas. Como resultado, não é inédito um espécime errante achar o caminho até águas costeiras. Os que o fazem muitas vezes acham os portos de vilas pequenas ou até de cidades grandes banquetes maravilhosos e em geral são caçados por guardas costeiros ou aventureiros. Quando um elasmosauro extraviado como esse acha o caminho para o sistema de esgotos ou os reservatórios de uma cidade, porém, pode tornar-se matéria de lendas urbanas.",
    "sections": [
      {
        "id": "other-aquatic-reptiles",
        "title": "Outros Répteis Aquáticos",
        "body": "O elasmosauro é só um de muitos tipos de répteis aquáticos encontrados em oceanos primevos ou mundos perdidos. Alguns, como o ictiossauro, são quase semelhantes a peixes na aparência. Outros, como o mosassauro, são feras verdadeiramente maciças capazes de matar e comer baleias."
      }
    ]
  },
  "creature-giant-jellyfish": {
    "description": "Diferente dos primos menores, a água-viva gigante é uma predadora ativa que persegue a presa por recifes ou águas abertas. Consegue até espremer o corpo enorme em forma de sino nos recintos apertados de naufrágios para drapejar a juba de tentáculos pela carne exposta da presa.",
    "sections": []
  },
  "creature-hound-of-tindalos": {
    "description": "Esguios e sequiosos, os cães de Tindalos são atraídos àqueles que adulteram o fluxo do tempo, viajam pelo tempo ou usam magia ou drogas alquímicas raras para enviar os pensamentos ou a percepção para trás ou para frente no tempo. Conjuradores poderosos podem puxá-los da Dimensão do Tempo por rituais raros, mas fazê-lo atrai a ira dos cães, então poucos que traficam tais rituais vivem o bastante para espalhar o conhecimento. Embora os cães possuam grande astúcia e intelecto cruel, raramente interagem com outras criaturas — a não ser para caçar e destruir aqueles que atraíram a atenção que não pisca.\n\nUma vez que um cão pega o cheiro de um mortal para caçar, chama outros da própria espécie. A matilha então persegue a vítima por todo o espaço e o tempo até pegá-la, matá-la e devorá-la. Os perseguidos só podem escapar evitando todos os ângulos, pois cães de Tindalos poderiam atravessá-los a partir do nada a qualquer momento.",
    "sections": [
      {
        "id": "tindalos",
        "title": "Tindalos",
        "body": "Textos antigos referem-se a esses caçadores temporais implacáveis como os cães de Tindalos, mas nunca parecem explorar o que Tindalos de fato é. Em algumas referências, a implicação é que Tindalos é um dos Grandes Antigos ou Deuses Exteriores, mas se for o caso, está entre as mais obscuras dessas entidades. Outros tomos referem-se a Tindalos como um local, talvez até uma cidade ou nação que existiu antes de o tempo começar e que só pode ser alcançada por métodos impossíveis para qualquer criatura vinculada às leis do tempo. Com toda probabilidade, ambos e nenhum estão certos — o que Tindalos é simplesmente impossível para mentes mortais compreender."
      }
    ]
  },
  "creature-levaloch": {
    "description": "Gigantes temíveis de ferro denteado, levalochs servem nos exércitos do Inferno como guerreiros potentes e caçadores tenazes — criaturas de disciplina absoluta, infinitamente obedientes a tiranos diabólicos.",
    "sections": [
      {
        "id": "hellforged-construct",
        "title": "Construto Forjado no Inferno",
        "body": "Levalochs são amálgamas estranhas de diabo e autômato, nunca exigindo comida ou descanso. As gravuras nas placas de ferro indicam a lealdade infernal a certo arcediabo, duque infernal, malebranche ou Rainha da Noite."
      }
    ]
  },
  "creature-megalania": {
    "description": "Megalanias, como os primos menores os lagartos-monitor gigantes, golpeiam depressa e usam a mordida poderosa para agarrar a presa. Preferem engolir a presa inteira a arriscar que outros dêem uma dentada numa refeição duramente conquistada.",
    "sections": []
  },
  "creature-narrik": {
    "description": "Bem abaixo da superfície de Golarion, matilhas de narriks caçam em túneis das Terras Sombrias, buscando seres infelizes para devorar. Essas criaturas hediondas são vagamente humanoides, mas carecem de uma cabeça tradicional — dezenas de olhos em grande parte vestigiais encimam os corpos, enquanto uma boca maciça cheia de presas fende o peito. A língua longa contém órgãos olfativos, que narriks usam principalmente para caçar.\n\nA presa predileta dos narriks são seres sencientes — calignis, hryngars, gnomos umbrais, e aventureiros e comerciantes da superfície — e saboreiam o gosto que o medo acrescenta à carne crua. Entre as várias substâncias alquímicas produzidas naturalmente pelos corpos está uma saliva psicotrópica que enche as vítimas de terror, não só realçando o sabor, mas também permitindo que narriks cacem com mais facilidade.\n\nNarriks têm pouco em termos de civilização, pois passam o tempo principalmente caçando em vez de construir ou outras atividades. Estudiosos não têm certeza de como se reproduzem, pois nenhum chegou perto o bastante para estudar tais hábitos. Há, porém, registros de ataques de narriks marcadamente menos maduros ao longo da história. Tais assaltos ocorreram longe de outros narriks, então muitos acreditam que a prole narrik é forçada a criar as próprias matilhas uma vez que alcança a idade adulta.",
    "sections": [
      {
        "id": "alchemical-furnaces",
        "title": "Fornos Alquímicos",
        "body": "A maioria das criaturas inteligentes evita narriks, mas alguns deros e aventureiros particularmente corajosos — ou imprudentes — os caçam para colher saliva psicotrópica, cuspe emaranhante e outros aditivos alquímicos. Como os corpos dos narriks explodem ao morrer, caçadores precisam capturar sujeitos vivos para obter tais materiais."
      }
    ]
  },
  "creature-naunet": {
    "description": "Belicosos e poderosamente musculados, naunets servem como os batedores e as tropas de fileira dos exércitos proteanos.",
    "sections": []
  },
  "creature-pairaka": {
    "description": "Muitas vezes encantadoras, às vezes até sedutoras, pairakas insinuam-se em relacionamentos mortais, destruindo sutilmente todos os laços de amizade e amor por manipulação e corrupção emocional e física. A forma natural não é vista com frequência. Em vez disso, adotam formas que atraem atenção o bastante para ganhar a confiança daqueles que desejam atormentar e corromper. Quando mostram uma forma mais natural, pairakas em geral escolhem alimentar a crença na beleza aparecendo como humanoides andróginos, azul-pálidos e esteticamente agradáveis que se portam com graça aonde quer que vão.\n\nEmbora essa forma seja só parte das táticas manipulativas, a forma intrínseca está oculta a quase todos, salvo outras pairakas. São criaturas pavorosas e imponentes, salpicadas de erupções e furúnculos grandes. Com chifres que crescem e se torcem com a idade, e um sorriso que mostra dentes afiados como navalha, essa forma é ao mesmo tempo chocante e inquietante. Pairakas podem ocasionalmente mostrar a forma verdadeira àqueles de quem se alimentaram, mas só depois que foram completamente corrompidos, com todos os outros relacionamentos em ruínas.",
    "sections": []
  },
  "creature-praskith": {
    "description": "Essas amálgamas estranhas de planta e fungo com tendências animais formam-se onde o mundo natural é corrompido por magia vil ou fronteiras planares desfiadas. Praskiths são predadores de emboscada instintivos que buscam trilhas florestais pouco percorridas e ficam à espera no sub-bosque. Um praskith engole a presa o mais depressa possível e deixa os sucos digestivos paralíticos terminarem a refeição, restaurando-se depressa com o nutrimento fornecido pela criatura presa. Quando coletados, neutralizados e refinados, os fluidos digestivos de um praskith formam uma laca que retém parte da resistência a ácido da criatura.\n\nUm praskith nasce com um entendimento rudimentar da língua Fey, mas em alguns casos pode manifestar-se conhecendo outra língua, como Aklo, Dracônico ou até Necril. De qualquer forma, praskiths têm pouca paciência para tagarelar com refeições potenciais, embora alguns fey determinados e conjuradores primordiais já tenham formado alianças ou até laços mais estreitos com praskiths. Fazer amizade com um praskith exige grande paciência e comida abundante — e os presentes de comida precisam estar vivos quando entregues.\n\nQuando termina de alimentar-se, um praskith entra num estado quiescente por um dia inteiro, uma das poucas vezes em que é seguro aproximar-se. Ao despertar, busca a floresta profunda para regurgitar as porções menos digeríveis da refeição. Esses restos podem conter objetos de valor que sobreviveram à digestão e indicam que os terrenos de caça de um praskith ficam por perto.\n\nPraskiths habitam bosques e selvas profundos. Praskiths bem alimentados desenvolvem corpos de frutificação que lançam milhões de esporos. Esporos que por acaso pousam em carniça crescem em praskiths novos.",
    "sections": [
      {
        "id": "praskith-lacquer",
        "title": "Laca de Praskith",
        "body": "Objetos revestidos com laca de praskith ganham resistência 5 a ácido. Fazer e aplicar laca de praskith exige uma fórmula de 5º nível, o feito de perícia Criação Alquímica e o fluido do estômago de um praskith. Um teste de Ofício CD 20 bem-sucedido e 4 dias de trabalho bastam para proteger 1 Volume de itens sem outro custo em materiais, mas o fluido é gasto mesmo num teste falho."
      }
    ]
  },
  "creature-sceaduinar": {
    "description": "Criaturas estranhas nascidas de cristais denteados no coração do Vazio, sceaduinars são alimentados por sua energia do Vazio e impelidos a extinguir toda vida. Lembrando gárgulas cristalinas com membros serrilhados e rostos afiados de morcego, sceaduinars têm cerca de 2,1 m de altura e pesam em torno de 45 kg.\n\nEsses seres malévolos às vezes reúnem-se em matilhas grandes da própria espécie. Apesar da inteligência, agem na maior parte como feras astutas e ferais, embora ocasionalmente construam ferramentas para ajudá-los a extinguir a vida. Sceaduinars navegam os grandes vazios do plano natal, buscando destruir quaisquer faíscas de vida que achem o caminho até aquele reino mortal — até as faíscas torcidas encontradas em criaturas mortas-vivas.\n\nQuando descobrem portais para outros planos, sceaduinars enxameiam em grande número, massacrando todos que encontram. Embora habitar fora do Vazio seja desconfortável para sceaduinars, podem existir por períodos prolongados apartados do lar. Claro, a sensação de um plano onde a energia do Vazio não é a regra não melhora a disposição dessas criaturas e, como resultado, tendem a ser particularmente cruéis e violentos quando encontrados em tais reinos.",
    "sections": [
      {
        "id": "sceaduinar-crystals",
        "title": "Cristais Sceaduinar",
        "body": "Sceaduinars congregam-se nos grandes nós cristalinos de energia do vazio que se acumulam no Vazio. Sceaduinars cutucam crescimentos de cristal semelhantes a árvores para produzir itens perigosos semelhantes a buracos negros miniaturizados ou grandes estruturas que ecoam com sinos sinistros. Sceaduinars também estimulam essas agregações de cristais a gerar outros sceaduinars e criaturas odientas semelhantes de não-vida."
      }
    ]
  },
  "creature-slithering-pit": {
    "description": "Um fosso serpenteante é uma gosma estranha, quase invisível, com um espaço extradimensional como sistema digestivo, que imita a aparência de um fosso de pedra cheio de ácido. Dissolve devagar os cativos no ácido estomacal até que possam ser digeridos. Um fosso serpenteante pode passar semanas sem alimentar-se, o que lhe dá paciência.\n\nProsperando em áreas dilapidadas, o fosso serpenteante posiciona-se entre os buracos abundantes onde pode passar facilmente por só mais uma mancha. Rasteja por ruas de paralelepípedos precárias e complexos subterrâneos úmidos, esperando que presa desavisada tropece e caia dentro.",
    "sections": [
      {
        "id": "a-living-pit-really",
        "title": "Um Fosso Vivo, Sério?",
        "body": "O saber sobre o fosso serpenteante é tão estranho e confuso quanto a própria criatura. Foi criado por um mago precisando de um descarte de lixo à mão? Resultou de algum acidente infeliz envolvendo gosmas famintas e uma bolsa espaçosa a mais? Por que o interior imita a aparência de pedra, mas sem a mesma resistência? É alguma forma de camuflagem, permitindo que passem por um perigo tantas vezes ignorado? Tantas perguntas..."
      }
    ]
  },
  "creature-stygira": {
    "description": "Essas criaturas marcadas e sem olhos aparecem como eremitas murchos envoltos em trapos esfarrapados. Podem comandar segredos estranhos da terra e interpretar as energias fatídicas das profundezas subterrâneas. Em algumas regiões, stygiras são adoradas como videntes ou até deuses, embora careçam da habilidade de conceder magias a clérigos e muitas vezes nem estejam cientes dos adoradores. Em outras áreas, têm laços estranhos com os impérios antigos dos ciclopes, frequentemente habitando as ruínas superdimensionadas que aquelas criaturas deixaram há muito. Para muitas stygiras, gemas colhidas de mosaicos ciclópicos antigos têm propriedades mágicas ainda maiores que as de outros cristais.\n\nEmbora tecnicamente cegas, stygiras têm olhos vestigiais ocultos sob a carne pedregosa e marcada dos rostos. Capazes de sentir luzes brilhantes mesmo através das cicatrizes, stygiras ficam enjoadas e distraídas por esses vislumbres ofuscantes, então permanecem nas cavernas durante o dia e só vagueiam pelo mundo acima depois do anoitecer. Longe de benévolas, stygiras muitas vezes interceptam viajantes desavisados para reduzir as vítimas aos químicos básicos e humores sobrenaturais necessários para infundir as gemas com a capacidade de lhes dar visão e poder mágico.",
    "sections": [
      {
        "id": "stygira-gems",
        "title": "Gemas de Stygira",
        "body": "A gema que uma stygira carrega não precisa ser particularmente valiosa, mas algumas stygiras preferem usar gemas mais caras como afetação. Stygiras mais poderosas desenvolveram métodos de usar gemas particularmente caras para aprimorar a habilidade Olhar da Gema, permitindo que algumas encantem aqueles sobre quem lançam o olhar, incendeiem os inimigos ou até aflijam criaturas com veneno debilitante."
      }
    ]
  },
  "creature-theletos": {
    "description": "Theletoses mantêm o equilíbrio entre destino e livre-arbítrio. Um theletos é uma massa aproximadamente esférica de cristais da qual emergem quatro membros, cada um fendido no cotovelo e terminando em mãos de três dedos. Um par de tentáculos cristalinos também emerge do corpo. Aqueles que foram danificados pelos tentáculos de um theletos descrevem ser apresentados a um dilema desorientador: sentem-se forçados a fazer uma única escolha ao mesmo tempo em que são sobrecarregados pelas opções sem fim disponíveis para escolher. Theletoses são mais propensos do que a maioria dos aeons a interferir em sociedades não aeon, em particular em regiões com leis draconianas. O envolvimento é duplo; um theletos preocupa-se tanto com a liberdade dos indivíduos quanto com as leis que restringem esses indivíduos, mesmo (ou especialmente) quando as duas estão em oposição.",
    "sections": [
      {
        "id": "maintaining-the-balance",
        "title": "Mantendo o Equilíbrio",
        "body": "Theletoses pouco se importam com os indivíduos e as sociedades que manipulam, só que o equilíbrio entre liberdade e destino seja mantido. Um theletos talvez ajude uma criatura que perdeu a liberdade a escapar, mas também talvez force aqueles que juraram cumprir um dever injusto a manter a palavra. Se os planos forem frustrados, um theletos não busca vingança, mas em vez disso procura outros jeitos de restabelecer o equilíbrio."
      }
    ]
  },
  "creature-totenmaske": {
    "description": "Gerados pelas mesmas obsessões antinaturais e autodestrutivas que os impeliam quando ainda viviam, totenmaskes são os restos mortos-vivos dos mais autoindulgentes e pecaminosos entre os mortais. A necessidade de indulgência mostrou-se mais forte até do que o jugo da morte, erguendo-os das tumbas. Embora incapazes de saciar os desejos depravados, esses mortos-vivos vis podem drenar a própria carne das vítimas para envolver-se numa paródia perversa de vida que lhes permite perseguir os anseios básicos. Os anseios específicos dos totenmaskes variam — um pode obcecar-se com comida ou bebida, enquanto outro pode ser vão e desejoso de uma forma atraente para maravilhar-se num espelho, enquanto ainda outro pode simplesmente ansiar pelo cheiro de sangue.\n\nSeja qual for a sensação que o totenmaske busca, é sempre um vício levado ao extremo, pois esse pecado ajudou a condená-los à morte-viva em primeiro lugar. Um totenmaske obcecado com comida, por exemplo, pode achar-se assaltando padarias ou cervejarias, enquanto um totenmaske vão obcecado com glamour pode entediar-se depressa de cada visual novo e trocar as vítimas diariamente, ou até de hora em hora.",
    "sections": [
      {
        "id": "flesh-sculptors",
        "title": "Escultores de Carne",
        "body": "Alguns totenmaskes fabricam \"arte\" macabra moldando a carne das vítimas, passando horas, dias ou até semanas modelando a pele de uma vítima ou até fundindo múltiplas criaturas numa só peça. Os resultados horrendos desse processo podem tomar a forma de móveis feitos de carne que ainda vive e respira, \"esculturas\" que de modo algum lembram a forma humana, e coisas ainda mais retorcidas e depravadas."
      }
    ]
  },
  "creature-tupilaq": {
    "description": "Um tupilaq é um construto artisticamente entalhado, esculpido de ossos de animais (em geral baleia ou morsa) e imbuído com o propósito expresso de eviscerar os inimigos do criador. Um tupilaq manifesta-se de magia odienta — tal coisa só pode ser criada por alguém que acredita ter sido gravemente injustiçado. Quando um crime terrível e imperdoável é cometido contra alguém com grande habilidade de entalhe e que tem conhecimento do ritual adequado, o agraviado pode canalizar o luto e o ódio por encantações sussurradas para dar vida a um tupilaq.\n\nInfelizmente, as mesmas emoções usadas para criar um tupilaq muitas vezes levam a tragédias ainda maiores. Funcionalmente imortal, mas feito para a vingança, um tupilaq carece da razão ou do discernimento para fazer qualquer coisa além de perseguir a meta imbuída pelo criador. Um desejo de destruir por completo um inimigo pode levar um tupilaq a massacrar um assentamento inteiro, matando até ter abatido todos mesmo remotamente relacionados ao ofensor original. Muitas histórias descrevem como um tupilaq acaba causando mais tragédia para o criador do que o crime que precipitou a criação. Os contos mais comuns apresentam o tupilaq por fim assassinando o cônjuge ou os membros da família do criador devido a um parentesco distante com o alvo original que ninguém conhecia.\n\nAs energias animadoras de um tupilaq não estão atadas às funções originais, e a criatura em geral sobrevive por muito tempo ao criador, às vítimas e muitas vezes a qualquer um que recorde a razão de sua criação. Pode cair numa espécie de hibernação uma vez que alcançou a vingança imediata, mas em muitos casos os construtos despertam de novo para continuar o rampage contra alvos desprevenidos ignorantes de seu envolvimento.\n\nConjuradores ocasionalmente invocam esses construtos. Um tupilaq invocado, arrancado sem cerimônia de sua vingança, torna-se um combatente quase frenético, desencadeando cada habilidade ofensiva do arsenal para libertar-se. Essas reações não são estratégicas nem ponderadas, mas uma necessidade instintiva, quase programada, de voltar ao propósito verdadeiro. Conjuradores devem ter cautela com um tupilaq empregando magias que possam ser voltadas contra o invocador, como uma bola de fogo “acidentalmente” colocada de modo que a magia incinere o conjurador e devolva as criaturas de onde vieram.",
    "sections": [
      {
        "id": "relics-of-the-past",
        "title": "Relíquias do Passado",
        "body": "Um tupilaq pode durar indefinidamente uma vez criado, e não é incomum um tupilaq ser desenterrado anos, décadas ou até séculos depois que o criador faleceu. Arqueólogos trabalhando em sítios de escavação setentrionais talvez tropecem acidentalmente em um desses construtos ferozes, inadvertidamente despertando a maldição vingativa."
      }
    ]
  },
  "creature-winter-hag": {
    "description": "Bruxas do inverno são tão gélidas no porte quanto o nome implica. Desprovidas de qualquer traço de calor mortal, veem a emoção como fraqueza e desprezam demonstrações dela em qualquer forma. Exigem o mesmo dos pupilos e servos, pois apesar da natureza declaradamente indiferente, bruxas do inverno ainda buscam companhia, chamando aqueles deixados amargos pelo mundo ou atraídos à beleza austera e gélida. Alterações mágicas e a punição ocasional logo transformam esses infelizes em vassalos perfeitos para a corte da bruxa do inverno. Algumas almas corajosas, porém, afirmam que bruxas do inverno podem ser persuadidas à misericórdia pela música.\n\nUma bruxa do inverno é impecável e cruel na aparência, uma mulher estátua que parece ter sido entalhada de gelo e neve branco-pura.",
    "sections": []
  },
  "creature-aigamuxa": {
    "description": "Aigamuxas são humanoides imponentes que espreitam desertos áridos em busca de presa. Carnívoros e vorazes, caçam qualquer coisa que se mova, mas saboreiam em especial comer criaturas sencientes. Muitos povos Mwangi referem-se incorretamente a aigamuxas como demônios, enquanto outros os descrevem com mais precisão como descendentes de gigantes. Aigamuxas lembram humanos grandes com cavidades lisas onde os olhos deveriam estar, mas os olhos estão de fato embutidos nas solas dos pés. Ostentam garras longas e afiadas e dentes que usam para dilacerar a presa uma vez que a pegam. A marcha estranha de um aigamuxa em movimento lembra mais uma dança do que um andar ou corrida típicos, mas a velocidade é alarmante, embora difícil de estimar corretamente à distância.\n\nA fisiologia única de um aigamuxa torna difícil pegar a presa, e a maioria dos aigamuxas está constantemente faminta. Ao perseguir a presa, um aigamuxa precisa parar ocasionalmente para erguer os pés a fim de retomar o rumo. A maioria fica de mãos no chão enquanto olha em volta, o que lhes permite imediatamente dar um salto mortal de volta à corrida. Os olhos de um aigamuxa são em geral resistentes às areias dos habitats nativos de deserto, mas irritantes como pimentas ou estrepes podem prejudicar seriamente a habilidade de caça, e viajantes do deserto muitas vezes carregam um saco desses para o caso de precisarem lidar com um aigamuxa.\n\nAigamuxas espertos sabem que atacar presa errante pode ser muito perigoso, e em vez disso usam as mãos poderosas para cavar fundo em dunas de areia ou terra e esperar para emboscar quem passa. Aigamuxas são particularmente bons em esconder-se nos ambientes natais, e viajantes infelizes muitas vezes não notam os olhos quase invisíveis de um aigamuxa até ser tarde demais.",
    "sections": [
      {
        "id": "the-first-aigamuxas",
        "title": "Os Primeiros Aigamuxas",
        "body": "Histórias dizem que aigamuxas um dia foram gigantes que fizeram uma aposta com Lamashtu, afirmando que conseguiriam permanecer apoiados nas mãos por mais tempo que qualquer outra criatura. Lamashtu produziu um simples chimpanzé, apontou para os pés e os chamou de mãos. Os gigantes não conseguiram manter as posições e caíram. Lamashtu moveu os olhos para os pés e disse-lhes: \"Se desejam gabar-se da habilidade, que isto seja a bênção de vocês.\""
      }
    ]
  },
  "creature-animate-dream": {
    "description": "Um sonho animado coalesce de séculos de fragmentos errantes de devaneio e sonho deixados para trás enquanto mentes adormecidas derivam pela Dimensão dos Sonhos. Na maioria dos casos, esses fragmentos simplesmente se dispersam por conta própria, mas quando sonhadores fogem de pesadelos de volta ao mundo da vigília, esses fragmentos podem ganhar uma vida sobrenatural própria. Têm pouco raciocínio e intenção, salvo buscar fragmentos semelhantes, absorvê-los e crescer. Quando o bastante deles se reúne, fundem-se numa forma hedionda como um sonho animado.\n\nIndividualmente, sonhos animados podem ter uma variedade ampla de aparências, mas a maioria assume formas rudimentares semelhantes às formas vivas das mentes que os geraram. Sonhos animados que surgem de humanoides adormecidos, os mais comumente encontrados, assim aparecem humanoides, mas com formas distorcidas e de pesadelo que incorporam membros torcidos adicionais e feições aterrorizantes. Nessas formas, sonhos animados acham o caminho para fora das Terras dos Sonhos e para o mundo da vigília, só para descobrir que não têm como voltar e sofrem uma fome implacável que só pesadelos novos podem saciar.\n\nUm sonho animado prospera no terror alimentado por pesadelos e medo e usa as habilidades sobrenaturais para invocar tais sentimentos nas mentes das vítimas, amaldiçoando a presa ao criar um vínculo permanente com os sonhos daquele indivíduo. Daí em diante, a vítima é sujeita a toda sorte de pesadelos recorrentes. Conforme os pesadelos continuam, a vítima acha cada vez mais difícil permanecer acordada. No fim, a vítima mergulha num sono amaldiçoado do qual não pode voltar. Essas vítimas fornecem ao sonho animado a forma mais pura de medo e são o sustento preferido.\n\nUm sonho animado pode subsistir do medo ambiente gerado por pesadelos regulares, mas esses medos menores não são tão satisfatórios, muitas vezes empurrando o sonho animado a buscar vítimas novas. Deixado sem uma fonte de medo, um sonho animado não morrerá de fome, mas ficará cada vez mais violento e desesperado. Sonhos animados famintos são os mais frequentemente encontrados, pois foram forçados a abandonar a sutileza para perseguir métodos mais evidentes de colher medo. Porém, tais sonhos animados também tendem a ser os menos poderosos de sua espécie. Os que engordaram metafisicamente de medo em geral o fizeram ao adotar um tema específico de pesadelo, como ser enterrado vivo, ser arrastado por ondas do oceano ou ser consumido por feras selvagens. Tais sonhos animados muitas vezes têm magias inatas de tema semelhante para aumentar os poderes.",
    "sections": [
      {
        "id": "enslaved-dreams",
        "title": "Sonhos Escravizados",
        "body": "Sabe-se que bruxas-cuco escravizam sonhos animados, forçando-os a alimentar-se de si mesmos. Esses cativos decompõem-se numa essência de medo usada nos rituais da bruxa."
      }
    ]
  },
  "creature-denizen-of-leng": {
    "description": "Viajantes e saqueadores da dimensão fria e varrida pelo vento de Leng, essas criaturas malévolas de forma humana cruzam a realidade em navios negros ominosos capazes de navegar além das fronteiras de dimensões e planos. Embora a maioria dos habitantes de Leng busque conquista e riquezas, outros operam como autoproclamados embaixadores e mercadores, semeando discórdia com tramas de longo alcance. Embora os inescrutáveis habitantes vistam-se de robes fluidos, véus e turbantes largos para parecer humanos, a fisiologia aberrante, quando vislumbrada, é evidente desde a coroa de chifres curtos e mandíbulas tentaculares até as pernas peludas semelhantes às de uma cabra.\n\nHabitantes de Leng são muitas vezes altamente inteligentes e podem ser encontrados aconselhando ou cutucando tanto os poderosos quanto os humildes. Se há algum propósito nisso além dos interesses próprios de um habitante de Leng individual, até agora não houve sinal. A maioria parece perfeitamente genuína no conselho, embora em geral careça de qualquer coisa que se assemelhe a moral.\n\nAcima dos capitães ferozes que comandam os infames navios negros há uma casta ainda mais alta de habitantes de Leng. Esses ocultistas e músicos servem de sumos sacerdotes, labutando para aplacar os deuses pavorosos que olham para o Reino do Pesadelo com malícia fria.",
    "sections": [
      {
        "id": "leng",
        "title": "Leng",
        "body": "Conhecido de várias formas como o Reino do Pesadelo ou o Terror Além dos Sonhos, o Planalto congelado de Leng ergue-se física e espiritualmente acima das Terras dos Sonhos. Ao mesmo tempo parte daquela dimensão e uma corrupção dela, Leng é um reino habitado por horrores arcanos estranhos e governado pelos deuses antigos desses horrores."
      }
    ]
  },
  "creature-ghostly-mob": {
    "description": "Quando uma tragédia hedionda resulta em morte em massa, os espíritos inquietos dos numerosos mortos podem erguer-se como uma multidão fantasmal. Como outros fantasmas, multidões fantasmais muitas vezes não estão cientes de que estão mortas. Os espíritos presos na multidão podem tentar levar uma semelhança das vidas anteriores, mesmo que as memórias sejam fragmentárias e as formas sejam insubstanciais. Essa memória fragmentária gira em torno dos últimos momentos naquele local, o que compele os fantasmas a encenar por instinto esses últimos momentos, às vezes abrangendo de alguns minutos a dias inteiros. Quando um ou mais dos membros de uma multidão fantasmal são forçados a confrontar a natureza morta-viva, os espíritos reagem com dor e violência.",
    "sections": [
      {
        "id": "echoes-of-tragedy",
        "title": "Ecos da Tragédia",
        "body": "A tragédia específica que criou uma multidão fantasmal talvez altere as habilidades. Por exemplo, uma multidão fantasmal gerada de um incêndio talvez tenha Aperto Flamejante em vez de Mãos que Agarram, causando dano de fogo em vez de dano de vazio. Uma multidão fantasmal criada num terremoto talvez tenha Coro Abalador da Terra em vez de Coro Pavoroso, fazendo as vítimas vivas ficarem Atrasadas por 1 rodada em vez de Amedrontadas."
      }
    ]
  },
  "creature-girtablilu-sentry": {
    "description": "Sentinelas patrulham os arredores das comunidades girtablilu, vigiando ameaças externas como dracos do deserto, dragões coroa-da-tempestade ou partidas de aventureiros empenhadas em explorar de forma temerária os sítios sagrados dos girtablilus.",
    "sections": []
  },
  "creature-golem": {
    "description": "Há muito tempo, os sacerdotes de religiões antigas dominaram uma técnica para aproximá-los de seu deus: a animação de argila numa criatura viva. Esses seres de argila, chamados golems, são animados ao colocar um pedaço de papel com o nome do deus do sacerdote na boca do golem (ou, em alguns casos, ao entalhar uma palavra sagrada na testa do golem). Embora sejam inteligentes como resultado da bênção divina, golems em geral não agem a menos que lhes seja ordenado, e raramente têm a capacidade de fala, um presente que os deuses concederam só às próprias criações. Em vez disso, usam a inteligência para facilitar a comunhão do criador com seu deus em ritos divinos desconhecidos fora dos mais fiéis de uma religião.\n\nEm algumas comunidades oprimidas, golems servem de protetores contra violência externa, lutando como último recurso, mas visando primeiro a desarmar situações. Outras vezes, o golem opera como guardião de um templo ou auxiliar de uma pessoa santa. Em casos raros, sabe-se que golems entram em rampages quando não lhes é permitido um dia de descanso a cada semana. Esses rampages podem ser extremamente destrutivos para as comunidades que os golems de outro modo protegem, então os criadores devem esforçar-se para cuidar bem das criações.\n\nLendas de golems são diversas e difundidas pela região do Mar Interior e além. Algumas falam de poderes ainda mais estranhos concedidos ao golem, como a habilidade de invocar os espíritos dos mortos. Golems com tais habilidades são sem dúvida criados pelos sacerdotes mais santos, afinados com seu deus além do que a maioria dos mortais poderia esperar realizar.",
    "sections": [
      {
        "id": "temple-guardians",
        "title": "Guardiões de Templo",
        "body": "Golems têm sido usados para guardar e auxiliar em templos por toda a região do Mar Interior, embora se diga que se originaram no norte de Garund. Só seguidores de deidades sagradas podem criar golems, a maioria dos quais recebe vida de sacerdotes de Desna ou Shelyn, ou às vezes Casandalee."
      }
    ]
  },
  "creature-granite-glyptodont": {
    "description": "Esta criatura baixa e pétrea parece um tatu com o dorso largo e elevado e uma cauda semelhante a um mangual. O gliptodonte de granito não tem necessidade verdadeira de alimentar-se, como todos os elementais, mas parece permanecer depois de transformar a carne daqueles que calcifica, como se a mera proximidade da carne fossilizando em pedra lhe agradasse de algum modo.",
    "sections": []
  },
  "creature-hadrinnex": {
    "description": "Os bizarros hadrinnexes lembram mais sistemas defensivos do que criaturas vivas. Evoluem a um ritmo acelerado, mas só contra ataques específicos contra eles, o que sugere que foram criados por tecnologia avançada ou magia. O casco que envolve um hadrinnex — flocos de metal suspensos numa carapaça orgânica maleável — se remodela em resposta ao dano. O mesmo pode fazer uma glândula brilhante no tórax da criatura, que coleta energia e reestrutura a biologia para protegê-la dessa energia. Esse órgão é frágil e se rompe logo depois que um hadrinnex é morto.\n\nHadrinnexes têm só um intelecto rudimentar e em geral seguem aberrações mais inteligentes. Como guarda-costas ou peões, executam tarefas simples com diligência. Embora fracos em resolução de problemas e improvisação, a confiabilidade e a fisiologia adaptativa dos hadrinnexes os tornam ideais para tarefas perigosas em ambientes hostis.",
    "sections": [
      {
        "id": "hibernation-pods",
        "title": "Cápsulas de Hibernação",
        "body": "Hadrinnexes podem ser encontrados hibernando em áreas remotas, os cascos moldados em cápsulas ovoides. Essas cápsulas em geral ficam centradas em crateras, sugerindo que o hadrinnex caiu de cima. Sair da hibernação leva 2 meses enquanto extrude os membros e reinicia os processos biológicos. Isso pode ser acelerado com um influxo diário de energia para a glândula de energia."
      }
    ]
  },
  "creature-magma-scorpion": {
    "description": "Quer escaravatem por ermos Chtonianos quer se aquecem na areia escaldante dos desertos mais profundos, os escorpiões de magma têm carapaças carbonizadas, emitindo sem parar ondas de calor que distorcem a visão.",
    "sections": []
  },
  "creature-mix-coatl": {
    "description": "Mix coatls (pronuncia-se \"meesh\") são guias de sociedades nascentes, fornecendo informação fundamental como técnicas de cultivo, expertise medicinal ou saber mais esotérico como as artes arcanas.",
    "sections": []
  },
  "creature-nosferatu-thrall": {
    "description": "Servos nosferatu são mortais vinculados à vontade de um nosferatu. Embora os servos não sejam mortos-vivos, permanecem vivos alimentando-se do sangue dos mestres.",
    "sections": []
  },
  "creature-procyal": {
    "description": "Como os mais caprichosos e brincalhões dos agathions, procyals são os mais propensos a ser encontrados no Universo, ensinando lições filosóficas profundas e entregando sabedoria por meio de peças e impersonações. Travessos e brincalhões, esses humanoides de cabeça de guaxinim adoram socializar com mortais e aprender sobre as sociedades. Diferente dos equivalentes mortais, a pelagem dos procyals começa ruiva-escura, cedendo lugar a mosqueados cinza e brancos no focinho conforme envelhecem. Só os líderes procyal ostentam a coloração cinza e preta nítida de um guaxinim verdadeiro. Quem reconhece a idade e a sabedoria dos procyals trata essas criaturas com grande respeito.\n\nSeja qual for a aparência natural, procyals são metamorfos excelentes e podem assumir a forma de qualquer humanoide que tenham encontrado. Usam essa habilidade só para o bem maior daquele humanoide ou da comunidade, muitas vezes aparecendo como o mentor de confiança de alguém para entregar uma mensagem importante de forma mais descontraída do que falar com um guaxinim celestial mágico. Não estão acima de pregar a peça inofensiva ocasional na pessoa cuja forma assumiram, sobretudo quando podem usá-la para ensinar uma lição valiosa. Agathions guaxinim preferem usar uma lâmina se forçados ao combate, mas estão preparados para usar as garras e lutar sujo se necessário.",
    "sections": [
      {
        "id": "procyals-and-societies",
        "title": "Procyals e Sociedades",
        "body": "Embora nascidos das almas dos iluminados como outros agathions, procyals derivam o valor central de capricho de verdadeiramente entender o equilíbrio delicado entre sociedade e indivíduo. Esses celestiais espertos preferem capacitar comunidades sob ataque a extinguir as ameaças profanas e prosperar por conta própria."
      }
    ]
  },
  "creature-skittering-slayer": {
    "description": "Quando os últimos pensamentos de um guerreiro são de sede de sangue, o corpo pode ficar tão impregnado de fúria que infecta o que quer que coma o cadáver. Essa emoção singular une o enxame resultante, combinando a vontade de sobreviver dos insetos com a fúria imortal de um berserker, criando um combatente indomável. Muitas vezes feitos de baratas ou insetos igualmente tenazes, matadores rastejantes raramente desenvolvem planos de longo prazo, em vez disso escaravando em busca de refúgios escuros e lutas apaixonadas. Esses andadores de enxame tendem a evitar transformar-se na forma de enxame, preferindo enfrentar os inimigos diretamente sempre que possível.",
    "sections": []
  },
  "creature-two-headed-troll": {
    "description": "Depois de um ferimento particularmente grave na cabeça, um troll pode regerar duas cabeças, cada uma assumindo fragmentos da personalidade antiga e das responsabilidades sobre o corpo. Como partes separadas de um todo, as cabeças acham difícil concordar em qualquer coisa além das tarefas mais básicas. Essas tarefas em geral envolvem reunir comida para satisfazer duas bocas, mesmo que compartilhem um único estômago cavernoso. Contos pavorosos dos apetites vorazes dos trolls de duas cabeças são sussurrados em sítios por todas as terras do Mar Interior. É costume os pais invocarem o troll de duas cabeças como advertência a crianças desobedientes. \"Termine as tarefas\", um pai pode dizer a uma criança teimosa, \"ou um troll de duas cabeças vai te arrebatar à noite e te engolir inteiro!\" Não está claro por que uma tradição tão mórbida ganhou tração, mas é fato inegável que trolls de duas cabeças têm apetite por \"petiscos\" — criaturas pequenas o bastante para devorar de uma só dentada.",
    "sections": [
      {
        "id": "severed-spiral",
        "title": "Espiral Decepada",
        "body": "Embora a maioria dos trolls de duas cabeças tenha dificuldade de enxergar além da confusão e da fúria, alguns fundaram uma fé nuançada emulando os deuses dualistas Gozreh, Nethys e Pharasma. A filosofia obscura busca esclarecimento em menires de pedras pretas e brancas, mais notavelmente a Espiral Decepada em Mendev."
      }
    ]
  },
  "creature-tylosaurus": {
    "description": "Embora grandes em tamanho — às vezes ultrapassando 12 m — os tilossauros têm corpos esguios e focinhos longos e estreitos. Poucas criaturas competem com eles no ambiente, pois a maioria dos outros gigantes aquáticos reside em águas mais profundas.",
    "sections": []
  },
  "creature-adlet": {
    "description": "Adlets habitam os recantos mais distantes e duros da Crown of the World, com alguns viajando além para regiões igualmente gélidas em outros continentes. À primeira vista, esse povo isolado parece muito com os primos humanos Erutaki; em geral têm cabelo liso e preto e compleição compacta e poderosa. Porém, adlets tendem a mover-se com mais graça que os parentes humanos. De perto, a estranheza se revela, pois cada um tem um rosto peludo e ostenta uma goela cheia de dentes semelhantes aos de lobo. As pernas e as caudas lembram as de cães.\n\nAs lendas dos adlets dizem que há muito tempo um caçador poderoso perdeu-se longe de casa e deparou com uma casa de osso de baleia e gelo. Uma mulher vestida de peles de raposa branca o saudou, o alimentou e cuidou das geadas. Com o tempo, casaram-se e tiveram 10 filhos, cinco dos quais nasceram com as pernas e as caudas de raposas. Essas crianças ficaram com a mãe, enquanto os outros cinco — nascidos com as pernas e as caudas de lobos — viajaram com o pai de volta às terras humanas e tornaram-se os primeiros adlets.\n\nA maioria dos adlets não é inerentemente má, mas a cultura é belicosa, xenofóbica e notavelmente carente de humildade. Veem-se como os governantes naturais dos ermos árticos e encaram todos os outros como ocupantes na melhor das hipóteses e invasores na pior. Um adlet típico é mais forte e mais rápido que qualquer humano mundano, com a habilidade de andar nu numa nevasca e evocar névoas geladas. Diante disso, pouco admira que adlets tenham desenvolvido algo como um complexo de superioridade. Ainda assim, embora investidas adlet sejam um problema comum para viajantes na Crown of the World, um punhado de mercadores astutos e destemidos forjou relações pacíficas com certas comunidades adlet ao longo de rotas mais comuns.",
    "sections": [
      {
        "id": "lost-cousins",
        "title": "Primos Perdidos",
        "body": "Lendas sobre as origens dos adlets sugerem que possam ter parentes semelhantes a raposas. Alguns acreditam que esses parentes sejam kitsune, enquanto outros apontam os vulpinals mais poderosos como progenitores mais prováveis."
      }
    ]
  },
  "creature-animated-furnace": {
    "description": "Esta forja ou forno enorme é animado para proteger um espaço de trabalho ou cozinha, viajar ao lado do dono, ou ambos.",
    "sections": []
  },
  "creature-blood-painter": {
    "description": "Simultaneamente enamorados do mundo natural e ainda assim alienígenas demais para sobreviver nele, pintores de sangue são artistas de oito membros que espreitam, matam e desmembram em busca de pigmento e sustento ao mesmo tempo. A fisiologia do pintor de sangue não consegue digerir comida típica, então as criaturas alimentam-se colhendo sangue e usando-o para pintar e animar algo comestível.\n\nQuando não estão na caçada, pintores de sangue buscam vistas belas, que admiram placidamente pelos olhos nas mãos dos membros superiores e então reproduzem em tela. Arte excepcional fascina sem fim essas criaturas, e dançarinos e pintores hábeis ocasionalmente escapam das aberrações criando uma obra nova para trocar pelas vidas. Pintores de sangue guardam com ciúme essas obras, e boa parte do tesouro consiste de arte. Pintores de sangue tendem a arquitetar o roubo periódico de obras-primas.",
    "sections": [
      {
        "id": "apocryphal-origins",
        "title": "Origens Apócrifas",
        "body": "Apesar das origens misteriosas dos pintores de sangue, a teoria predominante insiste que o primeiro surgiu de shelinitas excessivamente zelosos tão devotos à arte que cessaram de comer e dormir, por fim transformando-se em aberrações que só conseguiam alimentar-se da própria arte. Alguns acreditam ser possível \"curar\" um pintor de sangue, restaurando as memórias e a forma originais da criatura amaldiçoada."
      }
    ]
  },
  "creature-desert-giant": {
    "description": "Gigantes do deserto são humanoides nômades que habitam as regiões mais áridas do mundo desde tempos imemoriais. Povos menores sabem que gigantes do deserto são os mestres indiscutíveis da vida no deserto. As tradições culturais fortes dos gigantes do deserto desempenham grande papel na capacidade de prosperar em ambientes tão duros. Anciãos dos gigantes do deserto encorajam os descendentes a manter estilos de vida abstêmios, sobretudo quanto ao consumo de comida e bebida. A maioria dos gigantes do deserto segue uma dieta vegetariana simples e mantém um mapa interno incrível dos cursos d'água sazonais e oásis da região natal. Gigantes do deserto têm 4,5 m de altura, tendendo a físicos magros ideais para viajar por vastas expansões de areia em longas jornadas.",
    "sections": [
      {
        "id": "oasis-protectors",
        "title": "Protetores de Oásis",
        "body": "Agudamente conscientes do ecossistema frágil dos ambientes nativos, gigantes do deserto protegem com fúria os poços d'água prediletos e os oásis ancestrais contra recém-chegados que possam devastar a flora local ou afugentar a fauna escassa. Quem os convence de que não pretende mal é bem-vindo, e há contos de que ajudam os feridos pela dureza do deserto."
      }
    ]
  },
  "creature-garuda": {
    "description": "Garudas são humanoides alados criados para servir deuses sagrados e outros seres celestiais poderosos. Originalmente nascidos entre os planos celestiais, garudas por fim espalharam-se além, com muitos abrindo caminho até o Universo mortal. Como servos divinos, os papéis primários das garudas são como protetores, defendendo sítios sagrados e figuras divinas importantes como sumos sacerdotes.\n\nO papel mais importante que uma garuda serve é como meio de transporte. As primeiras garudas serviram de montarias para os deuses, carregando-os pelos céus e para o combate. Essa tradição continua hoje, com garudas servindo de bom grado como montarias para campeões, clérigos e outros escolhidos divinos. Ocasionalmente, um deus pede a uma garuda que rastreie um dos seguidores do deus. A garuda declara servidão ao seguidor, agindo como guardiã e transporte pelo tempo que o deus decretar.",
    "sections": [
      {
        "id": "sun-borne-servants",
        "title": "Servos Nascidos do Sol",
        "body": "Segundo os contos antigos, as primeiras garudas nasceram de ovos celestiais mantidos aquecidos no coração do sol. Esses ovos incubaram por centenas de anos. A maioria dos ovos eclodiu em momentos diferentes, revelando vários tipos de criaturas celestiais, mas a última ninhada de ovos permaneceu, esperando pacientemente até que lhes ordenassem abrir. Uma vez que cento e oito vidas se passaram, os deuses retornaram ao sol e mandaram que as garudas nascessem. Vendo que eram obedientes mesmo antes do nascimento, os deuses fizeram das garudas seus servos abençoados."
      }
    ]
  },
  "creature-hesperid": {
    "description": "Hespérides são ninfas do pôr do sol, guardiãs dos tons dourados coloridos do sol poente. Vivem em ilhas remotas, falésias costeiras isoladas e vales ocultos, todos lugares onde o brilho dourado do pôr do sol pode ter o efeito mais forte. Hespérides manipulam a luz solar com movimentos semelhantes a dança, permitindo-lhes criar fitas graciosas de luz a curta distância e raios abrasadores à distância. Devido à conexão com a beleza do ciclo diário do sol poente, hespérides extraem satisfação profunda de rotina metódica que pode parecer alienígena a fey mais selvagens e caóticos.",
    "sections": []
  },
  "creature-jyoti": {
    "description": "Jyotis às vezes são chamados \"fênix falsas\" (termo que acham insultuoso) pelos ignorantes ou voluntariosos. Esses humanoides avianos são nativos da Forja da Criação, onde são os zeladores das flores cristalinas do tamanho de árvores no Jardim da Forja da Criação. Essas manifestações físicas de almas mortais que ascenderam à divindade são protegidas e veneradas pelos jyotis. Raramente deixam esse reino enigmático e veem visitantes de outros planos como manchas na pureza do lar. Jyotis desconfiam em especial de conjuradores divinos e guerreiros religiosos, vendo-os como inclinados a tomar crédito por manifestar uma força vital que, da perspectiva de um jyoti, é tão abundante e ubíqua quanto a água é para os peixes.\n\nApesar da desconfiança de intrusos, jyotis raramente atacam sem provocação quando os lares não estão ameaçados. Porém, não toleram intrusos na morada palaciana de luz cristalizada e chama capturada. Muitas vezes expulsam até aqueles que vêm trazendo presentes; poucos visitantes têm qualquer coisa que desejem, pois o que mais desejam é ser deixados em paz. A ira plena dos jyotis é reservada a nativos do Mundo Inferior e do Vazio. Historicamente, a promessa de batalha com os sceaduinars semelhantes a gárgulas, a quem consideram dever opor-se, foi a única coisa a atrair exércitos jyoti para além da Forja da Criação.",
    "sections": [
      {
        "id": "crystal-vaults",
        "title": "Cofres de Cristal",
        "body": "Jyotis fazem guardiões ideais para artefatos perigosos demais para serem deixados onde os famintos de poder possam tomá-los. Só eles sabem quais itens de mito e lenda, há muito dados como perdidos ou destruídos, jazem dentro dos cofres de cristal. São, porém, guardiões pouco confiáveis de artefatos religiosos, que em geral os enojam."
      }
    ]
  },
  "creature-khravgodon": {
    "description": "Poucas criaturas conseguem ignorar o ácido de um ankhrav e triturar-lhe a quitina como um khravgodon.",
    "sections": [
      {
        "id": "tail-tales",
        "title": "Contos da Cauda",
        "body": "Uma lenda kellid sustenta que o khravgodon um dia teve uma cauda bela coberta de pelo denso e brilhante. Certa noite, o khravgodon adormeceu ao ar livre, depois de dançar a noite inteira ostentando a cauda bela. Quando despertou, ankhravs tinham roído todo o pelo da cauda do khravgodon, deixando-o com o apêndice careca que vemos hoje. Khravgodons vingam-se dos ankhravs desde então."
      }
    ]
  },
  "creature-kithangian": {
    "description": "O kithangian — uma amálgama horrenda de cavalo e escorpião também conhecido como \"demônio-fera\" — é um infernal hediondo nascido das almas de mortais que abusaram e atormentaram animais em vida. Kithangians tendem a vaguear áreas selvagens repletas de animais para torturar, embora assentamentos humanoides com muitos animais de estimação ou gado também se tornem terrenos de caça tentadores. Incontestada por tempo demais, a presença de um kithangian tem uma influência corruptora sobre a fauna local, que gera monstruosidades infernais até que o demônio seja vencido. Se percebe que está sendo rastreado por druidas vingativos ou matadores de demônios, um kithangian assume a forma de um animal discreto para pegar os perseguidores de surpresa.",
    "sections": [
      {
        "id": "demon-hunters",
        "title": "Caçadores de Demônios",
        "body": "Recobradores da Sarkoris Scar que seguem a Fé Verde consideram kithangians inimigos particularmente hediondos. Extraem satisfação sombria de caçar e abater tais demônios, vendo o extermínio como vingança justa pelos males que esses demônios visitam à fauna."
      },
      {
        "id": "demon-hunters",
        "title": "Caçadores de Demônios",
        "body": "Recobradores da Sarkoris Scar que seguem a Fé Verde consideram kithangians inimigos particularmente hediondos. Extraem satisfação sombria de caçar e abater tais demônios, vendo o extermínio como vingança justa pelos males que esses demônios visitam à fauna."
      }
    ]
  },
  "creature-pakalchi": {
    "description": "Pakalchis esforçam-se para intensificar a insegurança inerente das presas quanto a laços pessoais e emocionais, jogando com a ameaça de esses relacionamentos caírem em ruína. Esses sahkils estão entre os mais manipulativos de sua espécie, puxando cordas tanto literais quanto figuradas nas vítimas ao longo de períodos prolongados, exultando no desespero e no medo pelo maior tempo possível.",
    "sections": []
  },
  "creature-shoki": {
    "description": "Shokis pastoreiam almas extraviadas até o Ossário. Têm grande orgulho em viajar ao Universo (e às vezes além) para caçar aqueles que evadiram o julgamento de Pharasma, quer sejam inimigos maliciosos ou mortos-vivos infelizes. Um shoki muitas vezes é transportado para mais perto da presa por um psicopompo mais poderoso, mas tem a habilidade de retornar uma vez que completou a missão.\n\nUm shoki lembra um humanoide envelhecido com pele negro-azeviche, chifres de carneiro enrolados e uma grande concha de caracol nas costas. Alguns acreditam que um shoki guarda almas dentro dessa concha para transporte de volta ao Ossário, enquanto na realidade esse poder reside no cajado infundido.",
    "sections": [
      {
        "id": "tools-of-the-trade",
        "title": "Ferramentas do Ofício",
        "body": "Shokis utilizam inúmeras ferramentas para auxiliar no trabalho, incluindo símbolos religiosos, magia, cajados que aprisionam almas e falsa empatia — embora shokis despejem discursos apaixonados e joguem com as emoções mortais, não nutrem compaixão pelos mortos."
      }
    ]
  },
  "creature-tennin": {
    "description": "Artesãos celestiais e dançarinos elegantes chamados tennins servem como atendentes de Nirvana, onde tecem as vestes maravilhosas e sem costura dos deuses a partir de nuvens e geada e entretêm as cortes com danças voltadas ao céu, os passos mais leves que o orvalho. Durante guerras catastróficas e desastres, tennins descem de Nirvana para consertar o que está quebrado e acalentar os que sofrem. O reino de Nirvana muitas vezes promove as almas virtuosas de artesãos diligentes e músicos dedicados às fileiras dos anjos de brocado para que possam usar os talentos para trazer beleza e bondade a um Universo sobrecarregado pela guerra.\n\nParece que sempre houve tennins de menos para atender às necessidades de um mundo inteiro. Tragicamente, os números estão minguando na esteira da morte de Gorum, que inflamou e renovou inúmeros conflitos. Muitos anjos caíram ou perderam o caminho em meio à discórdia.",
    "sections": [
      {
        "id": "tragedies-of-two-worlds",
        "title": "Tragédias de Dois Mundos",
        "body": "Anjos de brocado muitas vezes se enredam em relações românticas com mortais, sobretudo com indivíduos virtuosos que compartilham metas igualmente elevadas. Esses casos raramente correm bem, pois os deveres intermináveis do Céu têm precedência sobre as alegrias e os confortos do coração. Ainda assim, alguns tennins já foram conhecidos por descartar os _xales celestiais impecáveis_ para ficar com os amantes. Contos mais sombrios também existem de mortais inescrupulosos tomados pelo desejo ou pela ganância, que roubam esses xales para forçar os anjos a ficar ou a servi-los."
      }
    ]
  },
  "creature-tyrannosaurus-skeleton": {
    "description": "Um predador dinossauro maciço faz um esqueleto temível.",
    "sections": []
  },
  "creature-war-wraith": {
    "description": "Esses restos espirituais ameaçadores de senhores da guerra vis ou generais sedentos de sangue são espectros imponentes de sombra e morte. Como outros espectros, espectros de guerra assombram os lugares sombrios do mundo, mas são mais propensos a viajar distâncias maiores para semear terror ou acumular influência, muitas vezes atendo-se a clareiras escuras ou ruínas sinistras ao atravessar terras salpicadas de sol. Espectros de guerra tendem a ser arrogantes e raramente formam uma matilha com outros da própria espécie, preferindo em vez disso dominar grupos de espectros comuns. Um necromante particularmente poderoso pode compelir matilhas de espectros de guerra ao serviço. Porém, uma meta particularmente malévola — como erradicar um bastião de luz e vida — pode reunir vários espectros de guerra num propósito comum.\n\nOrigens dos Espectros de Guerra\n\nNem todo espectro de guerra foi um dia um indivíduo. Muitos coalescem com o tempo, fundindo-se de múltiplos espectros onde almas perdidas se acumulam e têm os espíritos e as consciências cortados ou minados de algum modo. Esses espectros de guerra tendem a pensar e comunicar-se não como um ser potente, mas como um tumulto de vozes — muitas vezes em conflito, mas verdadeiramente de arrepiar os ossos quando concordam em trabalhar em uníssono. Em locais onde a energia do Vazio se concentra, como no Vazio ou na Isle of Terror, espectros de guerra formam-se desse modo com frequência.",
    "sections": [
      {
        "id": "war-wraith-origins",
        "title": "Origens dos Espectros de Guerra",
        "body": "Nem todo espectro de guerra foi um dia um indivíduo. Muitos coalescem com o tempo, fundindo-se de múltiplos espectros onde almas perdidas se acumulam e têm os espíritos e as consciências cortados ou minados de algum modo. Esses espectros de guerra tendem a pensar e comunicar-se não como um ser potente, mas como um tumulto de vozes — muitas vezes em conflito, mas verdadeiramente de arrepiar os ossos quando concordam em trabalhar em uníssono. Em locais onde a energia do Vazio se concentra, como no Vazio ou na Isle of Terror, espectros de guerra formam-se desse modo com frequência."
      }
    ]
  },
  "creature-behemoth-hippopotamus": {
    "description": "Hipopótamos behemoth são onívoros e muitos apreciam o gosto da carne.",
    "sections": []
  },
  "creature-champion-automaton": {
    "description": "Os artífices de Jistka fabricaram autômatos guerreiros para lutar nas linhas de frente dos exércitos, e nessa meta sucederam admiravelmente. Combatentes brutais e eficazes, autômatos campeões contêm as almas dos melhores dos exércitos do Império, seus soldados mais dedicados e oficiais respeitados, todos tornados mais letais do que nunca nos corpos de metal e magia.",
    "sections": []
  },
  "creature-einherji": {
    "description": "Einherjar são guerreiros poderosos escolhidos por valquírias entre as fileiras daqueles mortos em batalhas terríveis e lendárias. Forjados das almas dos maiores guerreiros, os implacáveis einherjar servem como soldados de infantaria de panteões, hábeis em combate corpo a corpo e em matar gigantes.\n\nEinherjar muitas vezes vêm de culturas guerreiras, inclusive vikings Ulfen (como o einherji representado nesta entrada), piratas particularmente ferozes das Correntes, e até conquistadores Osirian. Podem ser escolhidos de onde quer que a guerra e o poder prevaleçam; muitas deidades que têm o chamado da batalha e a busca do poder físico como mais sagrados do que conceitos de bem e mal podem contar guerreiros einherjar e valquírias escolhedoras dos mortos entre os servos escolhidos. Por exemplo, Gorum, Besmara e Sekhmet todos elevaram adoradores caídos como einherjar. Einherjar dedicados a deidades diferentes muitas vezes empunham armas ou possuem aparências cosméticas variadas com base na arma predileta da deidade e no lugar da morte; porém, são universalmente firmes, implacáveis e eficientemente letais. Einherjar com armas de duas mãos ou que surgem de outras origens muitas vezes têm habilidades diferentes no lugar de Jotun Slayer e Instant Repair.",
    "sections": [
      {
        "id": "the-final-battle",
        "title": "A Batalha Final",
        "body": "Independentemente da deidade a que sirvam, todos os einherjar seguem certas crenças e mitologias. Afirmam que, nos últimos dias da existência, Pharasma julgará a última alma e acenderá o início de uma existência nova. Einherjar acreditam que estarão entre as últimas almas restantes antes desse evento, lutando ao lado dos deuses contra as forças da entropia. Para os einherjar, a vitória nessa guerra — definida como destruição mútua completa — é o único jeito de assegurar uma transição adequada para a existência nova."
      }
    ]
  },
  "creature-feathered-bear": {
    "description": "Nascidos de espíritos que possuem as qualidades de força, resistência e ferocidade, esses guias espirituais atuam como guardiões marciais para mortais sob seus cuidados. A maioria tem ódio ardente por demônios, diabos e outros capetas que se alimentam das fraquezas mortais. Porém, também demonstram cuidado e consideração em torno de crianças mortais, que por sua vez parecem reconhecer instintivamente os seres como protetores. A força toma muitas formas, algumas evidentes no poder — como o urso emplumado — e algumas despretensiosas.",
    "sections": []
  },
  "creature-gug": {
    "description": "A feição mais horrenda de um gug é a cabeça em forma de barril, que se fende na vertical para revelar inúmeras fileiras de dentes amarelos e afiados e uma garganta aberta. Os olhos de cada lado da cabeça-mandíbula são pequenos, mas aguçados. Cristas ósseas protegem os olhos do debater frenético da presa, pois prefere refeições de carne crua e contorcida a fungos e mofos. Agarra essa presa com braços poderosos que se fendem no cotovelo num par de antebraços, dando-lhe quatro patas garradas. Esses brutos monstruosos são cobertos de pelo negro e eriçado, muitas vezes incrustado de sangue e vísceras.\n\nEmbora gugs possam parecer bestiais, têm intelectos aguçados e vis. Gugs fazem covil bem no subterrâneo, mas às vezes vêm à superfície para caçar durante noites escuras, sozinhos ou em grupos pequenos. Como possuem apetites vorazes, a maioria dos gugs consome as criaturas que pega, mas alguns em vez disso sequestram as vítimas e recuam abaixo da superfície, deixando só um fedor persistente e pegadas estranhas de patas garradas. As vítimas são levadas a covis râncidos marcados com runas estranhas e sacrificadas aos deuses vis dos gugs de sangue, escuridão e pesadelos. Rumores pavorosos falam de cidades de gug sem luz feitas de blocos titânicos de pedra bem no subterrâneo, onde líderes gug poderosos pregam as doutrinas vis a multidões de gugs uivantes.\n\nGugs têm um relacionamento estranho com carniçais, que parece datar da origem compartilhada num mundo subterrâneo distante. Gugs vivem com medo de carniçais, apesar de se erguerem sobre eles; porém, esse medo estranho não se aplica a ghasts, a quem gugs consomem tão vorazmente quanto fazem com outras criaturas.\n\nGugs têm 4,8 m de altura e pesam 900 kg, embora tenham um andar inquietante e gracioso que desmente o tamanho imenso. O passo leve e a habilidade de espremer-se por frestas muito pequenas fazem dos gugs bichos-papões comuns em contos de desaparecimentos estranhos ou massacres sangrentos.\n\nAlguns gugs particularmente sedentos de sangue ganham poderes pavorosos como dons dos patronos arcanos estranhos. Esses monstros são conhecidos como savants, nunca têm menos que 12º nível de poder, e ganham várias magias inatas ocultas. Embora a mistura precisa de magias de cada savant varie, normalmente essas magias concedem invisibilidade, oferecem poder para manipular e mudar rocha, ou invocam energias pavorosas e destrutivas sobre carne viva.",
    "sections": [
      {
        "id": "eldritch-gods",
        "title": "Deuses Arcanos Estranhos",
        "body": "Gugs tradicionalmente não fazem da religião e da fé uma parte central da sociedade, mas as cidades gug sempre apresentam templos proeminentes a deuses obscuros cuja fé desapareceu da vista na maioria dos mundos mortais. A maioria dos gugs certamente conhece entidades como Azathoth, Nyarlathotep e Yog-Sothoth, mas mesmo entre gugs esses Deuses Exteriores são mais temidos e respeitados do que alvo de preces."
      }
    ]
  },
  "creature-icewyrm": {
    "description": "Lembrando dragões serpentinos sem asas formados de gelo denteado e atravessados por veias de água quase congelada, esses elementais habitam icebergs e gostam de atacar navios ou criaturas que passam. São especialmente comuns em trechos gélidos de oceano no Plano da Água, onde icebergs se agrupam em ilhas enormes de gelo.",
    "sections": []
  },
  "creature-imentesh": {
    "description": "Os proteanos loquazes conhecidos como imenteshes servem como missionários, espiões e arautos do caos para promover a meta proteana da dissolução da realidade.",
    "sections": [
      {
        "id": "mouthpieces-of-chaos",
        "title": "Porta-vozes do Caos",
        "body": "Embora raramente encontrados no Universo, imenteshes frequentam centros interplanares de cultura e comércio. Imenteshes atuam como diplomatas em nome de qualquer coro a que reivindiquem lealdade. Podem oferecer viagem segura pelo Maelstrom ou até atuar como guias pelas Terras de Fronteira em constante mudança do Maelstrom."
      }
    ]
  },
  "creature-melody-on-the-wind": {
    "description": "Embora a melodia no vento, conhecida por alguns como um elemental da canção, possa apreciar a beleza da música, é por natureza uma força elemental destrutiva.",
    "sections": []
  },
  "creature-mobogo": {
    "description": "Mobogos são monstruosidades maciças habitando pântanos que combinam os piores aspectos de sapos gigantes e dragões maus. Preguiçosos, cruéis e gananciosos, essas criaturas vis fazem covis nos pântanos mais antigos e primordiais. Os boggards que chamam tais lugares de lar adoram mobogos como semideuses vivos, trazendo regularmente sacrifícios de comida e objetos de valor para não se tornarem as próximas vítimas dos apetites sem limites dos mobogos.",
    "sections": [
      {
        "id": "children-of-gogunta",
        "title": "Filhos de Gogunta",
        "body": "Boggards de Golarion acreditam que os mobogos chocaram da primeira ninhada de ovos postos por sua deusa demoníaca Gogunta, após o despertar dela no alvorecer da criação. Boggards, chocados milênios depois da segunda ninhada, foram encarregados de servir e auxiliar os irmãos mais velhos a manter os pântanos sagrados dela intocados pela presença de forasteiros."
      }
    ]
  },
  "creature-moon-hag": {
    "description": "Bruxas da lua são adivinhas poderosas que usam a vidência para semear caos e miséria. Diferente da maioria das bruxas, bruxas da lua em geral visam os medrosos e os ambiciosos, mas isso se deve principalmente a tais pessoas serem mais fáceis de manipular — as consequências das manipulações de uma bruxa da lua podem destruir famílias, desencadear guerras e arruinar nações. A forma verdadeira de uma bruxa da lua tem pele branco-giz, lábios enegrecidos e olhos brilhantes.",
    "sections": []
  },
  "creature-nosferatu-malefactor": {
    "description": "Malfeitores nosferatu espalham peste em seu rastro e anseiam por sangue mortal.",
    "sections": []
  },
  "creature-nymolus": {
    "description": "Alghollthus compartilham uma memória genética e são teoricamente capazes de recordar cada experiência remontando à existência do primeiro alghollthu, centenas de milhões de anos atrás.\n\nAcessar essas memórias todas de uma vez seria letalmente exaustivo para a maioria dos alghollthus, mas nymoluses são diferentes. Deleitam-se em acessar essa memória genética e acrescentam a ela roubando memórias de outros, transformando-as em cristais de memória. Um único nymolus pode armazenar até 10 cristais por vez dentro do cérebro, substituindo os mais mundanos conforme enchem esse armazenamento e guardando o resto em coleções entre os covis. Para coletar memórias, nymoluses aventuram-se mais longe dos mares do que alguns dos irmãos ao estabelecer vínculos simbióticos com ugothols. Conseguem coordenar-se com essas criaturas remodelando os corpos, então comprimindo e entrelaçando a carne nos ugothols, o que lhes permite buscar recordações raras e intrigantes.",
    "sections": []
  },
  "creature-sacristan": {
    "description": "Sacristãos são fracassos entre os velstracs, criaturas cujos corpos e mentes foram completamente quebrados pelos tormentos dos velstracs. Esses infelizes são montados de sucata de metal, carne sem nervos e pedaços de escuridão em agentes leais que extraem prazer extático de servir outros velstracs. Sacristãos são empoderados por um portal minúsculo para o Mundo Inferior no fundo das bocas. Distendendo as mandíbulas, podem uivar com os gritos e as tempestades de vento daquele plano. Sacristãos variam em aparência, mas têm o tamanho de humanos médios, se bem que mutilados. As feições são redundantes ou ausentes, e correntes farpadas e enferrujadas os envolvem.",
    "sections": []
  },
  "creature-swordkeeper": {
    "description": "Colecionadores que querem guardar os arsenais mágicos procuram ou constroem guardiões da espada. Esses construtos de múltiplos braços são em partes iguais vitrine e sistema de segurança, cada um guardando uma única arma dentro do corpo e projetando cópias da arma que armazena para dissuadir ladrões potenciais.",
    "sections": [
      {
        "id": "treasure-guardians",
        "title": "Guardiões de Tesouro",
        "body": "Embora o guardião da espada de exemplo conceda tesouro com base no nível, você pode usar um guardião da espada para fornecer aos PCs uma arma poderosa ou significativa — sobretudo um artefato ou relíquia. Para criar um guardião da espada com uma arma diferente, substitua o traço versátil P dos Golpes de eco-lâmina pelos da arma nova, mude os dados de dano da arma para corresponder e aplique quaisquer runas. A menos que queira mudar significativamente o nível do guardião da espada, você também deve ajustar o dano do Golpe para garantir que não fique alto ou baixo demais."
      }
    ]
  },
  "creature-water-orm": {
    "description": "Essas criaturas lendárias à espreita em lagos remotos sempre parecem achar o caminho até os contos de taverna das comunidades à beira dos lagos. Para alguns viajantes, todo lago de tamanho respeitável parece cercado de vilas cheias de pescadores que afirmam ter avistado um orm aquático. Essas criaturas elusivas habitam lagos sobretudo em regiões frias e sombrias. Alguns afirmam que orms aquáticos são um desdobramento de serpentes marinhas e linnorms, mas nenhum vínculo credível entre essas criaturas foi encontrado.\n\nOrms aquáticos têm muitas feições que serpentes marinhas não têm, como a habilidade de entender os rudimentos da linguagem. A inclinação natural de evitar contato e permanecer ocultos muitas vezes permanece em desacordo com a curiosidade igualmente compulsiva por aqueles que possam espiar nas margens dos lagos. Avistamentos de orms aquáticos em geral ocorrem quando não conseguem evitar erguer-se à superfície para dar uma espiada em alguém (ou algo) particularmente incomum na praia ou flutuando na superfície da água.\n\nEssas criaturas são extremamente longevas e podem passar décadas, ou até séculos, com muito pouco para comer. Isso permite que orms aquáticos subsistam em lagos sem emergir por muitos anos, mesmo em corpos de água doce sem fontes de alimento amplas. Orms aquáticos podem jazer num leito siltoso de lago por anos, a elusividade só contribuindo para a reputação mítica. Quando um animal de estimação ou uma criança desaparece perto de um lago, rumores podem sustentar que o orm aquático local é responsável, levando a contos folclóricos que advertem os residentes contra aventurar-se sozinhos perto da água.\n\nEmbora a maioria dos orms aquáticos seja descrita como répteis serpentinos ou de pescoço longo, outros parecem semelhantes a focas ou baleias bizarramente alongadas, cavalos-marinhos impossivelmente grandes, ou criaturas de pescoço longo com remos que lembram os de elasmosauros.",
    "sections": [
      {
        "id": "local-orms",
        "title": "Orms Locais",
        "body": "Pessoas que vivem junto aos lagos habitados por orms aquáticos lendários tendem a dar aos monstros lacustres locais nomes que soam um tanto caseiros ou até adoráveis. Como resultado, tais criaturas muitas vezes são vistas como mascotes locais ou amuletos de boa sorte — sobretudo em povoados à beira do lago que dependem da pesca como fonte significativa de renda."
      }
    ]
  },
  "creature-zuishin": {
    "description": "Zuishin são guerreiros e arqueiros kami encarregados de vigiar santuários importantes, portões antigos ou portas sagradas. Com armadura resistente e armamentos sagrados, zuishin lutam sem descanso para afastar poderes profanos que desejam profanar os protegidos. De todos os kami, zuishin mais frequentemente lutam contra oni, pois os protegidos que zuishin guardam muitas vezes são alvo desses infernais vis.\n\nZuishin tendem a encarar mortais com ceticismo. Para ganhar a confiança de um zuishin, um suplicante pode oferecer itens de significância natural, como uma urna de terra sagrada, um galho de uma árvore antiga ou um arranjo de flores locais.\n\nComo todos os kami, um zuishin pode parecer reservado ou até indiferente a humanos e seus semelhantes; porém, essa impressão vem só da sabedoria e da longevidade de um zuishin, que faz os assuntos mortais parecerem relativamente triviais. Na companhia de outros kami, são infalivelmente benevolentes e de bom grado oferecem ajuda aos companheiros. Por exemplo, um zuishin cujo protegido jaz aninhado numa floresta antiga pode unir forças de bom grado com kodama naquelas árvores para dissuadir inimigos.",
    "sections": [
      {
        "id": "attracting-a-kami",
        "title": "Atrair um Kami",
        "body": "Culturas diferentes têm crenças diferentes sobre o melhor jeito de atrair um espírito kami, como um zuishin. Sociedades que se esforçam para preservar o mundo natural — como cidades-árvore élficas e vilas pequenas que equilibram a própria população com as de outras criaturas locais — são as mais propensas a ser agraciadas pela presença de um kami."
      }
    ]
  },
  "creature-argorth": {
    "description": "Um argorth é uma criatura enorme, semelhante a um verme, com três mandíbulas maciças e espinhosas cercando a goela triturante. Move-se sobre uma série de ossos em forma de gancho que protrudem da barriga, suplementados por um empurrão ocasional com a metade traseira do comprimento de 9 m. O argorth sem mente e sem olhos não conhece nada além de fúria e destruição, tornando-o mais semelhante a um desastre natural do que a qualquer fera conhecida do mundo natural.\n\nArgorths são a prole incompreensível de dibrasgorths. Destacam-se já formados da massa de tentáculos da criatura-pai, embora estudiosos e sábios não saibam exatamente quando ou por que esse processo ocorre. O estudo de tais aberrações é prejudicado pela natureza incrivelmente violenta; não muitos conseguem escapar da fúria de um argorth, que dirá de um dibrasgorth em muda. Uma vez parido, um argorth imediatamente envolve-se na destruição desenfreada de tudo ao redor. Embora não tenha olhos, tanto a habilidade de sentir por instinto criaturas com sangue bombeando quanto os milhares de pelos miúdos e ásperos que cobrem o corpo, permitindo-lhe \"cheirar\" o ar ao redor, asseguram que nada escape à devastação.",
    "sections": [
      {
        "id": "children-of-oblivion",
        "title": "Filhos do Oblívio",
        "body": "Lendas da criação dos argorths falam de Malcachavka, um dibrasgorth favorecido de Lamashtu que foi solto contra uma cidade de mortais. Mesmo depois que cada habitante foi morto e cada edifício arrasado, Malcachavka continuou a enfurecer-se, mastigando e mordendo a própria carne. Seis dos tentáculos foram decepados no debater, cada um dos quais continuou a contorcer-se por conta própria. No frenesi sem mente e pela bênção de Lamashtu, cresceram as próprias goelas e pernas, tornando-se os primeiros argorths."
      }
    ]
  },
  "creature-ash-giant": {
    "description": "Rústicos e cobertos de pústulas e feridas de vaguear ermos duros, gigantes das cinzas habitam a natureza inóspita. As vidas são difíceis, endurecendo-os em criaturas completamente viciosas, caprichosas e cruéis. O senso de humor sádico e o amor por peças os fazem odiados por quase todos os humanoides que encontram. Apesar de serem grosseiros e toscos, gigantes das cinzas são sobreviventes acima de tudo, e usam a engenhosidade para fabricar armas, armadilhas, arreios para montarias e ferramentas. Se o intuito é crueldade, brutalidade ou uma peça, um gigante das cinzas achará um jeito de fabricar as ferramentas de que precisa. Torrões de porco são uma construção predileta — engenhocas de sucata de ferro e outros metais armadas numa bola que explode no impacto.",
    "sections": [
      {
        "id": "chitinous-chariots",
        "title": "Carros de Quitina",
        "body": "Gigantes das cinzas montam insetos gigantes e outros vermes para a batalha. Amam especialmente cobrir os exoesqueletos das montarias com arreios de metal, placas de armadura e espinhos serrilhados acrescentados só por sadismo. Montarias que usam com frequência incluem a mãe da colmeia ankhrav e o louva-a-deus mortal. Criaturas menores, incluindo o narrik e o shriezyx, são atreladas em equipes para puxar as engenhocas de guerra itinerantes."
      }
    ]
  },
  "creature-atrixyl": {
    "description": "Muito raramente, quando crias do pecado (Monster Core 310) sacrificam seres sencientes a poços rúnicos, em vez de crias do pecado, um tipo de aberração de todo diferente é criado. Atrixyls são guerreiros humanoides insetoides, cujos poderes são semelhantes aos das crias do pecado comuns e ainda assim mais fortes, e que se dedicam a destruir poços rúnicos e artefatos semelhantes de deformação de carne. Alguns atrixyls buscam destruir poços rúnicos devido a uma impressão de dor e sofrimento que ocorre durante a criação, buscando impedir sofrimento futuro dos poços rúnicos. Outros buscam quebrar um poço rúnico e aproveitar as energias mágicas para ganhar poder pessoal. Essa missão implacável lhes rendeu o epíteto \"quebradores de runas\", e os traz a conflito com as crias do pecado cujas existências dependem desses poços rúnicos.\n\nAtrixyls atravessam os ermos arruinados de Golarion em busca tanto de poços rúnicos antigos quanto de instalações mais contemporâneas de deformação de carne.",
    "sections": [
      {
        "id": "mysterious-antiheroes",
        "title": "Anti-heróis Misteriosos",
        "body": "Atrixyls disfarçam-se de humanoides para evitar atenção e reunir informação discretamente sobre poços rúnicos. Embora muitos atrixyls permaneçam distantes da sociedade, alguns se veem nos papéis improváveis de anti-heróis que protegem esses mesmos humanoides tanto de crias do pecado quanto de deformadores de carne."
      }
    ]
  },
  "creature-brainchild": {
    "description": "Um rumor pode tornar-se tão vívido e persistente que ganha vida, criando um brainchild — uma ilusão viva que eclode de uma crença intensa num assassino implacável e sem remorso. Muitas vezes, esses rumores nascem de vítimas de uma magia. As capacidades de um brainchild crescem quando perseguem um crente, mas esvaziam-se contra céticos, tornando-os só tão perigosos quanto se acredita que sejam. Um impulso simples de espreitar, aterrorizar e matar impele um brainchild, mas a criatura também pode exibir outros comportamentos atribuídos a eles por fofoca.",
    "sections": [
      {
        "id": "spreading-rumors",
        "title": "Espalhando Rumores",
        "body": "Brainchildren exigem preparação. Crie alguns rumores que os PCs possam ouvir pela cidade, acrescentando mais se Obterem Informações. Anote quais rumores compartilham e quem acredita em quais. Não inclua demais — se os PCs acreditarem em todos, o brainchild ficará poderoso demais! Exemplos incluem \"Ouvi dizer que a Besta da Colina da Chaminé consegue andar pelo fogo sem queimar\" e \"Acordei com uma dor de cabeça lancinante. O Cão do Velho Selby deve estar espreitando de novo.\" Conforme a natureza das lendas em torno de um brainchild, tentativas de Recordar Conhecimento sobre ele podem usar quase qualquer perícia, mas Ocultismo e Sociedade provavelmente são as mais relevantes."
      }
    ]
  },
  "creature-garadasura": {
    "description": "Garadasuras são espíritos ofídios maciços que se atêm a deveres de guarda e açougue. Muitos são nagas antigos que desistiram do papel de zeladores da realidade e em vez disso voltaram os esforços a reverter o ato da criação. Garadasuras muitas vezes continuam os deveres que tinham como naga, mas também podem tornar-se destrutivos, devastando com a força de uma legião venenosa inteira.",
    "sections": []
  },
  "creature-hippopotamus-topiary": {
    "description": "Um dos tipos mais raros de topiárias vivas é o hipopótamo. Esses arbustos grandes formam-se de almas com personalidades maiores que a vida. Embora menos ágeis e perceptivos que topiárias menores, são bem mais agressivos e territoriais. Como tal, tendem a viver vidas solitárias em torno de pântanos e charcos, dando-lhes água e vegetação de sobra para vaguear.",
    "sections": []
  },
  "creature-larabay": {
    "description": "Larabays são fey de olhos brilhantes e aparência humanoide, com asas coloridas e dentes semelhantes a agulhas, que em geral residem ao longo de regiões costeiras quentes e ilhas. Como outros fey, apreciam peças suntuosas e ilusões fantásticas que criam ardil e confusão. O desejo de um larabay por uma piada pode às vezes alcançar extremos graves, como empregar ilusões para atrair navios contra rochas e viajantes para fora de falésias. Embora alguns por fortuna tenham tornado-se heróis pregando peças em tiranos ou pessoas cruéis, isso é quase inteiramente coincidência, pois larabays não consideram com frequência as morais ou as metas dos alvos; simplesmente apreciam os frutos do próprio caos.",
    "sections": [
      {
        "id": "feathers-of-the-rainbow",
        "title": "Penas do Arco-Íris",
        "body": "Larabays adoram recompensar quem os entretém com o presente de uma pena colorida. Embora essas penas muitas vezes sejam vistas como o cartão de visita de um trocista, as penas são um presente digno. Quando dadas livremente, as penas de um larabay reluzem de forma prismática, revelando cores além do espectro do arco-íris. Outros fey reconhecem a coloração radiante dessas penas e às vezes estão dispostos a trocar grandes favores por elas. Porém, roubar a pena de um larabay, seja arrancando-a de um larabay ou tomando-a de alguém que guarda uma pena presenteada, faz a coloração da pena desbotar, reduzindo-a a nada mais que penugem comum."
      }
    ]
  },
  "creature-meladaemon": {
    "description": "Meladaemons personificam a morte por fome e sede, e deleitam-se em espalhar o mesmo desespero que trouxe o falecimento mortal. Quando não estão devastando campos, massacrando gado ou contaminando suprimentos de água, experimentam em prisioneiros para estudar por quanto tempo criaturas conseguem ficar sem sustento e os efeitos deletérios que resultam de tal privação. Ferozmente leais a Trelmarixian, Cavaleiro do Apocalipse da Fome, não servem a nenhum outro ser. Trabalham ao lado de outros daemons se Trelmarixian assim o quiser, mas são notoriamente traiçoeiros.",
    "sections": [
      {
        "id": "formed-in-his-image",
        "title": "Formados à Imagem Dele",
        "body": "Meladaemons sempre foram esqueléticos e bestiais, mas nem sempre lembraram chacais. Quando Trelmarixian derrubou o Cavaleiro do Apocalipse da Fome anterior, um dos primeiros atos como governante de Abaddon foi torcer à força a aparência da casta de diáconos para lembrar a própria forma perversa. Seguiu imbuindo meladaemons com outros aspectos semelhantes a chacais conforme lhe convinha, distorcendo-os ainda mais e cimentando a fidelidade."
      }
    ]
  },
  "creature-raelis": {
    "description": "Formados das almas de contadores de histórias, esses azatas buliçosos vagueiam os planos, buscando histórias cada vez mais impressionantes para coletar. Tentam espalhar alegria compartilhando esses contos e corrigindo os erros que encontram. A busca constante por histórias traz raelises ao Universo mortal com mais frequência que outros azatas.\n\nUm raelis em geral é conhecedor de trilhas e direções, pois as jornadas os levam a uma variedade de locais diferentes. Raelises preferem evitar fazer a mesma jornada duas vezes e saem do caminho para evitar fazê-lo. Depois de milênios de jornadas constantes, um raelis torna-se um atlas vivo, algo de que têm grande orgulho.\n\nRaelises adoram briga e luta livre, e muitas vezes viajam em disfarces mortais para não influenciar indevidamente os eventos que cronificam. A habilidade de viajar discretamente entre assentamentos faz dos raelises espiões excelentes e agentes discretos para deuses com interesses semelhantes.",
    "sections": []
  },
  "creature-skeleton-infantry": {
    "description": "Esta tropa de esqueletos um dia foi uma coorte de infantaria de lança e escudo altamente disciplinada de um império antigo.",
    "sections": []
  },
  "creature-spinosaurus": {
    "description": "O espinossauro é mais do que só um dos maiores dinossauros carnívoros — é também um dos mais incomuns na aparência, com uma nadadeira grande semelhante a uma vela correndo ao longo da espinha. Muitas vezes bem colorida, essa vela permite ao espinossauro atrair parceiros, auxilia na natação e o faz parecer ainda maior do que de fato é. Um espinossauro nadando também pode usar a vela como parte de um meio único de atordoar a presa, batendo-a na água para fazer uma onda esmagadora. Um espinossauro pode medir até 18 m de comprimento e pesar 11.300 kg.\n\nO espinossauro está igualmente em casa na água e em terra, e a goela longa e denteada é bem adaptada para pegar presa nadadora. Tentativas de gigantes de capturar espinossauros para servir de guardiões em geral correm mal, pois esses dinossauros teimosos não se domesticam bem. As atitudes ranzinas e as aparências marcantes os tornam mais adequados a esportes sangrentos, e são prêmios populares para quem dirige arenas especializadas em batalhas que opõem gladiadores a animais ou feras famintas. Essas produções são verdadeiros banquetes de carnificina para os olhos e atraem plateias de centenas de quilômetros ao redor. Claro, um dinossauro zangado forçado a lutar para a diversão de outros não discrimina entre refeições potenciais no campo de batalha e as sentadas nas arquibancadas ao redor, tornando os assentos mais próximos da borda da arena possivelmente parte do espetáculo também.\n\nA aparência e a força do espinossauro o tornam atraente para mais do que só gigantes e organizadores de esportes sangrentos. Conjuradores que mutam e transformam animais em guardiões mágicos há muito se intrigam com o potencial do espinossauro. Devido à reputação da criatura por violência, esses conjuradores enfrentam grande perigo enquanto encantam um para levar para casa. Porém, para os intrigados pelas habilidades hipotéticas da criatura, tal risco vale a pena. Mais do que qualquer outro dinossauro, espinossauros foram submetidos a procedimentos de deformação de carne, cruzamentos com monstros e outras técnicas mágicas nas mãos de conjuradores reclusos experimentando para aprimorar a viabilidade das criaturas como guardiões eficazes.",
    "sections": []
  },
  "creature-adamantine-dragon-young": {
    "description": "Ainda jovem, o dragão de adamantina cobre-se de escamas duras — resistentes, mas longe das placas maciças que virão com a idade. A magia inata já puxa metais-céu para o corpo como ímã, e às vezes os faz crescer na pele. Leal e teimoso: uma vez que se compromete com um propósito, mudar de ideia é quase impossível.",
    "sections": []
  },
  "creature-adamantine-dragon-adult": {
    "description": "No auge adulto, as escamas duras já cederam a placas de adamantina que se espessam a cada década. Continua a atrair e a crescer metais-céu no corpo, um dos dragões de metal-céu mais reconhecíveis. Leal até a teimosia: quem ganha a palavra dele raramente a perde, e quem tenta dobrá-lo descobre que o metal não cede.",
    "sections": []
  },
  "creature-adamantine-dragon-ancient": {
    "description": "O ancião é couraça viva: placas espessas de adamantina cobrem o corpo inteiro, mais duras que qualquer escama de juventude. Séculos de lealdade inabalável o tornam aliado inestimável — ou obstáculo que não recua. Mudar o propósito de um dragão de adamantina ancião é, na prática, impossível.",
    "sections": []
  },
  "creature-conspirator-dragon-young": {
    "description": "O jovem conspirador ainda ensaia disfarces entre cortes e sombras, falando num tom condescendente que mal esconde. Já trama por ganho pessoal ou pelo puro prazer de ver a peça cair. A forma dracônica fica oculta; o orgulho de se achar acima dos outros, nem sempre.",
    "sections": []
  },
  "creature-conspirator-dragon-adult": {
    "description": "Adulto, o conspirador vive nos escalões altos da sociedade, sempre disfarçado, sempre um passo à frente da vítima. Manipula por lucro ou pelo frisson da maquinação. Trata os outros como crianças — e cuida para que o disfarce não deixe o desprezo vazar.",
    "sections": []
  },
  "creature-conspirator-dragon-ancient": {
    "description": "O ancião conspirador não governa um covil: governa redes. Séculos de tramas o colocam nas sombras de impérios, ainda disfarçado, ainda falando como quem ensina um tolo. Poucos percebem que o conselheiro idoso é o dragão — e que a conversa inteira já estava no roteiro.",
    "sections": []
  },
  "creature-diabolic-dragon-young": {
    "description": "Recém-partido do Inferno — ou alma dracônica recém-renascida nele — o jovem diabólico já serve a vontade do plano com uma calma inquietante. Ainda treina a tirania, mas o objetivo nunca muda: expandir o Inferno. Chega aos recém-chegados sem pressa e sem calor.",
    "sections": []
  },
  "creature-diabolic-dragon-adult": {
    "description": "O adulto diabólico é extensão viva do Inferno: astuto, poderoso, tirânico. Como cumpre a vontade infernal varia — contrato, conquista, conversão — mas a calma com que encara forasteiros nunca falha. Teólogos discutem se o plano é um ente vivo e o dragão um fragmento; as vítimas não precisam da resposta.",
    "sections": []
  },
  "creature-diabolic-dragon-ancient": {
    "description": "Ancião diabólico: o Inferno com asas e memória de éons. Cada plano, cada conversa, cada silêncio serve à vontade do plano. A calma inquietante de um dragão tão velho é pior que o fogo: sugere que o resultado já foi contabilizado.",
    "sections": []
  },
  "creature-empyreal-dragon-young": {
    "description": "O jovem empíreo ainda estreita o vínculo direto com o Céu, usando as bênçãos para proteger os outros e interceder contra a maldade. Sábio além da idade, paciente no trato. A compaixão já está lá; o julgamento ainda aprende o peso.",
    "sections": []
  },
  "creature-empyreal-dragon-adult": {
    "description": "Adulto, o empíreo é o braço do Céu entre os três grandes planos celestiais. Protege, intercede, e fala com paciência e compreensão. Sábio, atencioso e compassivo — a bênção que carrega não é só luz, é dever.",
    "sections": []
  },
  "creature-empyreal-dragon-ancient": {
    "description": "O ancião empíreo é o Céu em escala dracônica: éons de proteção, intercessão contra o mal, e uma paciência que não se esgota. A compaixão não o torna brando; torna o veredito inevitável. Quem conversa com ele sente que foi ouvido de verdade.",
    "sections": []
  },
  "creature-fortune-dragon-young": {
    "description": "O jovem da fortuna já puxa magia crua do ar para curar feridas e alimentar magias. Moedas e gemas começam a grudar no corpo como ferro em ímã; alguns itens já derretem com o calor desse fluxo. Busca experiências novas com uma curiosidade que some depressa se o visitante for tedioso.",
    "sections": []
  },
  "creature-fortune-dragon-adult": {
    "description": "Adulto, o dragão da fortuna é tesouro ambulante: moedas, gemas e sobretudo itens mágicos grudam no corpo, e ele suga a magia deles — muitas vezes até derretê-los. A energia cura e empodera. Caçador de novidade: aborda outras ancestralidades com curiosidade, até o interesse evaporar.",
    "sections": []
  },
  "creature-fortune-dragon-ancient": {
    "description": "O ancião da fortuna é um relâmpago de tesouro fundido: séculos de itens grudados, derretidos e substituídos. A magia que o atravessa cura e conjura sem pausa. A fome de originalidade não envelheceu — só ficou mais difícil de saciar.",
    "sections": []
  },
  "creature-horned-dragon-young": {
    "description": "O jovem cornífero já ostenta o par de chifres que define a espécie, ainda crescendo sobre o corpo robusto e as escamas em crista. Empala presas num golpe brutal que contrasta com o gosto por saber e autodisciplina. Mais aberto a forasteiros do que a aparência bestial sugere.",
    "sections": []
  },
  "creature-horned-dragon-adult": {
    "description": "Adulto, os chifres maciços empalam com uma exibição rápida de poder. Corpo volumoso, coloração natural, escamas em crista — mas o que define o encontro é a conversa: contemplativo, obcecado por conhecimento e autodisciplina. A besta na forma não é a besta na mente.",
    "sections": []
  },
  "creature-horned-dragon-ancient": {
    "description": "O ancião cornífero carrega chifres de éons e uma disciplina que a aparência bestial desmente. Empala como sempre, mas prefere o diálogo: saber acumulado, autodomínio, abertura rara entre dragões. Quem espera só a carga recebe também a pergunta.",
    "sections": []
  },
  "creature-mirage-dragon-young": {
    "description": "O jovem da miragem ainda treina ilusão, escamas que camuflam e o sopro alucinógeno que confunde vários de uma vez. Vaidoso demais para a idade, cuida mais de si do que de qualquer aliado. A agenda é sempre a dele.",
    "sections": []
  },
  "creature-mirage-dragon-adult": {
    "description": "Mestre adulto da ilusão: engana para avançar a própria pauta, some nas escamas camufladas, e o sopro alucina grupos inteiros. Vaidoso e ególatra. No fim, importa só ele.",
    "sections": []
  },
  "creature-mirage-dragon-ancient": {
    "description": "O ancião da miragem não precisa mais provar a vaidade: éons de ilusão fizeram do mundo um palco. Escamas, sopro e magia confundem exércitos. O ego não diminuiu — só ficou mais difícil de distinguir da realidade que ele fabrica.",
    "sections": []
  },
  "creature-omen-dragon-young": {
    "description": "O jovem do presságio já ouve a canção do destino — visões nebulosas que não calam. As membranas internas das asas, como espelhos, mostram o futuro turvo mas em geral tecnicamente certo. Compulsão de compartilhar: aldeão ou tirano, tanto faz.",
    "sections": []
  },
  "creature-omen-dragon-adult": {
    "description": "Adulto, o dragão do presságio vive com o futuro como música de fundo: pode focar ou ignorar, mas a canção não para. As asas espelhadas oferecem vislumbres. Não escolhe destinatário: a visão vai ao inocente e ao cruel com a mesma urgência. Em Golarion, com a profecia quebrada, ele ainda vê o imediato.",
    "sections": []
  },
  "creature-omen-dragon-ancient": {
    "description": "O ancião do presságio carregou a canção do destino por éons. As asas são arquivo de futuros turvos e tecnicamente corretos. A compulsão de contar o que vê não tem ética: aldeia ou tirania recebem o mesmo aviso. Ignorar a profecia não a cala.",
    "sections": []
  },
  "creature-cauthooj": {
    "description": "Essas aves grandes e incapazes de voar são enganosamente ágeis, apesar do corpo alongado e da marcha desajeitada de pulos. Predadoras solitárias, usam o canto hipnótico e trinado para empurrar a presa a um frenesi selvagem, manipulando-as a atacar umas às outras para então banquetear-se com os restos.\n\nAlguns eruditos as conhecem como ave titereira; outros, como picanço estridente. Cauthoojs são amplamente odiadas pela maioria dos humanoides inteligentes, em parte porque parecem preferir humanoides como presa. Avistamentos em geral levam à formação de partidas de caça para abater a criatura antes que mate de novo, e os caçadores costumam entupir os ouvidos de cera para evitar o grito. Quem sobreviveu ao canto relata uma experiência unicamente perturbadora, e quase todos os relatos concordam: não há som mais terrível.\n\nEmbora se possa assumir que o cauthooj é um animal sem inteligência, essas criaturas são mais espertas do que parecem. Espreitam o perímetro de povoados remotos na esperança de achar um viajante solitário para devorar. Até entendem algumas palavras rudimentares em Fey, embora sejam incapazes de falar com clareza. Isso não impede o cauthooj de tentar imitar os sons que ouve; quando o faz, a natureza primal inquietante amplifica a tentativa, levando à habilidade icônica de manipular mentes e incentivar conflito — um traço que o cauthooj é só o bastante inteligente para entender, e apreciar.",
    "sections": [
      {
        "id": "cauthooj-lairs",
        "title": "Covis de Cauthooj",
        "body": "Cauthoojs fazem covis em cavernas pequenas, alcovas e recantos semelhantes fora do caminho, mas reivindicam grandes extensões de território e vagueiam longas distâncias longe dos covis em busca de comida. Muitas vezes caçam em planícies, pradarias e outras expansões abertas e vastas."
      },
      {
        "id": "shiny-collections",
        "title": "Coleções Brilhantes",
        "body": "Como pegas, cauthoojs são atraídos por bugigangas brilhantes, e muitas vezes recolhem tesouros escolhidos das vítimas, depositando essas bugigangas em pilhas grandes nos covis. Nem tudo que reluz é ouro, porém, e aventureiros acharão tantos pedaços coloridos de barbante, cacos de espelho quebrado e bijuterias quanto moedas, armas mágicas e outros tesouros valiosos."
      }
    ]
  },
  "creature-con-rit": {
    "description": "O con-rit é uma centopeia aquática descomunal que trocou as centenas de pernas por outras tantas nadadeiras. Esse inseto marinho nada com uma graça tão majestosa quanto perturbadora. É marrom-escuro no dorso e amarelo doentio no ventre, o que o torna bem mais difícil de avistar, seja de cima ou de baixo. O exoesqueleto é duro como ferro, e o deslocar das placas produz um tilintar alongado e inquietante enquanto nada.\n\nMuitos já o tomaram por algum tipo de dragão. Não só pelo tamanho maciço, mas pela habilidade de lançar o veneno num jato concentrado. Usa a técnica para derrubar aves do céu ou arrancar marinheiros do convés. O movimento na água também não é de todo diferente do de dragões. Quem busca o covil de um con-rit atrás de tesouro em geral se decepciona (quando não é comido vivo pelo inseto enorme).\n\nHá lendas de que um con-rit, como uma fênix, renasce após a morte. Não é o caso. O con-rit faz ninho bem abaixo da superfície do território, em geral em cavernas submersas. Ao longo da vida, põe milhares de ovos na caverna que nunca eclodem. Come qualquer ovo que envelheça demais, mas sempre restam grandes quantidades. Quando morre, libera no ar e na água um químico de cheiro forte que dispara o processo de eclosão. Os ovos racham aos poucos no prazo de um mês, e centenas de filhotes começam a lutar uns contra os outros por território. Até o fim do ano, um vence e atinge a maturidade plena. Esse ciclo alimentou as lendas de renascimento sem fim. Outras histórias dizem que cada geração é um pouco menor, levando a contos de con-rits antigos com dezenas de metros de comprimento. O tamanho de tais insetos lendários, porém, ainda não foi confirmado por eruditos que estudam o assunto.",
    "sections": [
      {
        "id": "stubborn-reluctance",
        "title": "Relutância Teimosa",
        "body": "Quem experimenta o poder e a tenacidade de tal criatura muitas vezes se pergunta por que são tão raramente vistos pelo mundo. Isso se deve à relutância em explorar e à determinação teimosa de lutar sem fim pelo mesmo território. Só em instâncias raras larvas de con-rit se mudam para outro território, e nunca por escolha. São realocadas devido a um fenômeno climático, a uma mudança estranha nas correntes, ou por pessoas."
      }
    ]
  },
  "creature-giylea": {
    "description": "Giyleas são conhecidas como arcontes-roda, nomeadas pela aparência: uma roda voadora, encouraçada, de fogo, com olhos em cada raio. Com frequência servem de conselheiras pela habilidade de ver através de mentiras, e têm uma intolerância e uma obstinação lendárias na perseguição e no castigo do mal.",
    "sections": []
  },
  "creature-gongorinan": {
    "description": "Enquanto a maioria dos qlippoths foca em apagar mortais da existência, gongorinans seguem o plano divergente de prender mortais em formas incapazes de entender as próprias ações e de cometer qualquer pecado que mereça condenação às Fendas Exteriores. O que a alguns parece misericórdia é, para os gongorinans, necessidade urgente: matar mortais pecadores equivale a ajudar os inimigos.",
    "sections": []
  },
  "creature-gosreg": {
    "description": "Gosregs são agentes do Domínio do Negro que se infiltram em sociedades humanoides para implementar as metas dos mestres sinistros. Em geral recebem a tarefa de observar e esperar, escondidos em formas disfarçadas até o local estar maduro para a colheita. Quando isso ocorre, revelam-se como faróis psíquicos vivos, sinalizando os mestres distantes e guiando forças de invasão. Ao longo dos anos de uma infiltração, um gosreg assume dezenas de papéis, deleitando-se com qualquer emoção intensa que consiga inspirar enquanto prepara o terreno para identidades futuras.\n\nNa forma natural, gosregs avançam num galope trôpego por causa das pernas atarracadas, braços desengonçados e cabeças desproporcionais. Assumem aparências de humanoides para infiltrar sociedades, e só largam esses disfarces quando comprometidos e precisam recorrer à violência física para continuar a missão.",
    "sections": [
      {
        "id": "screams-in-the-void",
        "title": "Gritos no Vazio",
        "body": "Apesar dos anos de observação dos gosregs, nem eles sabem o que acontecerá quando transmitirem um farol psíquico. Essa decisão é tomada por seres muito acima deles. Conforme os planos dos superiores, a resposta pode ser silêncio, legiões que chegarão em séculos, ou um líder do Domínio do Negro se teleportando direto ao farol."
      }
    ]
  },
  "creature-greater-nightmare": {
    "description": "O enorme pesadelo maior é valorizado pela habilidade de invadir outras realidades com o cavaleiro.",
    "sections": []
  },
  "creature-ice-linnorm": {
    "description": "O linnorm do gelo habita fendas glaciais, cumes açoitados pelo vento ou cavernas cintilantes esculpidas no coração dos icebergs mais poderosos.",
    "sections": []
  },
  "creature-iron-warden": {
    "description": "Tradicionalmente forjados na forma de armaduras gigantes ou de animais poderosos, os guardiões de ferro são produtos de arte e ofício requintados. As juntas articuladas e o corpo encouraçado exigem grande cuidado e precisão matemática, e limpeza e óleo regulares impedem que enferrujem ao longo das eras. Com manutenção adequada, um guardião de ferro permanece em bom estado por milhares de anos, passado de geração em geração — desde que aventureiros intrometidos não o destruam. Além da força incrível, possui um sopro tóxico potente, muitas vezes o bastante para despachar grupos inteiros de oponentes.\n\nEmbora a estatura impressionante os impeça de passar despercebidos, guardiões de ferro em geral são colocados onde se confundem com objetos decorativos. Um pode estar escondido entre trajes de armadura ornamentais ou disfarçado de estátua numa praça. De vez em quando, os moradores se chocam quando algo que julgavam marco histórico se anima num guardião de ferro, chamado à ação por um comando místico desconhecido.\n\nHistórias falam de civilizações antigas, como o Império Jistka, que criaram guardiões de ferro de tamanho maciço. A maioria desses construtos já foi derretida por recursos, mas magos e historiadores ainda correm atrás de rumores de um desses colossos perdidos.",
    "sections": [
      {
        "id": "iron-scrap",
        "title": "Sucata de Ferro",
        "body": "Um guardião de ferro pode ser derretido para sucata ou negociado com gigantes do fogo para ser reaproveitado como armadura para uma criatura Grande."
      }
    ]
  },
  "creature-jah-tohl": {
    "description": "Os grotescos jah-tohls chegam em naves-estrelas vivas para colher os cérebros de criaturas inteligentes. Essas aberrações não tiram nutrição dos cérebros: armazenam-nos para análise e como vasos de energias ocultas.\n\nA forma de um raptor de mentes evoca a de um escorpião sem cauda, mas as bolhas pulsáteis cheias de cérebro que reluzem nas costas tornam impossível confundi-los com aracnídeos superdimensionados. Olhos sinistros encaram das juntas das pernas, e os sussurros-pensamento inquietantes que transmitem telepaticamente às mentes de quem pretendem alimentar podem ser lidos tanto como ameaças quanto como promessas.\n\nRaptors de mentes têm pouca empatia pelos habitantes de qualquer mundo que visitem, apesar de certos cultos os venerarem — e ao Domínio de onde vêm. Para os jah-tohls, criaturas terrestres são simplesmente recursos para as investigações. Têm pouco interesse em deuses ou em ser adorados; praticam uma filosofia que considera as forças primordiais do espaço profundo dignas de fé e de medo. Filósofos jah-tohlianos contemplam essas forças misteriosas de muitos ângulos ao mesmo tempo, queimando numerosos cérebros na busca de compreensão.",
    "sections": []
  },
  "creature-megaprimatus": {
    "description": "O megaprimatus está entre os primatas mais poderosos, rápido a confrontar qualquer intromissão percebida no domínio. Com uns 12 m de altura, ofusca até a maioria dos gigantes, e está acostumado a ser o predador de topo da região.",
    "sections": []
  },
  "creature-nessari": {
    "description": "Quando um exército de diabos invade para banhar uma região em morticínio e fogo infernal, é provável que uma nessari tenha arquitetado a incursão. Astutas, poderosas e impiedosas, nessaris com frequência servem os arquidiabos diretamente. Governam ducados infernais, subjugam mundos mortais e usurpam rivais infernais com despotismo ímpar e ferocidade calculada. Para realizar as maquinações tirânicas, reivindicam almas mortais que corrompem em servos ort, os quais então podem ser moldados e transformados por manipulação infernal nos diabos aterradores que formam as legiões formidáveis do Inferno. Com frequência selecionam os orts mais vis e violentos para os exércitos, puxando a depravação desses diabos menores em cerimônias mágicas poderosas para criar abominações hediondas capazes de intimidar e eviscerar os inimigos da nessari.\n\nCada nessari é forjada nas entranhas pesadelares de Nessus, a nona camada do Inferno, para servir aos caprichos de arquidiabos e duques infernais. As que não deixam Nessus para comandar legiões nas camadas superiores muitas vezes formam as cortes da elite do Inferno, reunindo sequazes e seitas que moldam a paisagem política por subterfúgio e manipulação. Mas muitas nessaris se veem como encarnações vivas do fogo infernal — a ira abrangente do Inferno — e por isso preferem habitar reinos consumidos pelo fogo. Em Avernus, Dis, Malebolge, Nessus e Phlegethon, erguem cidadelas vastas de enxofre cingidas de chama para reinar.\n\nLonge de estar acima das lutas constantes de poder das fileiras diabólicas, nessaris estão no meio delas. Até esquemas apocalípticos para conquistar ou profanar mundos mortais em geral começam do desejo de subir um único degrau na hierarquia imortal do Inferno. Por isso, o melhor — e também o mais perigoso — aliado contra uma nessari é a nessari ao lado.\n\nNessaris ofuscam outros diabos: têm pelo menos 4,8 m de altura, pesam mais de 450 kg e ostentam envergaduras de asas acima de 6 m.",
    "sections": [
      {
        "id": "shape-devils",
        "title": "Moldar Diabos",
        "body": "Uma nessari precisa de um número mínimo de orts para moldar a massa revolta num diabo de determinado nível, conforme o resumo abaixo.\n**Nível do Diabo** **Número de Orts**\n4 ou abaixo 4\n5–6 8\n7–8 16\n9–10 32\n11–12 64\n13–14 128\n15–16 256\n17–18 512\n19–20 1.024"
      }
    ]
  },
  "creature-nilith": {
    "description": "As niliths esguias e escuras lembram preguiças arborícolas sem pelo e emaciadas. São intensamente perigosas e temíveis, com olhos vermelhos brilhantes, garras vis e bocas cheias de dentes como agulhas. Alimentam-se das emoções, dos medos e da carne dos vivos, e contos populares afirmam que quem tem pesadelos com essas criaturas está fadado a um dia ser comido por elas. Niliths extraem alegria intensa de atormentar criaturas sápientes, muitas vezes focando as predações nos piedosos e nos justos, de quem arrancam os medos mais básicos e os piores pensamentos, deleitando-se no terror subsequente. Na maioria das vezes, essas manipuladoras vis desejam empurrar as vítimas à loucura e até ao suicídio. A maioria das niliths não tem paciência para passar tempo demais demolindo um indivíduo por completo; quando se cansa do brinquedo atual e se entedia com aqueles pensamentos e medos particulares, assassina a presa, alimenta-se da carne e passa à próxima vítima.\n\nNiliths são, na verdade, extensões de criaturas bem mais mortais que habitam uma dimensão distante além dos sonhos — de certo modo, pouco mais que máquinas de alimentação remotas para as entidades alienígenas desconhecidas às quais estão ligadas. Eruditos e viajantes dimensionais tentaram desvendar os mecanismos exatos dessa conexão misteriosa, mas ainda não decifraram a verdade. De fato, muitos que investigam a natureza do vínculo de uma nilith são empurrados à loucura antes de chegar perto. A conexão ímpar com seres de outro mundo talvez ajude a explicar a longevidade: acredita-se que niliths possam viver milhares de anos.\n\nFelizmente para os outros, niliths são criaturas solitárias que odeiam a companhia das próprias, provavelmente porque essas arautos de pesadelos não desejam provar os horrores que infligem aos outros.",
    "sections": [
      {
        "id": "from-the-dreamlands",
        "title": "Das Terras dos Sonhos",
        "body": "A associação da nilith com as remotas e pouco compreendidas Terras dos Sonhos, também conhecidas como a Dimensão dos Sonhos, é incomum. Extraem poder de uma conexão onírica latente com aquele reino, mas são nativas do Universo."
      }
    ]
  },
  "creature-ort": {
    "description": "Essas massas sem forma de carne trêmula são o menor dos diabos. Criaturas patéticas da primeira camada do Inferno, orts vagueiam ao lado de almas condenadas e sofredoras. Nessaris podem combinar a essência de uma turba de orts para concentrar a maldade coletiva numa forma só, concedendo-lhe uma senciência infernal e transformando-a num diabo mais poderoso (veja a habilidade Shape Devils da nessari).",
    "sections": []
  },
  "creature-paleohemoth": {
    "description": "Paleohemotes em geral são feitos dos ossos fossilizados de dinossauros e outra megafauna antiga, embora alguns artífices estiquem a definição e usem ossos magicamente petrificados de dragões ou até de gigantes. Sem modelo fixo, são construídos para aterrorizar o máximo possível, não para acurácia anatômica. Assim, a maioria é um amálgama sauriano pesadelesco cujos braços maciços terminam nos crânios completos de predadores de topo como tiranossauros, a mordida aprimorada para petrificar carne.\n\nOssos fossilizados intactos são componentes difíceis de ajuntar, quanto mais esqueletos inteiros. Um jeito alternativo é contratar caçadores ou aventureiros experientes para buscar dinossauros vivos, trazer os ossos e usar magia para transformá-los em pedra. Claro, alguns puristas preferem ossos fossilizados de verdade e pagam o preço da aquisição. De um jeito ou de outro, há oportunidade para almas empreendedoras com as ferramentas certas e várias bolsas espaçosas.\n\nA magia que anima paleohemotes concede uma flexibilidade modular, permitindo trocar mobilidade por alcance estendido pela rearrumação rápida dos membros. Isso muitas vezes envolve ossos saindo das pernas para alongar os braços. O resultado é uma anatomia um tanto cômica, mas eficaz. A habilidade também os deixa parecer uma pilha desordenada de ossos em repouso, fáceis de confundir com decoração em vez de guardiões.\n\nOs motivos para criar tais construtos variam. Embora muitas vezes associados a gênios do mal em masmorras profundas e escuras, têm ótimo uso em outros lugares. Versões mais elegantes podem proteger coleções particulares de colecionadores da alta sociedade. Thuvia faz grande uso de paleohemotes nas arenas de construtos. A princípio não tinham permissão para lutar; uma brecha explorada os tornou adição popular às arenas desde então.",
    "sections": [
      {
        "id": "dragon-bones",
        "title": "Ossos de Dragão",
        "body": "Muitos artífices tentam infundir magia elemental em paleohemotes. Os maiores sucessos ocorreram quando a maior parte dos ossos veio de dragões. Paleohemotes criados especialmente ganham a seguinte habilidade, com um tipo de dano determinado pela origem dos ossos.\n\n **Explosão de Energia** (arcano) O paleohemote dispara energia mágica de um dos crânios que compõem o corpo. Cada criatura num cone de 9 m sofre 10d6 de dano, com salvaguarda básica de Reflexos CD 32. O paleohemote não pode usar Explosão de Energia de novo por 1d4 rodadas."
      }
    ]
  },
  "creature-qarna": {
    "description": "Qarnas são sentinelas e batedoras secretas e incansáveis, patrulhando os ermos indômitos da Esfera Exterior em busca de mal a eliminar e mantendo comunidades pequenas a salvo de demônios, diabos e pior. Lembram criações estatuescas ornamentadas, com quatro cabeças de cervo e chifres dourados. Quando aliados pedem — sobretudo o deus Erastil — viajam ao Universo e patrulham fronteiras perigosas, realizando em segredo atos de bondade: guiar caçadores à comida, ajudar crianças perdidas e afastar criaturas más.",
    "sections": []
  },
  "creature-quai-dau-to": {
    "description": "Essa fera de cabeça grande é coberta de escamas cintilantes; os olhos são como panelas de cobre grandes, e a boca está cheia de dentes afiados. Apesar da aparência de peixe, um quai dau to passa a maior parte do tempo em terra, caçando às margens de rios ou lagos. Usa a tromba para drenar a água próxima antes de empregá-la com habilidade mortal. Pode expelir a água com força bastante para derrubar um cavaleiro do cavalo, ou com suavidade bastante para envolver-se num véu de névoa.\n\nUm quai dau to é extremamente sensível a som. Se ouve tumulto demais perto dos terrenos de caça, ataca com violência. O movimento silencioso permite aproximar-se de presas tão distraídas apesar do tamanho maciço. Pesquisadores descobriram, após muito estudo, que quai dau tos não têm orelhas no sentido tradicional. Têm um órgão na parte superior do crânio que infla para guardar a água usada nos ataques. Esse órgão é extremamente sensível a vibrações no ar e funciona como um pseudo-ouvido.",
    "sections": [
      {
        "id": "impossible-flight",
        "title": "Voo Impossível",
        "body": "Apesar das leis do mundo natural, essa criatura de cabeça grande consegue voar. O quai dau to realiza esse feito incrível inflando-se, o que lhe permite aparentemente nadar pelo ar como se fosse água. Enquanto inflado assim, o quai dau to lembra um tanto um baiacu."
      }
    ]
  },
  "creature-quelaunt": {
    "description": "Esse monstro de três braços e três pernas não tem olhos, nariz, orelhas nem boca discerníveis, nem meio visível de ingerir comida. Os membros estão distribuídos de modo tão uniforme pelo corpo que é quase impossível dizer para que lado a criatura está orientada a qualquer momento. Poucos que testemunham um quelaunt demoram-se na aparência alienígena por muito tempo, pois a invasão das mentes vira preocupação mais urgente, semeando dúvida, tristeza e raiva. Essa monstruosidade não só se deleita nas emoções negativas da presa, como se alimenta delas, ganhando força e sustento no desespero. Para o quelaunt, nenhum ato é terrível ou cruel demais para infligir às vítimas: quanto mais a criatura sofre, mais o quelaunt se banqueteia.\n\nQuelaunts são conhecidos por associar-se a outros horrores aberrantes, inclusive jah-tohls e outras criaturas ligadas ao Domínio do Negro. Porém, a teoria mais prevalente os pinta como ainda mais alienígenas — talvez seres invasores de outra dimensão de puro pensamento e sentimento — e afirma que, no estado natural, não têm corpo físico algum. Poucos ousam especular além; a única autópsia conhecida de um quelaunt resultou no suicídio do pesquisador poucos dias depois, e todas as anotações foram misteriosamente destruídas. Quaisquer segredos a desvendar na anatomia desses monstros bizarros são, aparentemente, importantes o bastante para merecer grande proteção dos quelaunts, mesmo após a morte.",
    "sections": [
      {
        "id": "other-quelaunts",
        "title": "Outros Quelaunts",
        "body": "Talvez os contos mais aterradores de quelaunts lhes atribuam habilidades além das detalhadas aqui, sugerindo que quelaunts talvez sejam uma categoria inteira de ameaça alienígena que só recentemente voltou a terrível atenção para a humanidade."
      }
    ]
  },
  "creature-raja-krodha": {
    "description": "Os rakshasas mais icônicos, raja-krodhas são caçadores da humanidade mortal com cabeça de tigre. São encarnações de toda a malícia que as pessoas tentam negar em si e, em vez disso, atribuem de forma errada a predadores mortais do ermo. Poder e habilidade inspiram medo, mas também espanto, e não é desconhecido que alguns povos tratem tal rakshasa como guardião — um a ser tratado com extrema cautela.\n\nApesar da natureza de carnívoros brutais, rajas são extremamente eloquentes e filosóficos quando escolhem ser. Isso é simplesmente outra forma de camuflagem, que lhes permite misturar-se a cidades como as listras lhes permitem sumir na selva, e com frequência embala eruditos e intelectuais numa falsa sensação de segurança. Embora não esteja na natureza de um raja-krodha ser um tramador social ou uma mente-mestra, agrada-lhes quando outros se iludem pensando que são.",
    "sections": []
  },
  "creature-rekhep": {
    "description": "Rekheps são os escudos vivos que defendem o Céu contra incursões de capetas. Encaixam-se uns nos outros em formações maciças capazes de resistir a qualquer investida. Dada a força tremenda e a estatura imponente, arcontes-escudo são guardiões ideais dos fracos e às vezes são evocados ao Universo mortal para rechaçar os ataques de grandes números de malfeitores.",
    "sections": []
  },
  "creature-seraptis": {
    "description": "Demônios seraptis de quatro braços são niilistas radicais no âmago, desprezando outras criaturas por um sentimento amargo de merecimento e rindo histericamente quando outros morrem ou sofrem. Surgem de almas que se dedicaram a campanhas de miséria, empurrando as vítimas ao desespero e ao suicídio. Depois do despertar como seraptis, as bocas famintas entalhadas nos braços devoram o sofrimento alheio, trazendo um tom vivo à pele fria do demônio.\n\nEsses demônios buscam arrastar mortais ao próprio nível, atraindo peões a um ressentimento enraizado. Alimentando os alvos com um fluxo ininterrupto de meias-verdades e propaganda, com frequência os empurram a descarregar a raiva em atos imperdoáveis contra inocentes. Embora empolgados com a miséria que os peões mortais infligem, o verdadeiro consolo dos demônios é colher as almas desses peões como mais dos seus.",
    "sections": []
  },
  "creature-shining-child": {
    "description": "Crianças rutilantes são monstros vis e enigmáticos que vagueiam planos remotos e cantos inexplorados do universo em busca de saber esotérico. Com os corpos anormalmente emaciados, o cabelo branco comprido e as mãos inquietantes de quatro dedos, são ao mesmo tempo estranhamente familiares e de outro mundo na aparência — embora mal visíveis dentro do manto de luz cegante que emitem o tempo todo. Os rostos, porém, são de fato horrendos: os olhos descomunais e as bocas distendidas e escancaradas revelam que as cabeças são vazios cheios de luz antinatural. Usam essa luz como arma, tecendo ilusões e focando feixes de fulgor flamejante.\n\nPor causa da reputação de eruditas do alienígena e do eldritch, crianças rutilantes às vezes são evocadas por magos ou ocultistas poderosos em busca de saber raro. Nunca entregam o conhecimento sem algum preço, e em geral exigem em troca a execução de atos desprezíveis que avançam os planos inescrutáveis e de longo alcance.\n\nEsses seres misteriosos são nativos do Plano Astral. Naquele plano vasto, acréscimos de matéria metafísica acumulam-se aos poucos e por fim coalescem em demiplanos. Durante esse processo tumultuoso, faíscas de luz viva às vezes se desprendem dos planos recém-formados, e essas faíscas de energia planar bruta de algum modo se transformam em crianças rutilantes. Cada demiplano recém-formado deixa uma impressão mental diferente na “prole” rutilante, tornando fácil para elas reconhecer telepaticamente irmãos e irmãs. Presas para sempre em corpos aparentemente adolescentes, dedicam-se a erudição e violência em igual medida, num esforço fútil de entender os papéis no multiverso e a injustiça abrasadora dos próprios nascimentos.\n\nCrianças rutilantes confundem a maioria das outras criaturas com a recusa em usar nomes individuais, alternando entre referir-se umas às outras no singular e no coletivo.",
    "sections": [
      {
        "id": "ancient-guardians",
        "title": "Guardiões Antigos",
        "body": "A prática de conjurar e prender crianças rutilantes para servir de guardiãs de locais importantes era popular em Thassilon. Ainda hoje, milhares de anos após a queda desse império, aventureiros ainda podem encontrar crianças rutilantes em ruínas antigas, guardando tesouros e saberes esquecidos de um passado distante."
      }
    ]
  },
  "creature-shuln": {
    "description": "Flagelos das Terras Sombrias superiores, essas monstruosidades enormes semelhantes a toupeiras fatiam e escavam pedra sólida com antebraços maciços e garras fortes como adamantina. Shulns crescem até cerca de 6 m de comprimento e têm quatro olhos minúsculos, quase imperceptíveis; um focinho pálido e comprido; quatro pernas de músculo grosso que terminam em garras longas e serrilhadas; e uma cauda rosada e atarracada. À medida que um shuln jovem amadurece, o metabolismo único produz adamantina que se infunde por todo o sistema esquelético. Além de tornar garras e presas quase inquebráveis, esse traço fisiológico único faz dos shulns escavadores ímpares e alvos cobiçados de caçadores de monstros que esperam colher o material precioso dos cadáveres.\n\nShulns têm apetite voraz e comem quase tudo que conseguem pegar, mas a dieta preferida consiste quase inteiramente de invertebrados grandes, sobretudo vermes das cavernas. Dependem de bigodes sensoriais minúsculos que cobrem o focinho e permitem detectar movimentos sutis no ar e no solo sem usar a visão. Quando detectam presa adequada, mordem no primeiro instante, injetando uma toxina paralítica potente presente na saliva. Tão forte é esse veneno que é capaz de subjugar até o verme das cavernas quase imparável, tornando shulns companheiros valiosos (se perigosos) para quem faz incursões em regiões das Terras Sombrias infestadas de vermes. O gênio notoriamente ruim e o talento para cavar em áreas de um povoado subterrâneo onde não se deveria cavar os tornam criaturas frustrantes de manter por perto — mas quando a alternativa é uma visita imprevisível e mortal de um verme das cavernas enorme e faminto, os aborrecimentos valem a pena.\n\nEncontros com entidades bem maiores semelhantes a shuln no Plano da Terra sugerem que essas criaturas talvez tenham originado dali. Os shulns maiores ainda retêm qualidades elementais, são bem mais inteligentes e têm um conjunto próprio de magias inatas primais temáticas de terra — mas, apesar de tudo isso, ainda adoram o gosto de verme das cavernas.",
    "sections": [
      {
        "id": "stubbornness-and-spit",
        "title": "Teimosia e Cuspe",
        "body": "Aventureiros que temem encontros com vermes das cavernas podem procurar um shuln e tentar atraí-lo junto ou coagí-lo magicamente a ajudar na luta que virá, mas a personalidade teimosa do shuln torna tais esforços difíceis e pouco confiáveis. Com mais frequência, obter a saliva do shuln é uma tática mais fácil, embora o veneno precise ser preservado alquimicamente se for usado como veneno de ferimento, pois esse líquido de cheiro fétido se decompõe depressa uma vez que escorre da goela denteada do shuln."
      }
    ]
  },
  "creature-smaranava": {
    "description": "Muitos veem as nagas enevoadas como criaturas ciumentas e malevolentes. Só quem tem coragem de ver com clareza as reconhece pelo que de fato são: seres trágicos e feridos, presos e corrompidos pelo destino. A traição e a decapitação da deusa-mãe das nagas, Ravithra, cascateou trauma sobre todas as criações dela. Smaranavas nunca se recuperaram dessa ferida divina, e essas serpentes amaldiçoadas vivem meias-vidas miseráveis, tentando cumprir o propósito esquecido de Ravithra ao tentar e testar os mortais que encontram. Assim separam os vis dos retos, os dignos dos indignos.\n\nSmaranavas têm escamas escuras tornadas cinza-opaco pela pele presa que não se solta, os olhos branco-leitoso por causa das capas opacas. Muitas escarificam o pescoço em ritual, de luto pela mãe Ravithra. Lendas afirmam que os sábios e os iluminados podem libertar uma naga enevoada do destino, permitindo que ela mude de forma e emerja como naga despertadora.",
    "sections": []
  },
  "creature-soulbound-doll-brave": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento se agarra à coragem: avança quando deveria recuar, e o punho miúdo não espera permissão.",
    "sections": []
  },
  "creature-soulbound-doll-calm": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é calma: fala baixo, espera o momento, e raramente se deixa arrastar pelo pânico alheio.",
    "sections": []
  },
  "creature-soulbound-doll-careful": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é cautela: cada passo é medido, cada risco sopesado antes do punho subir.",
    "sections": []
  },
  "creature-soulbound-doll-gentle": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é gentileza: prefere o toque brando, mesmo quando o construto foi feito para guardar.",
    "sections": []
  },
  "creature-soulbound-doll-jolly": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é alegria: ri alto demais para o corpo de porcelana, e insiste em transformar ameaça em brincadeira.",
    "sections": []
  },
  "creature-soulbound-doll-kind": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é bondade: ainda tenta ajudar, mesmo num corpo feito para obediência — ou para guerra.",
    "sections": []
  },
  "creature-soulbound-doll-rash": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é precipitação: age no meio da frase, golpeia antes de pensar, e só depois pergunta o que havia para temer.",
    "sections": []
  },
  "creature-soulbound-doll-sassy": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é atrevimento: a língua é maior que o corpo, e o construto responde com deboche mesmo à ordem do criador.",
    "sections": []
  },
  "creature-soulbound-doll-timid": {
    "description": "Boneca de alma: um manequim miúdo com uma lasca de alma mortal na gema do peito. O fragmento é timidez: esconde-se, observa, e conjura de trás da mobília — o medo não apaga a lasca de alma.",
    "sections": []
  },
  "creature-tabellia": {
    "description": "Tabellias são as mensageiras de elite dos reinos celestiais, servindo deidades e exércitos celestiais ao entregar mensagens, fazer reconhecimento e prestar apoio a quem precisa de auxílio. Vigiam viajantes planares e tomam mortais poderosos sob as asas para mentorá-los. Carregam pergaminhos com mensagens importantes e outros segredos celestiais. A maioria das criaturas, mesmo as vis, respeita a força das tabellias e as deixa viajar sem estorvo.\n\nTabellias podem formar-se espontaneamente das almas de mortais excepcionais, mas também às vezes são criadas de tais almas de propósito por deidades ou semideuses. Nesses casos, com frequência ostentam traços físicos que as marcam como intimamente afiliadas àquela deidade. Uma tabellia criada por Sarenrae, por exemplo, pode ter cabelo feito de fogo; uma criada por Torag pode parecer mais anã; e uma criada por Desna pode ter asas de borboleta em vez de asas emplumadas. Não é incomum que tabellias criadas por deidades compartilhem as filosofias e os interesses dos criadores.",
    "sections": []
  },
  "creature-terotricus": {
    "description": "O lendário terotricus é um bolor-limo maciço oriundo das Fendas Exteriores. A consciência coletiva encapsula regiões inteiras, espalhando-se até onde a nuvem de esporos em crescimento constante o levar. Uma vez que se infiltrou no Universo a partir das Fendas, a agenda de um terotricus é alimentar-se de todas as criaturas vivas, infectando-as com os esporos, e a presença pode significar ruína para quem estiver no caminho.\n\nTerotricuses movem-se expandindo e contraindo com rapidez os “corpos” viscosos, capazes de escavar solo, deslizar sobre água e trepar encostas íngremes. Esses beemotes da podridão não precisam viajar para ver os planos se cumprirem: os esporos grudam com facilidade em demônios e outros habitantes das Fendas Exteriores, que por sua vez levam essa praga ao Universo quando os capetas são evocados.\n\nQuando um terotricus infecta uma criatura com os esporos, crescimentos fúngicos como teia começam a aparecer na pele da vítima até cobrir o corpo inteiro; nesse ponto, a mente também é subjugada e dobrada à vontade do terotricus. As vítimas preferidas incluem animais, elfos e fey, embora se alegre em infectar qualquer criatura que consiga pegar. Cultos de Treerazer ocasionalmente tentam contato com um terotricus, mas tais atos quase sempre resultam simplesmente numa seita nova de servos devastados por esporos.",
    "sections": [
      {
        "id": "terotricus-myths",
        "title": "Mitos do Terotricus",
        "body": "Os Kellids de Sarkoris lidaram com a cota justa de terotricuses durante a era da Ferida do Mundo, e esse povo desenvolveu rituais únicos para purificar terrenos contaminados com a ajuda de espíritos ancestrais e penas obtidas de celestiais. Bem ao sul dali, no que hoje se conhece como as Terras Encharcadas, habitantes dos ermos que ficam sabendo da presença de um terotricus — ou “praga-do-pântano”, como são chamados lá — carregam lanternas abençoadas por anjos na esperança de que essas luzes mantenham o terotricus à distância."
      }
    ]
  },
  "creature-thulgant": {
    "description": "Thulgants são qlippoths poderosos e inteligentes criados dos frenesins canibais de augnagars. Embora passem a maior parte do tempo caçando e batalhando demônios pelo controle das Fendas Exteriores, divertem-se com uma variedade de passatempos, como manter galerias de mortais petrificados ou construir covis maciços semelhantes a colmeias cheios de lacaios escravizados. Cada thulgant é um emaranhado horrendo de membros, com pernas de aranha, tentáculos contorcidos emergindo do topo da cabeça e três ferrões semelhantes a escorpião.",
    "sections": []
  },
  "creature-tor-linnorm": {
    "description": "Linnorms do tor habitam as montanhas vulcânicas mais altas, seja em cavernas naturais ou em crateras fundidas. O gênio de um linnorm do tor pode ser tão quente e destrutivo quanto o magma que a criatura lembra.",
    "sections": []
  },
  "creature-treerazer": {
    "description": "Treerazer, o autointitulado Senhor do Lago Arrasado, é um demônio poderoso à beira de ascender ao poder verdadeiro de um dos governantes do próprio Abismo — um lorde demoníaco. Por ora, mesmo como lorde demoníaco nascente, Treerazer é um inimigo perigoso.\n\nRaramente deixa o reino pantanoso de Tanglebriar — um matagal grande de folhagem corrompida e detritos em apodrecimento logo ao sul da Floresta Fierani de Kyonin — mas pode ser encontrado em qualquer ponto daquele pântano tóxico, muitas vezes acompanhado de uma pequena legião de demônios, fey corrompidos e outros aliados letais. Certos rituais ocultos têm o poder de chamá-lo para fora de Tanglebriar, concedendo-lhe a oportunidade de trabalhar os males diretamente além do reino ao qual foi exilado. Alguns acreditam que nenhuma força eldritch contém Treerazer e que, se quisesse, poderia viajar Golarion com impunidade, espalhando as bênçãos retorcidas do toque e a corrupção da presença; ainda assim, o Senhor do Lago Arrasado é tão astuto e perspicaz quanto letal, e prefere trabalhar os males no mundo a partir da segurança do reino pesadelo.",
    "sections": [
      {
        "id": "spawn-of-cyth-v-sug",
        "title": "Prole de Cyth-V'sug",
        "body": "Treerazer um dia foi o lacaio e tenente predileto (alguns até dizem filho) do senhor demônio Cyth-V'sug, Senhor dos Fungos e Parasitas. Após uma tentativa fracassada de tomar esse papel nas Fendas Exteriores de Cyth-V'sug, Treerazer fugiu para o Universo mortal. Cyth-V'sug foi incapaz (ou talvez apenas relutante) de persegui-lo, mas tomou medidas para garantir que Treerazer permanecesse lá ao exilá-lo, rompendo o vínculo de Treerazer com as Fendas Exteriores — se o Senhor do Tarn Maldito for morto, sua essência não retornará às Fendas Exteriores para se reformar. A morte, para Treerazer, é algo permanente."
      },
      {
        "id": "treerazer-s-cultists",
        "title": "Cultistas de Treerazer",
        "body": "Treerazer é adorado por cultistas por toda a região do Mar Interior. A maioria pode ser encontrada dentro ou perto da extensão de Tanglebriar, composta de fey corrompidos por fungos, elfos degenerados ou outros adoradores sinistros de demônios. Além de Tanglebriar, seus cultistas são mais raros e tendem a ser solitários ou líderes de grupos muito pequenos. O símbolo religioso de Treerazer é uma árvore morta sangrando que foi partida ao meio.\n\n **Áreas de Preocupação** corrupção da natureza, poluição e massacre de elfos **Éditos** corromper vida vegetal com influências malignas ou fúngicas, matar elfos, banquetear-se com carne podre ou fungo **Anátema** conceder misericórdia a elfos, plantar árvores, incentivar o crescimento natural das plantas **Atributo Divino** Força ou Sabedoria\n\n **Magias de Clérigo** 1º: _Tentáculos Sombrios_, 3º: _Muralha de Espinhos_, 6º: _Trepadeiras Emaranhadas_ **Fonte Divina** _Ferir_ ou _Curar_ **Santificação Divina** deve escolher profano **Perícia Divina** Natureza **Domínios** destruição, natureza, pesadelos, tirania **Arma Favorecida** machado grande"
      }
    ]
  },
  "creature-vicharamuni": {
    "description": "Nagas despertadoras são mestras benévolas e sábias de pessoas e lugares. Buscam guiar e nutrir o mundo à volta, sentindo mortais ou locais com potencial importância sobrenatural. Ao localizá-los, essas nagas oferecem instrução e provações divinas para forjar os pupilos rumo à força e transmitir uma compreensão mais profunda do certo e do errado. Embora consideradas mestras severas e intimidadoras pelos estudantes, quem é ensinado por uma vicharamuni com frequência segue para se tornar um grande herói.\n\nNagas despertadoras são igualmente atentas ao guiar os filhotes. Ao atingir a idade adulta, uma naga recebe uma provação final antes de ser encorajada a deixar o ninho e buscar as próprias maravilhas naturais ou mortais promissores. Às vezes gerações de nagas guardam o mesmo lugar ou a mesma linhagem familiar, passando a honra de tal cuidado de pai para filho. Nesses casos, as nagas progenitoras visam ter pelo menos um dos filhos optando por ficar e tornar-se o guardião do pupilo ancestral, dando aos pais a paz de espírito de que o sítio que protegem continuará guardado pelos descendentes.",
    "sections": []
  },
  "creature-vidileth": {
    "description": "Os poderosos vidileths são os mestres velados insidiosos dos alghollthus. Esses manipuladores de mente e corpo igualmente lideram a espécie às claras, usando a habilidade de mudar de forma para andar entre humanos e outras espécies sápientes e enganá-los. Muitos mestres velados são ainda mais poderosos que o espécime típico apresentado aqui e podem usar uma gama ampla de magias e rituais arcanos ou ocultos. Embora mestres velados comandem proeza de combate significativa e habilidades mágicas impressionantes, o maior perigo que representam aos outros é a habilidade inquietante de infiltrar sociedades bem diferentes da própria. Os aventureiros e eruditos de conspiração mais paranoicos preocupam-se de que cada cidade grande esteja infestada de cabalas secretas de vidileths; outros descartam isso como bobagem e alarmismo. A verdade provavelmente está no meio, mas não é preciso muitos mestres velados puxando os fios nos bastidores para lançar o caos sobre uma nação inteira!",
    "sections": []
  },
  "creature-vilderavn": {
    "description": "Na forma verdadeira, um vilderavn é um corvo grande com envergadura de 1,8 a 2,4 m. Metamorfos adaptáveis, podem mudar para as formas de combate de um lobo rosnando, um híbrido de lobo e corvo, e um humanoide alto em armadura negra com uma espada larga maciça. Mais sinistro é a habilidade de assumir um disfarce humanoide adequado a insinuar-se no séquito de governantes mortais jactanciosos. Com saber histórico e rumores espertos, instigam os orgulhosos a rixas, feudais e, por fim, guerras. O vilderavn permanece ao lado do governante até a vitória estar ao alcance, a guerra quase ganha — então aplica o golpe cruel da traição. A magia vira os mortais uns contra os outros, e a espada do vilderavn cai depressa.",
    "sections": [
      {
        "id": "the-creation-of-vilderavns",
        "title": "A Criação dos Vilderavns",
        "body": "Lendas dizem que um lorde fey criou os vilderavns como arma contra os que arruinavam a terra com armamentos de ferro. Vilderavns explorariam a soberba dos mortais e devorariam as almas após a morte. Com esse objetivo, vilderavns se esconderam em várias formas para observar e aprender os modos humanos, e executaram o chamado com grande sutileza, mas sem misericórdia. Nenhum mortal sabe se essa lenda é verdadeira ou se foi espalhada pelos vilderavns para insinuar um propósito à crueldade sem coração."
      }
    ]
  },
  "creature-vrolikai": {
    "description": "Vrolikais poderosos comandam os exércitos indômitos dos demônios, unindo-os atrás do único desejo unificador de morte e destruição. Diferente de outros demônios, o temido vrolikai não se forma diretamente de uma alma só — manifesta-se quando um demônio devora tantas almas condenadas que os próprios desejos individuais se perdem na cacofonia pecaminosa. Um vrolikai que sobrevive a esse processo ganha grande poder e pode reivindicar uma região das Fendas Exteriores como domínio próprio.\n\nO abraço entusiasmado da multidão de pecados torna os vrolikais especialmente adequados a liderar e unir demônios, a ponto de até lordes demoníacos muitas vezes precisarem deles para comandar as forças. As motivações caóticas e conflitantes da demoníaca deixam pouco espaço para terreno comum, mas o vrolikai pode exaltar a beleza de cada tipo de pecado enquanto marcha exércitos demoníacos à batalha.",
    "sections": []
  },
  "creature-xoarian": {
    "description": "Os xoarians de cinco tentáculos infiltram muitas sociedades, embora não esteja claro quanto das atividades é a mando do Domínio do Negro e quanto é para o próprio deleite perverso. Conhecidos como cavaleiros de cadáver por eruditos de Golarion, pouco se entende das origens além da suspeita de que venham de um planeta distante chamado Xoar.\n\nQuando um xoarian infiltra uma comunidade, a primeira prioridade é adquirir um corpo hospedeiro. Com frequência escolhem os recém-mortos para esse papel, pois assassinar um hospedeiro vivo poderia atrair atenção indesejada. Quando a aberração se comprime na cavidade craniana do hospedeiro, passa a mover o corpo como se fosse o próprio. Também adquire uma gama complexa de sentidos que normalmente lhe falta.\n\nCada corpo novo traz a oportunidade de gostos, sons, visões e até dores novas. Reunidos em grupos, xoarians trabalham para aumentar o status e provar as experiências negadas às classes baixas. Xoarians no controle de um corpo têm pouco a temer além da descoberta, e mesmo isso apenas pausa os jogos. Dano ao hospedeiro é só mais uma sensação a experimentar, e corpos de reposição são fáceis de achar.",
    "sections": [
      {
        "id": "ilvarandin",
        "title": "Ilvarandin",
        "body": "Éons atrás, um grupo de xoarians descobriu um cofre nas Terras Sombrias que continha uma cidade já abandonada, Ilvarandin. Instalaram-se na cidade enquanto espalhavam rumores de que Ilvarandin é uma utopia onde cada dia é vivido na busca de prazer maior. Na verdade, esses benefícios se estendem só aos próprios xoarians. Não se sabe que propósito, se algum, a cidade serve nos planos do Domínio do Negro."
      }
    ]
  },
  "creature-zecui": {
    "description": "Essas entidades quitinosas só conseguem crescer até a idade adulta dentro de uma criatura hospedeira, em geral um humanoide ou um animal maior. Quando tais hospedeiros são particularmente abundantes, zecuis podem multiplicar-se a um ritmo horrendo, selando hospedeiros em câmaras subterrâneas até as larvas atingirem a idade adulta. Porém, em tempos de escassez, zecuis adultos saciam a fome comendo esses hospedeiros junto com qualquer larva azarada gestando dentro — incapazes de ser infestados pelos próprios filhotes.\n\nEntre períodos de vigília, zecuis hibernam por décadas em tocas ou enterrados no solo. Às vezes uma larva não incubada é enterrada assim, esperando que um hospedeiro vivo entre em contato. Uma vez que uma larva de zecui gestou o bastante para tomar o controle do hospedeiro, pode buscar entidades maiores e mais poderosas para devorar o hospedeiro, transferindo-se a uma fonte de comida mais abundante.",
    "sections": [
      {
        "id": "the-dark-brood",
        "title": "A Ninhada Sombria",
        "body": "Embora zecuis em geral operem em ninhos pessoais, uma coalizão de zecui prospera na Selva de Valashmai de Tian Xia, nidificando nas ruínas do império antigo que tentou controlar seus ancestrais. Recentemente, a ninhada voltou o olhar para fora, reunindo números para começar uma grande expansão."
      }
    ]
  },
  "creature-zoaem": {
    "description": "Esses arcontes de curiosidade sem fim são formados de rodas giratórias de luz dourada ganhas forma corpórea. Servem de vigias e tropas de apoio móveis para as legiões de arcontes, às vezes unindo-se para formar guerreiros poderosos de luz chamados gestalts. Coletivos maiores de zoaems podem até fundir-se temporariamente em arcontes maiores, aproximando-se do poder do primeiro zoaem, que se partiu para servir o Céu com mais eficiência.",
    "sections": []
  },
  "creature-spiral-centurion": {
    "description": "Esses construtos mecânicos foram criados para servir de guardiões numa era antiga e já passada, embora exatamente quem os fez e os segredos da construção há muito se tenham perdido na história. Da cintura para cima, lembram humanoides feitos de metal, mas da cintura para baixo o corpo toma a forma de piões de metal giratórios cingidos de lâminas que se destacam em ceifar inimigos próximos. A maioria dos centuriões espirais pode ser mandada recuar com uma senha, mas muitas vezes essas frases de comando se perderam nas brumas do tempo. Em casos raros, um centurião espiral também pode empunhar armas manufaturadas ou um escudo além das armas embutidas, dando-lhe acesso a ações adicionais além das listadas abaixo.\n\nA maioria dos centuriões espirais tem centenas ou até milhares de anos, permanecendo funcional só por causa da magia poderosa usada na criação. Ainda assim, milênios de abandono fizeram muitos centuriões espirais desenvolver falhas ou mau funcionamento pequenos.",
    "sections": [
      {
        "id": "spiral-centurion-glitches",
        "title": "Falhas de Centurião Espiral",
        "body": "Um centurião espiral pode ter uma das seguintes falhas.\n\n**Lâminas Cegas** Seu Golpe de lâmina causa apenas 2d10+5 de dano de concussão.\n\n**Engrenagens Desalinhadas** Perde Acelerar o Giro e, se Distancia mais de uma vez por rodada, sofre 1d10 de dano.\n\n**Travado na Rotina** Usa as mesmas ações a cada rodada, independentemente das circunstâncias."
      }
    ]
  },
  "creature-unrisen": {
    "description": "Um unrisen é uma conglomeração mutilada de ossos estilhaçados, órgãos em decomposição e carne podre, criado quando um ritual como ressuscitar dá errado de forma catastrófica. É preciso extremo cuidado, pois se tal ritual falha por completo, um unrisen pode ser o resultado — como muitos ritualistas já aprenderam para seu horror.\n\nUnrisen mal têm inteligência, conscientes só da agonia infligida sem parar pela criação falha e do ressentimento pelos vivos. Tendem a atacar primeiro os conjuradores envolvidos no ritual fracassado antes de voltar-se contra todos os outros ao redor. Embora a forma torcida de um unrisen seja irreconhecível como o alvo pretendido da ressurreição, os uivos sem palavras muitas vezes são perturbadoramente semelhantes à voz do falecido. Se um unrisen é destruído antes de poder erguer-se de novo, reduz-se a um punhado de sais metálicos azul-esverdeados chamados sais essenciais.",
    "sections": [
      {
        "id": "unrisen-salts",
        "title": "Sais de Unrisen",
        "body": "Os sais essenciais de um unrisen, formados de sua essência vital destilada restante, podem ser usados em magias e rituais como criar morto-vivo ou ressuscitar, substituindo 600 po em gemas. A existência desses sais essenciais não danifica a alma da criatura de origem do unrisen, mas Pharasmins devotos ainda desaprovam o uso."
      }
    ]
  },
  "creature-vigilia": {
    "description": "Os construtos guardiões de Axis são construídos em grande número pelos axiomitas e patrulham com regularidade as ruas daquela metrópole rigidamente estruturada. Além da cidade, uma vigilia pode ser invocada por mortais para guardar um local específico ou fazer cumprir os éditos de um líder.\n\nEmbora em geral de forma humanoide, os corpos são uma malha frouxa de tiras de latão em torno de um núcleo cristalino como os arbiters nos quais se baseiam. O núcleo de cada vigilia se forma em torno de um fragmento diferente de texto legal das vastas bibliotecas de Axis. Esse regimento ou subseção, embora não necessariamente importante para outros, forma a força motriz mística e emocional por trás dessas sentinelas.\n\nDeixadas à própria sorte, vigilias em geral fazem cumprir as leis locais até onde entendem, recorrendo às ordenanças labirínticas de Axis para preencher quaisquer lacunas. Embora vigilias se sintam desconfortáveis em emitir juízos, são capazes de fazê-lo. Dito isso, esse desconforto com frequência as faz buscar refúgio em áreas com as leis mais complexas e completas.",
    "sections": []
  },
  "creature-arboreal-archive": {
    "description": "Arquivos arbóreos são seres solitários tipicamente encontrados na natureza selvagem distante. Esses monólitos antigos guardam as memórias de seus vastos territórios, mantendo registros mentais das estações que passam no mundo ao redor. O conhecimento de assuntos humanoides varia, pois acham situações políticas que mudam depressa difíceis de compreender, mas por meio de redes fúngicas, relatórios de guardiões arbóreos e outras conversas da mata, arquivos arbóreos tomam conhecimento de cada tempestade, seca ou ameaça madeireira encontrada ao longo dos longos anos. Observam e registram sobretudo em vez de interferir, mas oferecem de bom grado sabedoria a quem os busca com respeito. Regentes arbóreos convocam arquivos em tempos de conflito, conferindo sobre o melhor curso de ação para proteger os reinos.\n\nÉ raro haver mais de um arquivo arbóreo numa dada região. Quando um arquivo sente que se aproxima do fim da vida longa, um bosque de regentes reúne-se para nomear o mais sábio entre eles para se tornar o próximo arquivo. Depois de quatro estações de deliberação, todos os arbóreos da área congregam-se para testemunhar o ritual de sucessão, durante o qual o arquivo arbóreo ancião transfere a sabedoria coletada ao substituto eleito antes de retirar-se.",
    "sections": [
      {
        "id": "painting-memories",
        "title": "Pintando Memórias",
        "body": "Como todos os arbóreos, nenhum arquivo arbóreo é idêntico em aparência a outro. A casca de padrões únicos dos arquivos arbóreos os torna ainda mais distintos uns dos outros, pintando um registro misterioso e único de seu Conhecimento de Floresta. Praticantes de magia primal acreditam que as cores terrosas que adornam o corpo de cada arquivo arbóreo guardam pistas sobre as memórias e os mitos que a criatura coleta e preserva."
      }
    ]
  },
  "creature-calikang": {
    "description": "Calikangs são guardiões gigantes de pele azul e seis braços de tumbas e tesouros antigos. Cada um sente um impulso profundo e inerente de proteger e guardar, tornando-os muito procurados como zeladores e guarda-costas. Como a maioria serve como guardiões solitários, poucas sociedades calikang existem.\n\nAs fisiologias únicas dos calikangs lhes permitem absorver e manipular magia elétrica bem como outras energias. Podem viver 200 anos — embora possam estender ainda mais as vidas via animação suspensa. Por essa razão, muitos são escolhidos para guardar tumbas ou outros sítios selados onde guardiões vivos pereceriam e construtos se deteriorariam.",
    "sections": [
      {
        "id": "calikang-origins",
        "title": "Origens dos Calikangs",
        "body": "A lenda afirma que um antigo deus Vudrani falhou em proteger um tesouro importante de um ataque de asuras. Envergonhado, decepou os próprios dedos e os lançou sobre o mundo. Calikangs surgiram dos dedos e, como penitência, desde então buscam proteger possessões mundanas de roubos ou invasões."
      }
    ]
  },
  "creature-catoblepas": {
    "description": "O catoblepas é uma fera agressiva até nos melhores momentos. Embora prefira pântanos, o catoblepas já foi visto forrageando em planícies e florestas por períodos curtos, deixando para trás terrenos de caça maculados pelo hálito fétido e pelos dejetos nauseantes que outros predadores e presas igualmente evitam por dias ou até semanas depois. O catoblepas intimida as criaturas que acredita serem páreo e come tudo que for mais fraco.\n\nUm catoblepas tem 4,5 m de comprimento e pesa 1.000 kg.",
    "sections": [
      {
        "id": "catoblepas-nests",
        "title": "Ninhos de Catoblepas",
        "body": "O covil de um catoblepas é de fato um lugar horrível — um ninho imundo composto de pilhas de vegetação em decomposição, refeições de animais podres pela metade ou meio digeridas, barrancos de lama que nunca secam de todo e emaranhados de galhos espinhosos. Pior ainda, o fedor do catoblepas impregna tal sítio, impondo o fedor abominável da fera a quem o explorasse e vasculhasse em busca de tesouro. Um ninho de catoblepas pode reter o fedor dessa forma por até uma semana depois de ser abandonado por seu habitante nauseabundo."
      }
    ]
  },
  "creature-ferrugon": {
    "description": "Esses diabos de cabeça de carneiro têm asas e carne feitas de metal enferrujado. São forjados das almas de mortais condenados que fizeram outros sofrer por meio do trabalho criativo. Gostam de tentar os da mesma laia, empurrando autores e diretores de palco à crueldade na busca da grandeza. Ferrugons também gostam de empurrar artistas a extremos a fim de quebrá-los. Mergulham os corpos de mortais que levaram ao desespero em metal fundido para fazer estátuas horrificamente disformes, que então acrescentam aos covis.\n\nDiabos da ferrugem preferem a tentação à luta e só entram em combate se protegendo algo que lhes é caro.",
    "sections": [
      {
        "id": "makers-of-rust",
        "title": "Forjadores de Ferrugem",
        "body": "As magias inatas _Petrificar_ e _Muralha de Pedra_ de um ferrugon resultam em objetos de ferro enferrujado em vez de pedra. Como esse ferro está enferrujado e falho, compartilha as mesmas estatísticas físicas da pedra criada pelas magias e é de qualidade baixa demais para servir de fonte para forjar objetos de metal."
      }
    ]
  },
  "creature-girtablilu-seer": {
    "description": "A posição de autoridade mais alta numa comunidade girtablilu é a de líder religioso do grupo. Esse dever sagrado exige anos de estudo, meditação e dedicação para despertar uma fonte mística de magia divina no girtablilu. Esses videntes asseguram que cada ação tomada pela comunidade se alinhe até ao dogma mais obscuro da tradição, e não hesitam em voltar a fúria contra membros da própria comunidade que violem os mandatos.",
    "sections": []
  },
  "creature-grisantian-lion": {
    "description": "O aparecimento do poderoso grogrisant é um evento de uma vez por geração, mas os descendentes dessas feras lendárias são bem conhecidos ao longo das World's Edge Mountains e por todo Taldor. Esses predadores primevos não viajam em alcateia como leões mundanos. Em vez disso, evitam outros da própria espécie, até para acasalar, e procuram leões comuns uma vez por ano para esse fim. Uma leoa grisantiana que gera filhotes só cuida da prole o bastante para que se tornem autossuficientes — o que leva só alguns meses, graças ao crescimento e ao desenvolvimento incrivelmente rápidos da espécie.\n\nUm leão grisantiano adulto é tão grande quanto um elefante e extremamente agressivo, caçando qualquer coisa que encontre. Enquanto leões comuns dependem de furtividade e táticas de matilha para garantir uma refeição, o leão grisantiano é grande demais para esconder-se no capim alto. Em vez disso, adaptou-se às montanhas, onde escolhe uma caverna grande e de difícil acesso como lar, muitas vezes matando qualquer criatura infeliz o bastante para já habitar o lugar. Um leão grisantiano pode rastrear por quilômetros e é um caçador astuto, escondendo-se ao longo de falésias e afloramentos rochosos enquanto espreita a presa.\n\nEmbora sejam criaturas selvagens que nunca podem ser amansadas, leões grisantianos entendem Taldane e ocasionalmente concordam em ajudar quem defende a natureza. Porém, tais alianças são temporárias e pouco confiáveis na melhor das hipóteses.",
    "sections": [
      {
        "id": "the-legend-of-the-grogrisant",
        "title": "A Lenda do Grogrisant",
        "body": "Contos antigos da fundação de Taldor falam do Grogrisant, um leão enorme de seis olhos com uma juba que brilhava como o sol. O leão destruiu as cidades-estado da região, alimentando-se do gado e saqueando a riqueza para forrar o covil. O grande herói Taldaris por fim matou a fera terrível e veio a tornar-se o Primeiro Imperador de Taldor. Leões aterradores de seis olhos reminiscentes do original fazem aparições repetidas ao longo da história de Taldor só para encontrar o fim nas mãos de heróis. Enquanto o Grogrisant original da lenda é honrado com um nome capitalizado, os grogrisants restantes da história carregam o nome menos formal para fins de classificação."
      }
    ]
  },
  "creature-interlocutor": {
    "description": "Interlocutores são os cirurgiões-escultores mais talentosos dos velstracs, entalhando a carne e substituindo-a por partes novas de músculo, tendão e metal. Cada interlocutor estrutura a aparência individual com cuidado, mas todos são amalgamas altaneiras de múltiplos membros, dos membros mais fortes, ossos mais densos e metais mais afiados que encontram. Buscam continuamente material novo para enxertar nas formas, e os inimigos abatidos raramente são encontrados intactos, pois pouco é mais valioso para interlocutores do que as pernas, os olhos ou até o cérebro de um oponente poderoso. Devido às propriedades únicas, depósitos de metais-céu às vezes atraem interlocutores ao Universo mortal. Interlocutores têm em média 2,7 m de altura e pesam aproximadamente 360 kg.",
    "sections": []
  },
  "creature-rusalka": {
    "description": "Esses fey andróginos que habitam rios deleitam-se em manipular as emoções daqueles infelizes o bastante para cair em seu alcance, usando humilhação para quebrar as vontades das vítimas. Rusalkas gostam de manter os brinquedos quebrados por perto, tanto para entretenimento contínuo quanto para auxiliar na defesa, pois a miséria dos cativos muitas vezes os leva a tornar-se obsessivamente leais a esses fey. Se uma pessoa alguma vez escapa das garras de uma rusalka, a rusalka provavelmente a procurará e a envergonhará por “abandonar” o lar, tudo na esperança de que a vítima regrida a um estado mental angustiado e volte ao cativeiro.",
    "sections": [
      {
        "id": "blue-week",
        "title": "Semana Azul",
        "body": "Quem vive em áreas onde rusalkas habitam sabe bem evitar a água durante o período de uma semana no início de Sarenith quando os fey se tornam particularmente ativos, um tempo conhecido em muitas regiões como Semana Azul. A maioria das vilas proíbe natação e pesca nesse período, embora a proibição seja difícil de fazer cumprir, pois ocorre no auge do bom tempo. Pessoas particularmente supersticiosas cuidam de trancar as portas tanto por dentro quanto por fora."
      }
    ]
  },
  "creature-tomb-giant": {
    "description": "Mestres de mausoléus e zeladores de criptas, as criaturas pavorosas chamadas gigantes da tumba são anátema a todos os seres vivos, mas especialmente a outros tipos de gigantes. Há muito tempo, dizem as lendas, gigantes da tumba venderam as próprias almas em troca de poder insondável sobre os mortos-vivos. Gigantes da tumba constroem assentamentos góticos maciços em vales assombrados e encostas abandonadas, longe o bastante das sociedades de povos menores para permanecer relativamente sem perturbações, mas perto o bastante para saquear os cemitérios de vilas próximas com impunidade. Gigantes da tumba anciãos deleitam-se na emoção de subjugar, matar e reanimar os gigantes da própria espécie. Um gigante da tumba vê a vida mortal como só uma parte da existência. Depois da morte, a maioria dos gigantes da tumba é reanimada como mortos-vivos, que então continuam a praticar as artes necromânticas.",
    "sections": []
  },
  "creature-valkyrie": {
    "description": "A canção das valquírias toca onde quer que aço tilinte contra aço. Escolhedoras dos mortos e chamadas anjos da batalha, valquírias são indivíduos humanoides de porte físico impressionante que buscam as batalhas mais épicas e os conflitos lendários para reivindicar as almas dos maiores guerreiros do mundo. As valquírias transformam essas almas nos imortais implacáveis conhecidos como einherjar.\n\nValquírias com mais frequência servem deuses da batalha e da guerra, embora uma possa jurar serviço a qualquer deidade que considere digna. Gorum era particularmente conhecido por ter servos valquíria e einherjar. Besmara também tem valquírias entre os servos, e muitas histórias de “navios fantasma” na verdade referem-se a relatos de encontros com navios tripulados por einherjar devotos da Rainha Pirata.",
    "sections": [
      {
        "id": "boneyard-advocates",
        "title": "Advogados do Ossário",
        "body": "Enquanto reza para reivindicar um guerreiro morto, uma valquíria fratura a própria consciência em duas partes: mente e alma. Envia a mente girando pelo Rio das Almas para recolher e advogar em nome da alma do guerreiro morto. Quando a prece termina, a valquíria reúne mente e corpo, e une o corpo e a alma do guerreiro numa forma única como um novo einherji."
      }
    ]
  },
  "creature-worm-prophet": {
    "description": "Mesmo acreditando que habitarão com a deidade no além, ao aproximar-se da morte alguns sacerdotes clamam desesperados a quaisquer deuses dispostos a ouvir. Os vermes que consomem a carne de tal ex-sacerdote absorvem essas preces, transformando-se num profeta verme, um andador de enxame pio que pode adorar centenas de deuses sem chamar nenhum de patrono, talvez colecionando dezenas de símbolos religiosos ou arrancando páginas ao acaso de vários textos religiosos e encadernando-as numa escritura nova e contraditória. Essas criaturas muitas vezes perdem quaisquer éditos e anátemas que as vinculavam em vida e em vez disso buscam com fome converter outros à fé de retalhos — ou “doutrinar” vítimas consumindo quem não se junta de bom grado. Profetas verme em geral não têm reservas em entrar na forma de enxame sempre que acham adequado.",
    "sections": []
  },
  "creature-xiuh-coatl": {
    "description": "Mais ferozes que outros coatls, xiuh coatls (pronuncia-se \"shoo\") dedicam-se a buscar criaturas malevolentes e oferecer uma última oportunidade de redenção.",
    "sections": []
  },
  "creature-ambush-copse": {
    "description": "Madeira serrada e talhada a machado range junta quando um bosque de emboscada se move, esmagando pela floresta. Cortes e queimaduras marcam a casca desta massa gigantesca e irada de toros giratórios e mortais.\n\nA floresta nunca esquece. Lembra as machadinhas, as serras raspando e a fumaça de fogueiras de madeira crepitante. Lembra as carroças levando árvores antigas embora para cortar, talhar e queimar. Intromissão fey ou magia elemental errante puxam tais memórias para fora junto com a raiva e a mágoa da floresta para formar um bosque de emboscada.\n\nUm bosque de emboscada descarrega a ira sobre vilas ao longo da trilha do lenhador ou espera que intrusos entrem no domínio florestal. Embora um bosque de emboscada possa ser tomado por um arbóreo ferido, pode cessar o movimento para parecer uma pilha de toros coberta de mato ou um casebre parcialmente desabado. Ali, espera a retribuição.",
    "sections": [
      {
        "id": "ravages-of-revenge",
        "title": "Estragos da Vingança",
        "body": "Uma espera sem fim por vingança invariavelmente deixa um bosque de emboscada crivado de cogumelos e cupins. Aplique o ajuste fraco a tal bosque de emboscada e dê-lhe fraqueza 10 a dano de concussão. Durante um período de dormência, partes do bosque de emboscada podem quebrar-se, ganhar a própria senciência e seguir rumo a um acampamento ou vila próxima. Use as estatísticas de um twigjack para representar esses pedaços soltos, cuja chegada pode presagiar o despertar pleno de um bosque de emboscada."
      }
    ]
  },
  "creature-anguished-flame": {
    "description": "Contos antigos dizem que o senhor elemental Atreia criou seus filhos de seis asas para conduzir preces mortais aos reinos do divino. Esses elementais trabalham lado a lado com servos deíficos celestiais e infernais para aceitar sacrifícios e oferendas, mas também abençoam mortais contritos com absolvição e purificação, ajudando-os a mudar o destino que os espera depois da morte.",
    "sections": [
      {
        "id": "ages-in-darkness",
        "title": "Eras nas Trevas",
        "body": "Ao longo do éon do aprisionamento do senhor Atreia dentro do Garnet Brand, templos ao Rei Cintilante jaziam dormentes e em decadência pelo Plano do Fogo, e dentro desses templos seus filhos, conhecidos como ygnaires, começaram a definhar. Sem a luz de seu Senhor do Fogo, esses elementais que definharam passaram a ser conhecidos como chamas angustidas. Por fim transformaram-se em bronze imóvel, congelados até a luz de Atreia brilhar sobre eles de novo."
      }
    ]
  },
  "creature-animated-trebuchet": {
    "description": "Exércitos grandes às vezes pagam taxas exorbitantes para animar as armas de cerco.",
    "sections": []
  },
  "creature-assault-alloy": {
    "description": "Enquanto Laudinmio, o Soberano da Alquimia, dorme no Plano do Metal, seus alunos mais curiosos espalharam-se pelo Universo para conduzir experimentos alquímicos cada vez mais ousados. Conhecidos como ligas de assalto, esses elementais travessos cansaram-se e enjoaram dos impulsos acumuladores dos humanoides, sobretudo em uniformidade tão insípida. Não sabem que a maior força do metal está na diversidade?",
    "sections": [
      {
        "id": "the-hoarder-s-scourge",
        "title": "O Flagelo do Acumulador",
        "body": "Ligas de assalto estão constantemente em busca de fontes cada vez maiores de metal para usar nos experimentos. Banqueiros, armeiros, ferreiros, sucateiros e até dragões todos se acautelam de uma liga de assalto se instalar entre seus bens. Muitas vezes pagam generosamente quaisquer aventureiros capazes de desarraigar as pragas perigosas."
      }
    ]
  },
  "creature-ayngavhaul": {
    "description": "Onde uma mente brilhante em busca de conhecimento se corrompe por mentiras eloquentes e verdades torcidas, um ayngavhaul certamente espreita. Muitas vezes paramentados nas vestes sagradas de outras fés numa zombaria torcida de seus princípios, esses diabos astutos e bem lidos deleitam-se em usar o conhecimento para torcer textos e ensinos religiosos nos princípios perigosos contra os quais esses mesmos textos advertem. Embora muitos ayngavhauls desenvolvam conhecimento avançado de especializações únicas, há muitos cuja profundidade de conhecimento de uma única religião rivaliza até a dos sacerdotes mais anciãos.\n\nQualquer informação que um ayngavhaul tenha lido ou aprendido é acrescentada a um tomo vivo maciço único do ayngavhaul. A informação contida ordena-se com base no tópico e no ponto que o dono está fazendo.\n\nEmbora esses diabos passem a maior parte do tempo nas bibliotecas do Inferno, são com mais frequência invocados em lances desesperados por estudantes em busca de conhecimento perdido ou proibido, e tal conhecimento tem um preço. Esses diabos usam verdades e interpretações frouxas de textos para emprestar credibilidade aos pontos de vista heréticos. Quando esses intelectuais outrora brilhantes são corrompidos em sacerdotes blasfemos, tiranos e déspotas espalhando as palavras torcidas de um ayngavhaul, aquele diabo ganha influência e renome nos círculos eruditos do Inferno.",
    "sections": [
      {
        "id": "beyond-peer-review",
        "title": "Além da Revisão por Pares",
        "body": "Cada ayngavhaul carrega um tomo pessoal que é uma enciclopédia em constante mudança de conhecimento e literatura entremeada de viés malevolente e meias-verdades. Quando um ayngavhaul lê o tomo pessoal, consegue entender de forma intrínseca os conceitos apresentados e a verdadeira natureza do texto, o que muitas vezes é necessário para acrescentar credibilidade aos argumentos. Dependendo da personalidade do ayngavhaul, às vezes toma um tomo que encontra como novo tomo pessoal, transfixado pelas verdades novas achadas dentro. O tomo é ilegível para todas as outras criaturas."
      }
    ]
  },
  "creature-carnivorous-blob": {
    "description": "Bolhas carnívoras são a prole voraz de mundos estilhaçados bem além das estrelas, nascidas pela galáxia em forma inerte até caírem como meteoritos sobre mundos desprevenidos. Esses seres maciços podem jazer dormentes por anos em cavernas desoladas ou ermos áridos. Quando uma bolha carnívora percebe criaturas vivas por perto, desperta para a vida gelatinosa, buscando e consumindo cada criatura que consegue pegar até ser destruída ou até não conseguir localizar comida por 24 horas, ponto em que volta à hibernação. Muitas vezes, manter comida longe de uma bolha carnívora é o jeito mais seguro de vencê-la. A habilidade da bolha de dividir-se em gosmas menores que podem permanecer ocultas depois de uma luta significa que pode ser difícil erradicar por completo esses predadores sem mente.",
    "sections": []
  },
  "creature-destiny-tempest": {
    "description": "Antes do Império Jaathoom, o Plano do Ar era governado por tempestades do destino a partir de seu Império Reveriente das Noites Perdidas. Quando os exércitos jaathoom esmagaram o Império Reveriente, aprisionaram as tempestades do destino derrotadas em esferas de bronze espalhadas pelo Plano do Ar, prisões de tempo e pesadelo eterno.",
    "sections": [
      {
        "id": "hushed-voices",
        "title": "Vozes Abafadas",
        "body": "No Plano do Ar, muitas criaturas comunicam-se por telepatia, sonhos compartilhados ou rébus ilusórios. Embora tempestades do destino sejam telepáticas e consigam entender magicamente a maioria dos idiomas, preferem transmitir pensamentos e ideias metaforicamente moldando as nuvens e as correntes do Plano do Ar para encenar histórias e peças elaboradas e em movimento. Às vezes essas nuvens animadas retêm um pouco de magia, tornando-se Pictures-in-Clouds."
      }
    ]
  },
  "creature-dibrasgorth": {
    "description": "Dibrasgorths, às vezes chamados Mães do Oblívio, são criaturas monstruosas do caos que habitam espaços sem luz, muitas vezes perto do fundo de lagos e oceanos profundos tanto na superfície quanto no subterrâneo. Podem parecer monstros hediondos com cabeças semelhantes a um plesiossauro sobre massas de tentáculos, cada um rematado com um olho vermelho maligno, mas dibrasgorths têm um senso torcido de astúcia, provavelmente devido à habilidade de ver e afetar planos além daquele em que estão. Embora sejam bem poderosos (alguns sendo os servos prediletos de Lamashtu), dibrasgorths preferem manter a existência em segredo dos mortais do mundo acima.",
    "sections": [
      {
        "id": "the-myth-of-black-magga",
        "title": "O Mito de Black Magga",
        "body": "Locais varisianos que vivem perto do Storval Deep, um lago de água doce enorme no Planalto Storval, contam histórias de Black Magga, uma dibrasgorth poderosa e profana rumorejada ser mais velha que os deuses. Dizem que tempestades terríveis presagiam sua aparição perto da superfície do lago, e que quem vê sua forma e vive é amaldiçoado a não conseguir descrevê-la por completo, com sangue negro brotando na boca se fizerem a tentativa."
      }
    ]
  },
  "creature-exscinder": {
    "description": "Mortais precisam de proteção contra conhecimento proibido e textos heréticos. Em qualquer lugar pelos planos, um exscinder pode chegar para reivindicar, confiscar e destruir os pensamentos perigosos dentro. Considerando-se avatares da virtude da temperança, exscinders repetem a lição de que a língua cautelosa recusa-se a falar palavras vis. Embora transmitam essas palavras, é raro notarem muito os mortais comuns. O perigo não é necessariamente a pessoa que aprende, e sim o próprio conhecimento maligno. É a erva daninha que cresce além das palavras na página e deve ser arrancada pelas raízes.",
    "sections": [
      {
        "id": "censorship-is-holy",
        "title": "Censura É... Sagrada?",
        "body": "Censura é um tópico controverso, pois muitas vezes é usada como método de controle. O exscinder tem o traço sagrado, mas suas ações — censurar e confiscar textos — podem ser perturbadoras e até condenáveis. Tenha em mente, porém, que existem num mundo com textos mágicos que podem ser mortais quando lidos! Isso não significa que não possam cruzar a linha para ações que mortais consideram erradas, nem que não possam entrar em conflito com mortais por falta de nuance."
      }
    ]
  },
  "creature-iceberg-clam": {
    "description": "Embora tecnicamente não seja nem iceberg nem amêijoa, o elemental devastador conhecido como amêijoa-iceberg ganhou o nome adequado da camuflagem natural e das tendências de alimentação. Esse predador de emboscada esférico exibe controle térmico pleno sobre a água que o cerca e compõe a forma mutável, atraindo nadadores cansados e embarcações à deriva com a promessa de alívio antes de envolvê-los e fervê-los vivos.\n\nA menos que tenha comido recentemente o bastante para ainda estar digerindo a refeição, uma amêijoa-iceberg derretida é quase imperceptível num corpo d’água grande. Como não gasta energia para manter o exterior congelado, pode esperar semanas ou até meses antes de alimentar-se de novo, cavalgando correntes oceânicas até que alguma criatura ou embarcação infeliz entre em seguida no corpo — e nunca saia.",
    "sections": [
      {
        "id": "a-deadly-difference",
        "title": "Uma Diferença Mortal",
        "body": "Embora pareçam inóspitos, icebergs comuns muitas vezes abrigam ecossistemas vibrantes fervilhando de vida. Águas-vivas e outros invertebrados pequenos alimentam-se de algas que se acumulam ao longo do fundo; peixes pequenos fazem lar em cavernas que pontilham o gelo; e aves marinhas, focas e até baleias às vezes os utilizam para abrigo ou como terrenos de caça.\n\nPor outro lado, o mar ao redor de uma amêijoa-iceberg está sempre desprovido de vida, pois a fauna local sabe manter-se longe de sua fome incessante. Embora a camuflagem astuta do elemental possa enganar com facilidade o desinformado, marinheiros e aventureiros marinhos sagazes sabem procurar esses sinais reveladores antes de se aproximar."
      }
    ]
  },
  "creature-irlgaunt": {
    "description": "Irlgaunts lembram aranhas ou caranguejos titânicos, mas com tentáculos semelhantes a cefalópodes irrompendo das pontas das pernas couraçadas de quitina. As conchas cinza denteadas lhes permitem misturar-se às paredes rochosas dos desfiladeiros altos e ravinas profundas que servem de terrenos de caça. Apesar do tamanho, movem-se com velocidade incrível, saltando por abismos e escaravando penhascos de montanha íngremes em instantes. Embora sejam formidáveis em combate corpo a corpo, irlgaunts têm um ataque à distância ainda mais poderoso. Essas criaturas bombardeiam os oponentes com gastrólitos regurgitados com força — aglomerados do tamanho de um melão de pedras envolvidas em enzimas digestivas coaguladas fortes o bastante para decompor carne e osso. Gastrólitos são frágeis e explodem ao contato, salpicando a área com lascas de rocha e ácido cáustico.\n\nEmbora se possa facilmente tomar um irlgaunt por uma besta simples e bruta, têm inteligência aguçada e empregam estratégias de caça ardilosas. Armam armadilhas para viajantes e gostam de usar gemas e itens mágicos tomados de vítimas anteriores como isca. Já se soube que iniciam deslizamentos de pedras ou de outro modo bloqueiam passagens para desviar exploradores para as garras. Também usam os gastrólitos para dirigir os movimentos da presa, forçando vítimas a becos sem saída na beira de abismos ou falésias.\n\nNa maior parte, irlgaunts vivem vidas solitárias, provavelmente porque achar comida o bastante para sustentar mais de um tende a ser difícil. Porém, ainda mantêm um senso de comunidade estendida e regional, reunindo-se ativamente quando se organizam para a guerra ou para discutir outras questões que afetam a espécie ou os territórios compartilhados. Já se soube que ocasionalmente se aliam a gigantes, mas essas tréguas tendem a ser nebulosas.",
    "sections": [
      {
        "id": "irlgaunt-religion",
        "title": "Religião dos Irlgaunts",
        "body": "Um número pequeno de irlgaunts adora ativamente Rovagug, a quem acreditam ser o progenitor da espécie. Em vez de viver vidas solitárias, esses irlgaunts formam grupos que habitam fissuras profundas, transformando-as em templos macabros ao decorá-las com os cadáveres dos sacrifícios. Também decoram os próprios corpos entalhando preces na quitina e pintando-se com imagens cruas e perturbadoras. Alguns afirmam que essas runas lhes concedem poderes divinos de proteção e a habilidade de conjurar a parentela ultraterrena de Rovagug. Irlgaunts que adoram dessa forma ganham o traço profano."
      }
    ]
  },
  "creature-jorogumo": {
    "description": "Aparecendo como humanos belos e bem vestidos, jorogumos espreitam nas montanhas altas e predam viajantes, muitas vezes por palavras e encanto. Essas criaturas cruéis podem transformar-se por completo numa aranha gigante ou brotar pernas de aranha das costas, e muitas vezes mantêm aranhas gigantes como animais de estimação. Jorogumos em geral comem a presa, mas alguns humanoides encontram um destino ainda mais hediondo como incubadoras vivas de ovos de jorogumo.\n\nQuando encontram um tengu, jorogumos entram em fúria e tentam assassiná-los o mais depressa possível, pois insistem que tengus podem ver através do engano com um mero olhar e são imunes ao veneno, mas não está claro a forasteiros se essa é a história inteira por trás do ódio obstinado. Embora a maioria dos jorogumos seja criatura solitária, alguns adoram Norgorber e servem como aliados valiosos a guildas de ladrões que seguem aquele deus na forma de Mestre Cinzento.",
    "sections": [
      {
        "id": "peachwood-vulnerability",
        "title": "Vulnerabilidade à Madeira de Pêssego",
        "body": "Madeira de pêssego, muitas vezes cultivada por sacerdotes de Pharasma, é usada para afastar os mortos-vivos. Porém, jorogumos também desprezam essa madeira de tom acaju, apesar de serem claramente uma criatura viva. Isso levou muitos a especular sobre as origens desses emboscadores aracnídeos, mas a natureza secreta deles tornou pesquisas adicionais difíceis. Saiba mais sobre madeira de pêssego em Lost Omens Tian Xia Character Guide."
      }
    ]
  },
  "creature-millindemalion": {
    "description": "Millindemalions são fey trapaceiros cruéis capazes de causar caos com os chapéus mágicos que alteram a mente. Muitos contos folclóricos pelo mundo falam de fey industriosos que ajudam artesãos em apuros — sapateiros, chapeleiros, alfaiates e assim por diante — durante a noite, criando mercadorias de qualidade em segredo por nenhum pagamento maior que uma migalha de pão ou um pires de nata. Essas histórias guardam um grão de verdade, pois fey bondosos de fato ocasionalmente viajam do Primeiro Mundo para auxiliar um artesão humilde por capricho, por subornos de comida, ou às vezes até como parte de um esforço concertado para espalhar beleza pelo mundo. Porém, quando um artesão se torna dependente demais dessa ajuda, o ajudante fey amigável pode tornar-se distorcido e retorcido de ressentimento e abandono. Por fim, poderia transformar-se num brincalhão cruel que se deleita em punir mortais que ousam encarregar um fey de trabalho tão mundano. O millindemalion é o resultado de um fey bondoso, fazedor de chapéus, passando por tal transformação. Alguns estudiosos acreditam que esse comportamento errático é causado pela preponderância de mercúrio usado na maioria da chapelaria.",
    "sections": [
      {
        "id": "similar-fey",
        "title": "Fey Semelhantes",
        "body": "Millindemalions praticam uma forma cruel de chapelaria, mas já houve avistamentos de fey trapaceiros semelhantes capazes de fabricar sapatos que nunca param de dançar ou casacos que infligem oscilações de humor selvagens às vítimas."
      }
    ]
  },
  "creature-owb-prophet": {
    "description": "Um owb que entra em contato e é escolhido por um dos Abandonados ganha um fragmento do poder daquele semideus e forja uma conexão permanente com ele. Esse ato transforma o owb numa criatura maior e mais poderosa e o imbui com o poder de transferência divina, permitindo ao owb ganhar seguidores e conceder magias a eles. Esses são os profetas owb.\n\nProfetas owb podem ter alguma porção do poder dos Abandonados, mas usam a autoridade para ganhar mais influência sobre calignis e outros adoradores.",
    "sections": [
      {
        "id": "forsaken-patrons",
        "title": "Patronos Abandonados",
        "body": "Cada profeta owb ganha poder por uma conexão com um patrono Abandonado. O patrono concede ao owb magias extras e tem o próprio símbolo religioso e armas favorecidas. Cada entrada nota qualquer habilidade ou magia inata oculta que o Abandonado concede aos profetas, além de uma arma favorecida.\n\n**Enkaar, o Prisioneiro Disforme:** Este horror mutilado é o patrono Abandonado de grilhões, letargia e corrupção física. **Magia** _Dor Fantasma_ (4º, à vontade); **Arma Favorecida** corrente com cravos\n\n**Eyes That Watch:** Este trio estranho de olhos felinos é o patrono Abandonado de inferioridade, gatos e estranhos. **Habilidade** Sentido vital 36 m; **Arma Favorecida** adaga\n\n**Grasping Iovett:** Uma forma bela de variedade indescritível, Iovett é o patrono Abandonado de acidentes, parasitas e luxúria imprudente. **Magia** _Encantar_ (4º, à vontade); **Arma Favorecida** espada curta\n\n**Husk:** Esta criatura andrógina é o patrono Abandonado de vazio, solidão e narcisismo. **Magia** _Silêncio_ (4º, à vontade); **Arma Favorecida** espada curta\n\n**Lady Razor:** Esta magistrada severa proíbe demonstrar bondade ou misericórdia a membros da família. Lady Razor é a patrona Abandonada de rixa familiar, suspeita e vingança. **Magia** _Tempestade de Armas_ (4º, à vontade); **Arma Favorecida** adaga\n\n**Reshmit of the Heavy Voice:** Na forma de uma sombra enorme, Reshmit é o patrono Abandonado de coisas quebradas, esquecimento e violência inesperada. **Magia** _Reescrever Memória_ (4º, à vontade); **Arma Favorecida** maça-estrela\n\n**Thalaphyrr Martyr-Minder:** O patrono Abandonado de heroísmos falhos, aprisionamento e tempo desperdiçado. **Magia** _Lentidão_ (4º, à vontade); **Arma Favorecida** lança"
      }
    ]
  },
  "creature-terra-carver": {
    "description": "Até outros elementais da terra e criaturas de pedra temem o formidável entalhador da terra. Os quatro braços terminam em ferramentas de pedra afiadas que podem fender as rochas mais duras — e qualquer coisa que vagueie para o território. Apesar das formas poderosas, os torsos volumosos parecem comicamente grandes comparados às pernas atarracadas. Cambaleiam devagar pelo território e passam a maior parte do tempo cortando pedra fundo no leito rochoso para criar redes elaboradas de túneis.\n\nPreferem o isolamento, e quando dois entalhadores da terra se encontram, em geral termina com um talhando o outro. Em vez de tomar o território do inimigo, um entalhador da terra desaba os túneis, continuando em outro lugar com os próprios desenhos.\n\nEntalhadores da terra são mineiros talentosos, e os túneis estão entre os mais duradouros de qualquer plano. Porém, o motivo desses túneis é desconhecido. Estudiosos teorizaram que os túneis funcionam como uma forma de linguagem escrita para os elementais de outro modo sem voz. Infelizmente, tentativas de mapear túneis abandonados muitas vezes terminam onde outro entalhador da terra desabou um túnel invasor, e mapear túneis ativos muitas vezes resulta no cartógrafo nunca voltar.",
    "sections": [
      {
        "id": "voiceless-miners",
        "title": "Mineiros Sem Voz",
        "body": "Entalhadores da terra são mineiros talentosos, e seus túneis estão entre os mais duradouros de qualquer plano. Porém, o motivo desses túneis é desconhecido. Estudiosos teorizaram que os túneis funcionam como uma forma de linguagem escrita para os elementais de outro modo sem voz. Infelizmente, tentativas de mapear túneis abandonados muitas vezes terminam onde outro entalhador da terra desabou um túnel invasor, e mapear túneis ativos muitas vezes resulta no cartógrafo nunca voltar."
      }
    ]
  },
  "creature-thanadaemon": {
    "description": "Também conhecidos como os diáconos da morte, thanadaemons representam a morte pela velhice. Estão entre os daemons mais pacientes, e preferem esperar o tempo para encenar planos de longo alcance, de décadas, em vez de lutar (embora ainda sejam inimigos mortais). Como o Cavaleiro da Morte, sulcam as águas do Rio Styx em busca de almas extraviadas. Raramente thanadaemons são vistos sem um remo característico (que empunham como um cajado bo), uma ferramenta que usam para navegar os canais lodosos e as corredeiras turbulentas do rio.",
    "sections": [
      {
        "id": "styx-passage-fees",
        "title": "Tarifas de Passagem no Styx",
        "body": "Deslizando com facilidade inquietante pelo Rio Styx turvo, thanadaemons ficam mais do que felizes em oferecer a mortais passagem a bordo das barcas dilapidadas — por um preço. Ouro em geral é um pagamento aceitável pelos serviços de um thanadaemon, embora esses capetas sejam bem conhecidos por alterar os detalhes dos arranjos depois do fato e possam com a mesma probabilidade exigir um favor ou algum bem esotérico, como uma _gema da alma_, em vez de moeda."
      }
    ]
  },
  "creature-tide-giant": {
    "description": "Em praias recônditas onde as ondas lambem areias imaculadas e intocadas, gigantes da maré habitam em solidão à beira. Visam viver em serenidade quieta, apreciando a beleza que os cerca. Gigantes da maré prosperam folgando na areia, vivendo devagar enquanto absorvem as vistas, os sons e os cheiros da praia, o tempo todo desfrutando tigelas de suco e rum. Muitos vivem pela filosofia de que a conexão preciosa e sagrada com a magia do mar se aprofunda ao desfrutar a água, como ao assistir o sol refletir nas ondas que encrespam a praia. Interrupções, invasores e outras surpresas abalam enormemente a calma dos gigantes da maré, transformando a atitude plácida num furacão enraivecido.",
    "sections": [
      {
        "id": "on-the-beach",
        "title": "Na Praia",
        "body": "Apesar de poderem habitar inteiramente debaixo d’água, gigantes da maré favorecem construir os lares perto de praias para usar terra e mar de forma vantajosa como desejarem. Os bangalôs são abertos aos elementos. Também são bem desordenados, com tesouros que deram à costa amontoados em pilhas desorganizadas de madeira flutuante, esqueletos de peixe, conchas, garrafas quebradas e mais."
      }
    ]
  },
  "creature-urglid": {
    "description": "As monstruosidades descomunais conhecidas como urglids formam-se das almas de coveiros assassinos, sádicos que enterraram as vítimas vivas, e zeladores de túmulos intencionalmente negligentes que abandonaram a vigília sobre os mortos. Buscam perpetuar os pecados mortais como demônios e usam os poderes infernais para sujeitar mortais aos terrores da vivisepultura. Outros urglids acham sítios de sepultura repulsivos e muitas vezes destroem lápides e outros marcos funerários. Sem tais marcos, essas sepulturas muitas vezes se perdem e são esquecidas, um detalhe que agrada a um urglid. Erguendo-se a mais de 3,6 m de altura e pesando mais de 1.360 kg, o demônio tem uma cabeça que parece afundada no torso, e uma boca escancarada e denteada que se abre no alto do peito.",
    "sections": [
      {
        "id": "kabriri-s-excavators",
        "title": "Escavadores de Kabriri",
        "body": "Embora muitos detestem urglids pelo apetite voraz por sepultamento e destruição desenfreada, sacerdotes de Kabriri insistem que o senhor demônio abençoou e supervisionou a criação deles, confiando aos capetas a escavação da rede labiríntica de túneis que liga Everglut ao Universo. Não é surpresa, então, que onde há um urglid, possivelmente há um caminho para as Fendas Exteriores — e carniçais de sobra."
      }
    ]
  },
  "creature-vanyver": {
    "description": "Vanyvers são morcegos humanoides grandes moldados de vazio e matéria de sombra, os olhos vermelhos brilhando como estrelas miúdas numa noite de outro modo sem luz. Embora poderosos, são os menores dos darvakkas, e os mais propensos a submeter-se a um mestre, seja outro da própria espécie ou um mortal com reputação de ser especialmente assassino e destrutivo. Vanyvers concordam em seguir os mestres como um meio temporário de maximizar a morte e a destruição que podem infligir, mas depressa se voltam contra qualquer mestre que sintam vacilar nessa meta.",
    "sections": []
  },
  "creature-venator": {
    "description": "Diferente da maioria dos aeons, venators passam grande parte do tempo no Universo mortal. Axiomitas constroem essas figuras de latão e engrenagens para caçar os inimigos. Embora combatentes capazes por conta própria, venators frequentemente agem como rastreadores para outros aeons, liderando um grupo de vigilias para prender um criminoso ou guiando um bythos até os alvos.\n\nCada venator é forjado com os alvos já atribuídos, um fragmento de fórmula axiomita integrado nas engrenagens que zumbem sob a armadura. Os alvos são definidos de forma estreita pela fórmula e em geral são um único alvo nomeado, uma família, ou um grupo pequeno que participou diretamente de um evento.\n\nOs alvos de um venator raramente ameaçam o equilíbrio da realidade de forma ostensiva; em vez disso, muitas vezes têm conhecimento de certos segredos ou teorias mágicas novas.\n\nComo resultado, até o venator raramente sabe por que lhe foi atribuído determinado alvo. Venators forjados recentemente são incrivelmente minuciosos no trabalho, destruindo metodicamente o corpo do alvo e quaisquer objetos próximos (como notas, livros ou até pichações) que possam conter segredos.\n\nVenators bem-sucedidos ficam sem alvos e são abandonados à própria sorte. Em geral estão ansiosos para achar um propósito novo, mesmo que seja um temporário de uma invocação mortal. Muitos por fim estendem as missões originais, escolhendo alvos novos semelhantes aos anteriores ou, em alguns casos, continuando a perseguir as almas dos alvos originais.",
    "sections": [
      {
        "id": "censored-secrets",
        "title": "Segredos Censurados",
        "body": "Venators matam os inimigos de Norgorber e limpam seus segredos derramados com frequência surpreendente. Parece que ou convenceu esses aeons da própria importância ou subverteu diretamente o processo dos axiomitas de algum lugar em seu reino sob a cidade de Axis."
      }
    ]
  },
  "creature-viper-vine": {
    "description": "Carnívora voraz comedora de carne, a videira vípera tem uma única flor enorme erguendo-se de um emaranhado espesso e frondoso de videiras semelhantes a cobras. Quando a planta sente a aproximação de presa adequada pelo sistema de raízes sensível e enterrado raso, ergue-se como uma cobra agitada e desenrola a flor de cores vivas, um ato que libera uma nuvem de pólen que entorpece a mente.\n\nComo videiras vípera ganham nutrição consumindo criaturas em vez de por fotossíntese e absorvendo nutrientes do solo, desenvolveram locomoção rudimentar e podem arrastar-se pelo chão com raízes semelhantes a tentáculos. Até têm uma forma de senciência rudimentar, permitindo-lhes tanto discernir diferenças na presa quanto tomar decisões táticas limitadas, ao mesmo tempo evitando criaturas particularmente grandes ou de aparência perigosa.\n\nA área em torno dos terrenos de caça da videira vípera muitas vezes está salpicada dos restos parcialmente devorados das vítimas. Não é incomum achar os cadáveres em decomposição de animais selvagens, aventureiros malogrados e até gigantes nas imediações da planta, junto com um espalhamento de tesouro incidental deixado nos cadáveres. Uma videira vípera raramente volta à carcaça de uma criatura que matou antes, preferindo caçar carne fresca.",
    "sections": [
      {
        "id": "viper-vine-pollen",
        "title": "Pólen de Videira Vípera",
        "body": "Embora o pólen de videira vípera se degrade depressa depois de colhido com cuidado da planta, um personagem que tenha um conjunto de ferramentas alquímicas pode reunir e preservar 1d6 doses de pólen com um teste de Ofício ou Natureza CD 33 bem-sucedido e 10 minutos de trabalho. Uma única dose de pólen de videira vípera vale 300 po como matérias-primas para fabricar qualquer item alquímico ou mágico que crie um efeito de incapacitação."
      }
    ]
  },
  "creature-deep-one-elder": {
    "description": "Com tempo o bastante, anciãos profundos podem inchar a alturas vertiginosas.",
    "sections": []
  },
  "creature-doprillu": {
    "description": "As aberrações conhecidas como doprillus são brutos de músculos em faixas que usam máscaras ornamentadas o tempo todo, as quais enchem os portadores de força mágica e espírito de luta. Doprillus amam batalhar, sobretudo por agarrão, e estão ansiosos para começar brigas. Em terreno neutro, um doprillu oferece duelar o oponente de aparência mais forte, mas quando o território natal de um doprillu é invadido, nenhuma regra se aplica ao confronto. Como convém ao sangue superaquecido que os alimenta, doprillus fazem lar em locais quentes: selvas tórridas, desertos ensolarados e cavernas subterrâneas perto de respiradouros de enxofre.",
    "sections": [
      {
        "id": "doprillu-masks",
        "title": "Máscaras de Doprillu",
        "body": "A máscara estilizada de um doprillu não é parte da própria criatura, embora doprillus entendam de forma inerente o propósito e o poder da máscara. Ao nascer, doprillus começam fracos e pequenos. Uma vez que um amadurece e ganha inteligência e destreza manual suficientes, esculpe uma máscara pessoal. Na primeira vez que veste a máscara, um doprillu sai disparado em busca de uma briga. Essa máscara nunca é substituída, e pode estar marcada por centenas de batalhas. Sob a máscara há um rosto assombrosamente em branco, com olhos minúsculos e uma boca negro-pez, sem quaisquer outras feições."
      }
    ]
  },
  "creature-graveknight-warmaster": {
    "description": "Exemplares de violência imortal, mestres de guerra cavaleiros da tumba são forças devastadoras no campo de batalha, capazes de esporear aliados a níveis cada vez maiores de violência.",
    "sections": []
  },
  "creature-ozthoom": {
    "description": "Ozthooms são assassinos sombrios que servem criaturas fey poderosas ou até os Primogênitos — os semideuses do Primeiro Mundo. Em meio às cortes dos Primogênitos ou de outros governantes fey poderosos, esses assassinos sinistros espreitam no alto enquanto aguardam o chamado à ação — ameaças implícitas semelhantes a armas mortais penduradas como decoração num salão real. Ozthooms nunca falam em voz alta; quando sentem necessidade de comunicar-se, fazem-no num sussurro telepático direto na mente da vítima. Embora o corpo de um ozthoom seja um material estranho e carnoso, as garras mortais e as asas cruelmente ganchudas são feitas de ferro frio afiado como navalha, uma qualidade que os torna muito temidos entre outros fey. Um ozthoom típico tem 3 m de altura e envergadura de 2,4 m, mas pesa menos de 36 kg.\n\nEmbora a maioria dos ozthooms sirva mestres poderosos, alguns desses fey assassinos foram deixados à própria sorte e não servem senão os próprios caprichos volúveis. Em alguns casos, o mestre foi morto; em outros, o ozthoom foi dispensado do serviço por qualquer número de razões. Um ozthoom deixado a indulgir os desejos cruéis sem freio é muitas vezes o ozthoom mais perigoso de todos.",
    "sections": [
      {
        "id": "ozthoom-guilds",
        "title": "Guildas de Ozthoom",
        "body": "Os ozthooms mais perigosos são os que se rebelaram contra os mestres. Ozthooms dessa natureza são mais poderosos, reunindo outros para formar “guildas” mortais de assassinos que perseguem metas comuns nas partes mais perigosas do Primeiro Mundo."
      }
    ]
  },
  "creature-sepid": {
    "description": "Sepids são os senhores da guerra brutais dos divs, deleitando-se na violência contra mortais e no próprio sabor particular de vingança. Mentirosos inveterados, sepids não conseguem deixar de vomitar as mentiras mais absurdas, e a forma e a natureza representam o poder das falsidades de virar bola de neve em violência que pode custar inúmeras vidas. Entre mortais, reúnem tropas para incitar rebelião, guerra e outras formas de carnagem, saboreando mortais que se massacram uns aos outros. Esses seres gigantes em geral se erguem por volta de 4 m de altura; avançam pelos campos de batalha buscando heróis e generais, rejubilando-se maniacamente ao ceifar os inimigos.",
    "sections": [
      {
        "id": "sepid-deceptions",
        "title": "Enganos de Sepid",
        "body": "Dado que sepids sempre fazem o oposto do que dizem que farão, pode parecer difícil para esses divs enganar alguém, o que está longe da verdade. Muitas vezes, sepids evitam fazer afirmações sobre as próprias intenções e em vez disso dão ordens ou falam em analogias, enigmas e anedotas, permitindo que aqueles que manipulam decifrem os raciocínios com formas espertas de engano."
      }
    ]
  },
  "creature-animated-colossus": {
    "description": "Animar uma estátua de 30 m de altura vale o custo para conjuradores que guardam masmorras imensas.",
    "sections": []
  },
  "creature-berberoka": {
    "description": "Berberokas são humanoides gigantes que vivem entre florestas e pântanos, onde usam a habilidade de engolir quantidades maciças de água para drenar lagoas e lagos pequenos. Criaturas que visitam o bebedouro predileto e encontram só uma bacia de lama vazia tornam-se presa do berberoka, que se esconde no mato e avassala a presa com uma torrente maciça de água regurgitada.\n\nO dorso mosqueado de um berberoka — que lembra um feixe de plantas locais, árvores pequenas e pedras grandes — concede camuflagem natural que lhes permite esconder-se à vista de todos. Berberokas tendem a disfarçar-se de formações rochosas no centro de um leito seco enquanto esperam passantes. Nas regiões tropicais onde berberokas são mais comuns, os locais sabem dar ampla margem a lagoas vazias, independentemente dos peixes tentadores saltitando. Viajantes famintos, por outro lado, podem ver tal fartura como bênção dos deuses, só para ser arrastados no dilúvio mortal do berberoka.",
    "sections": [
      {
        "id": "kabourophobia",
        "title": "Caburofobia",
        "body": "Berberokas compartilham um medo incomumente intenso de caranguejos, então muitos contos folclóricos sugerem que pescadores levem um caranguejo consigo caso suspeitem que um berberoka espreita por perto. Se nenhum caranguejo estiver disponível, estalar a língua ou estalar os dedos pode bastar."
      }
    ]
  },
  "creature-graveknight-champion": {
    "description": "Outrora servo de uma deidade, o campeão cavaleiro da tumba retornou como morto-vivo depois de uma vida ceifada a serviço de seu deus.",
    "sections": []
  },
  "creature-hyakume": {
    "description": "Centenas de olhos injetados espiam de sob as camadas carnosas da pele de um hyakume. Essas aberrações descomunais cobiçam conhecimento e vão a grandes extremos para guardar o que sabem para si; destroem scriptoria que saquearam e queimam livros que leram para assegurar que nenhuma outra alma aprenda o conteúdo. Embora hyakumes ocasionalmente troquem informação valiosa para granjear conhecimento maior, são propensos a enganar os alvos a revelar mais do que deveriam. O mais assustador de tudo é a habilidade do hyakume de roubar memórias e apagar qualquer conhecimento de sua existência das mentes das vítimas.",
    "sections": [
      {
        "id": "memory-thieves",
        "title": "Ladrões de Memória",
        "body": "Hyakumes acumulam com ciúme o conhecimento na forma de memórias, as próprias ou roubadas. Espreitam templos e bibliotecas, memorizando centenas de textos antes de obliterá-los todos. Hyakumes ganharam uma reputação equivocada como guardiões noturnos de santuários e outros arquivos de sabedoria. Embora ocasionalmente possam frustrar ladrões e saqueadores de tumbas, fazem-no só para guardar o conhecimento do repositório para si."
      }
    ]
  },
  "creature-jotund-troll": {
    "description": "Trolls jotund são horrores gigantescos de nove cabeças que espreitam charnecas gélidas, pântanos e ermos, muitas vezes sozinhos e sempre vorazes. Embora cada uma das nove cabeças do troll jotund possua o próprio cérebro e os próprios sentidos, brigam umas com as outras bem menos do que as cabeças de um troll de duas cabeças. Ainda assim as cabeças discutem, sobretudo sobre qual delas come. O fato de as nove goelas levarem ao mesmo estômago compartilhado faz pouca diferença em tais desacordos culinários. Muitos estudiosos ecoam uma história de que trolls jotund lembram os primeiros trolls, titãs expulsos do Elísio e amaldiçoados por seus crimes contra os deuses. Os próprios trolls jotund, porém, não reivindicam tal herança, e os preocupados com tais assuntos afirmam que o pai de todos os trolls surgiu nas Fendas Exteriores. Trolls jotund individuais ou começam a vida como um troll comum ou, bem mais raramente, nascem de um progenitor troll jotund. Para os trolls jotund, as nove cabeças são uma coroa de governo que os marca como acima da ordem natural e livres de suas leis.",
    "sections": [
      {
        "id": "ravenous-mutants",
        "title": "Mutantes Vorazes",
        "body": "Trolls jotund surgem com regularidade perturbadora, em particular em áreas como os Mana Wastes distorcidos pela magia e os ermos devastados por radiação de Numeria. Embora em geral consumam outros trolls junto com tudo o mais, famílias vorazes de trolls jotund assombram terras particularmente desoladas. A presença de um único troll jotund pode levar uma área à praga e à ruína, além mesmo do dano causado por sua fome aterradora."
      }
    ]
  },
  "creature-lampad-queen": {
    "description": "Rainhas lâmpade são monarcas caprichosas e protetoras de vastos domínios subterrâneos, tidas em baladas e contos como aliadas e inimigas, monstros e musas. Rainhas lâmpade têm particular animosidade pelas muitas ancestralidades subterrâneas predominantemente más, como drow e duergar, e são particularmente afeitas a morcegos. Muitas rainhas lâmpade têm nykteras como atendentes prediletos.",
    "sections": [
      {
        "id": "reciprocity",
        "title": "Reciprocidade",
        "body": "Rainhas lâmpade tendem a mudar de emoções por capricho e espelhar o que encontram nos outros. A quem trata o domínio da rainha com respeito, protegem e recompensam, enquanto quem o prejudica encontra ira rápida. Isso leva aos relatos vastamente divergentes das ações das rainhas."
      }
    ]
  },
  "creature-marrmora": {
    "description": "No Primeiro Mundo, marrmoras habitam ermos arruinados perpetuamente flagelados pelo fogo e raramente, se é que alguma vez, viajam a outro lugar. Quando um incêndio florestal devasta uma região selvagem no Universo e resulta na morte de outros fey, marrmoras podem ser puxados através da fronteira planar para deleitar-se na destruição resultante. Buscam reacender os fogos que os chamaram, reunir e alimentar-se dos restos carbonizados dos que pereceram dentro (em particular os corpos de fey mortos), embora fiquem com saudade de casa se passam tempo demais longe do Primeiro Mundo. São oprimidos por uma raiva caprichosa mas persistente e são infalivelmente cruéis. Embora sejam capazes de negociação e interação inteligente, quase nunca barganham de boa-fé e em geral interagem com outros só como meio de espalhar com mais eficiência a devastação flamejante.\n\nA aparência torcida de um marrmora evoca o aspecto de um arbóreo cuja casca foi queimada até virar carvão. Têm rostos quase sem feições e mãos que terminam em garras longas e afiadas. A carne quebrada parece madeira queimada a carvão, crivada de rachaduras que ainda brilham com um calor malsão. Deixam um rastro de cinza por onde andam, e fios de fumaça se enrolam dos corpos. Embora marrmoras apreciem a visão de qualquer bosque e seus habitantes assando nos fogos cuidadosamente cultivados, pouco traz mais prazer ao fey monstruoso do que a visão de criaturas vegetais inteligentes cozinhando até ficar crocantes.",
    "sections": [
      {
        "id": "fey-manipulators",
        "title": "Manipuladores Fey",
        "body": "Marrmoras exercem um domínio estranho e sutil sobre outros fey. Os fey sob seu controle ficam tomados tanto de horror pela destruição causada por marrmoras quanto de fascínio por seu poder flamejante."
      }
    ]
  },
  "creature-nosferatu-overlord": {
    "description": "Milênios alimentando-se dos vivos podem transformar os nosferatu mais poderosos em criaturas de vontade indomável e terror ambulante.",
    "sections": []
  },
  "creature-okenevem": {
    "description": "Os arcontes mais poderosos residem em Iudica, o sexto patamar na montanha sagrada do Céu. Okenevems vivem entre o número deles. Okenevems evoluíram de zoaems humildes até a forma atual, mas possuem potencial ainda maior — a graça de passar para o Jardim no pináculo do Céu. Porém esses arcontes escolhem não fazê-lo, em vez disso prostrando-se a seus portões, em paz com nunca entrar. Humildes e sem pretensão acima de tudo, curvam-se diante da grandeza do Céu e se põem a trabalhar de outras formas.\n\nOkenevems raramente viajam para longe do Céu a menos que lhes seja incumbida uma tarefa específica pelas divindades daquele plano. A maioria dessas missões exige que okenevems tragam humildade a sacerdotes que se opõem à vontade das deidades, desafiam a ordem do céu, ou se consideram de poder igual ao de seu deus. Buscam desviar esses sacerdotes dos perigos de tal arrogância, muitas vezes pelo exemplo.",
    "sections": []
  },
  "creature-sakugami": {
    "description": "Sakugamis são kami especialmente poderosos que protegem árvores que florescem sazonalmente, particularmente aquelas em lugares onde os poderes primevos da natureza permanecem fortes. O ciclo de uma árvore estéril irrompendo numa profusão de flores uma vez por ano, antes que essas flores inevitavelmente murcham com a virada das estações, oferece uma metáfora visual marcante para os sakugamis, cuja associação com esse ciclo anual de crescimento e decadência lhes concede poderes sobre o tempo, além da natureza. Também conhecidos como kami das flores, os sakugamis têm uma fascinação particular por mortais. Muitas lendas populares falam de sakugamis que concedem sua bênção a indivíduos dignos que lutam por causas justas. Na verdade, embora os kami das flores fiquem hipnotizados por tais mortais — vendo a essência de uma flor numa vida curta dedicada a trazer beleza e conforto ao redor —, são tão raros e enigmaticamente distantes que poucos alguma vez os encontram. Décadas, até séculos, podem passar antes que uma aldeia humilde perceba que um sakugami a observava.\n\nAs histórias persistem, porém, como persistem há eras, levando a uma apreciação generalizada por árvores floridas. O sítio de uma nova aldeia pode ser escolhido por causa da proximidade com uma glicínia antiga, ou um templo pode ser cuidadosamente construído em torno de uma única ameixeira jovem. Como os sakugamis são mais comumente associados a cerejeiras, muitos centros populacionais maiores em Minkai plantam e cuidam com zelo de pequenos bosques de cerejeiras, tanto pela beleza quanto por respeito aos kami das flores.",
    "sections": []
  },
  "creature-sordesdaemon": {
    "description": "Sordesdaemons são colossos de esgoto e carne daemônica que personificam a morte pela poluição. Estão entre os tipos mais recentes de daemons a aparecer em Golarion e são constantemente cercados por uma nuvem de névoa fétida que sufoca criaturas vivas. Sordesdaemons são diabolicamente astutos e muitas vezes buscam inspirar mortais com novas ideias e invenções que degradam o meio ambiente. Embora esses daemons sejam mais do que capazes de arruinar habitats por conta própria, deleitam-se em encorajar mortais a fazê-lo eles mesmos, pois o ato pode eventualmente criar novos sordesdaemons. Uma vez que uma dada floresta, rio ou outro refúgio natural esteja completamente poluído, um sordesdaemon muitas vezes parte para reivindicá-lo como seu domínio.",
    "sections": [
      {
        "id": "daemonic-pollution",
        "title": "Poluição Daemônica",
        "body": "Sordesdaemons que não são compelidos a perseguir uma tarefa específica muitas vezes acabam nos esgotos sob grandes cidades, onde subjugam outras criaturas que se revolvem na imundície (como ofalfs). Não hesitam em sacrificar esses lacaios se isso avançar seus próprios objetivos."
      }
    ]
  },
  "creature-sramana": {
    "description": "Sramanas, ou anjos renunciantes, existem para ajudar a libertar os penitentes e aliviar seu sofrimento. Incomum para anjos de tal poder, sramanas são formados exclusivamente a partir de almas mortais compassivas e iluminadas que muitas vezes são mais perceptivas às dores da existência mortal.\n\nEsses celestiais incansáveis embarcam em tarefas impossíveis e labores insondáveis para libertar almas perdidas, abandonadas e aprisionadas nos Planos Inferiores. Isso lhes granjeia grande inimizade de fiends e outras entidades insensíveis, muitos dos quais tratam almas como simples brinquedos e moeda e que, ironicamente, veem os anjos renunciantes como ladrões de almas que \"legitimamente\" enganaram, roubaram ou traficaram para seus próprios fins.",
    "sections": [
      {
        "id": "soul-saviors",
        "title": "Salvadores de Almas",
        "body": "Ao longo de ajudar almas a renunciar ao sofrimento, muitos sramanas desenvolvem alianças com psicopompos, cujo objetivo de devolver os perdidos e aprisionados ao Rio das Almas compartilham de bom grado. Esses vínculos correm tão profundos que não é incomum encontrar sramanas atuando como advogados nos tribunais do Ossário."
      }
    ]
  },
  "creature-sykever": {
    "description": "Os darvakkas mais comuns são sykevers, guerreiros destemidos que podem marchar sobre dois membros ou quatro. Seus membros anteriores terminam em espinhos curvos e excruciantemente afiados em vez de cascos ou mãos. Sanguinários, mas calculistas, lideram legiões de mortos em batalha no Universo, trabalhando em direção ao objetivo simples de acabar com toda a vida.",
    "sections": [
      {
        "id": "the-bound-one",
        "title": "O Aprisionado",
        "body": "Escondidos sob os colégios necromânticos de Yled, na nação de Geb, há um trio de sykevers mantidos em estase mágica junto com um darvakka antigo conhecido apenas como o Aprisionado. Essa criatura, enredada pelo próprio Geb, serve como um poço inesgotável de energia do vazio, imensamente útil para experimentos mágicos e para fortalecer outros servos mortos-vivos pelo país. Os quatro darvakkas aguardam o dia em que Geb os convocará mais uma vez."
      }
    ]
  },
  "creature-totum-font": {
    "description": "Antes de mortais, fey ou até gênios, totum fonts foram as primeiras criaturas nascidas de seis elementos indivisos e harmoniosos. Das fontes brotaram novos filhos elementais, e elas auxiliaram os deuses nos muitos atos de criação que viriam a seguir.",
    "sections": [
      {
        "id": "wellsprings-of-one",
        "title": "Nascentes do Um",
        "body": "Sem acesso ao equilíbrio de todos os seis planos elementais, um totum font se fragmenta e fica inundado por um único elemento. A maioria foi curada quando os Planos do Metal e da Madeira retornaram, mas algumas dessas chamadas \"nascentes do um\" ainda vagam pelo universo, agitadas e confusas."
      }
    ]
  },
  "creature-wemmuth": {
    "description": "Fertilizados por grandes quantidades de sangue derramado, como o encontrado em campos de batalha manchados de sangue ou nas regiões devastadas pela guerra ao redor de cidades sitiadas, wemmuths são faixas vis de vinhas que extraem sustento do sofrimento mortal, lambendo sangue como água. Possuem inteligência rudimentar e sede inextinguível por sangue, ficando à espreita durante a maior parte de suas vidas e crescendo a tamanho incrível no solo ensanguentado de seus lares macabros. O corpo de um wemmuth compreende vinhas escassamente mais grossas que uma corda, e um único sistema adulto de wemmuth consiste em seis toneladas de vinhas, o bastante para se estender por 1.800 m se dispostas de ponta a ponta numa única linha reta. Wemmuths nunca se orientam dessa forma, porém, preferindo em vez disso envolver-se em montes maciços com aproximadamente 4,5 m de largura e igual espessura. A criatura condensa toda sua massa numa esfera de espinhos afiados e vinhas açoiteantes, parecendo um arbusto roliço odioso do tamanho de um elefante. Wemmuths comumente desenterram pedras maciças ou árvores inteiras do chão e as incorporam à sua massa roliça, usando esses objetos para reforçar sua defesa contra muitas formas de ataque ou para arremessá-los contra inimigos distantes com precisão aterradora.\n\nAlguns especulam que wemmuths são uma forma de corrupção diabólica solta sobre Golarion pela Casa Thrune de Cheliax, talvez como tática de terra arrasada contra seus rivais. Nobres influentes de Nirmathas e Molthune apontam um para o outro como responsáveis pela criação do wemmuth, Nirmathas citando os laços estreitos de Molthune com a infernal Cheliax e Molthune culpando a magia primal comumente empregada pelos muitos druidas e patrulheiros de Nirmathas. Vários contos varisianos descrevem criaturas que correspondem de perto à descrição do wemmuth tentando prender um famoso trapaceiro folclórico, enquanto cruzados de Mendev aderem à crença de que os wemmuths foram uma praga desencadeada sobre Golarion por Deskari, antigo senhor demônio dos gafanhotos, antes de sua derrota nas mãos de heróis mortais.",
    "sections": [
      {
        "id": "wemmuth-treasure",
        "title": "Tesouro de Wemmuth",
        "body": "Wemmuths têm pouco interesse em usar itens mágicos ou acumular tesouro por ganância, mas são inteligentes o bastante para entender que alguns bibelôs e bugigangas bem posicionados funcionam incrivelmente bem como iscas."
      }
    ]
  },
  "creature-zhuraita": {
    "description": "Zhuraitas são dedicados à liberdade da investigação acadêmica e científica, protegendo a criatividade e o inventivo dos campos eruditos. Muitos acadêmicos de bom coração têm avanços graças à inspiração de um zhuraita, notavelmente em projetos que têm impactos positivos duradouros sobre outros. Zhuraitas também viajam para defender importantes centros de conhecimento quando estão em perigo de destruição.\n\nZhuraitas desprezam aqueles que usariam a pesquisa como ferramenta de opressão, e há até rumores de que sabotam tais projetos, impedindo sua conclusão. Os azatas são conhecidos por às vezes ocultar conhecimento que acreditam ser prejudicial ou perigoso. Não destroem esse conhecimento de forma direta, porém, e em vez disso escolhem selá-lo em lugares que podem defender. Em raras ocasiões, um zhuraita reconhece que tal conhecimento pode de fato ser de alguma utilidade para um aliado de confiança e compartilha a informação, embora apenas sob a supervisão do zhuraita.",
    "sections": [
      {
        "id": "prayer-to-the-zhuraita",
        "title": "Oração ao Zhuraita",
        "body": "Muitos eruditos se viram queimando o último resto da vela até tarde da noite, os corredores do saber ecoando suas palavras: _Ó Erudito santo, por favor, traga-me à memória a fonte desta nota de rodapé; Sem sua citação extraviada, minha evidência vacilará; Meu professor desprezará meu trabalho inacabado; Ganhando à minha tese uma reprovação injusta._"
      }
    ]
  },
  "creature-bythos": {
    "description": "O bythos é um guardião do espaço e do tempo e busca sempre aqueles que fazem mau uso da magia planar e temporal. Um bythos é uma criatura vagamente humanoide com quatro braços e um corpo feito de nuvens e névoa rodopiantes. Apesar de sua aparência, seu corpo parece pedra seca ao toque. Um bythos busca paradoxos causados por viajantes planares ou dimensionais irresponsáveis e repara brechas onde as barreiras entre planos se tornaram finas ou danificadas. Se os mortais responsáveis permanecem na área e não podem ser convencidos a cessar suas atividades, o bythos não tem escrúpulos em removê-los. Usando sua habilidade de manipular o tempo, um bythos pode fazer um oponente morrer rapidamente de velhice enquanto o tempo acelera ao redor dele ou fazer um alvo desaparecer do tempo e do espaço.",
    "sections": [
      {
        "id": "guardians-of-time",
        "title": "Guardiões do Tempo",
        "body": "Aeons bythos não têm habilidade inata de entrar diretamente na misteriosa Dimensão do Tempo, mas muitos conhecem as rotas ocultas no Grande Beyond que se pode usar para viajar a esse estranho reino. Um bythos prefere destruir aqueles que buscam entrada na Dimensão do Tempo em vez de arriscar que o conhecimento de como alcançá-la se espalhe demais."
      }
    ]
  },
  "creature-sumbreiva": {
    "description": "Sumbreivas são os caçadores imparáveis do Vazio, rastreando e destruindo outras criaturas em seu plano por esporte e prática. Ocasionalmente, passam por uma fissura ou são trazidos ao Universo via um círculo de vinculação, onde colecionam almas vivas para exibir como troféus.\n\nSumbreivas se reúnem em Pavilhões Noturnos, onde treinam e exibem seus troféus de almas, que aparecem como volutas flutuantes de energia azul. Quanto mais formidável a alma, mais intensa a luz azul que emana dela. Sumbreivas em pavilhões periodicamente invadem o Universo numa Caçada Noturna e competem para ver quem consegue trazer de volta os troféus de almas mais brilhantes. O vencedor da Caçada Noturna lidera o pavilhão até a próxima caçada. Pavilhões Noturnos são classificados uns contra os outros pelos feitos dos caçadores dentro deles. Todos os sumbreivas desejam capturar uma alma poderosa o bastante para lhes garantir colocação no Pavilhão Crepuscular, reservado às almas e caçadores verdadeiramente de elite.",
    "sections": [
      {
        "id": "superior-sumbreivas",
        "title": "Sumbreivas Superiores",
        "body": "Conforme caçadores sumbreiva obtêm almas, crescem em poder e se transformam fisicamente. Podem aumentar de estatura, desenvolver mais membros ou grandes asas coriáceas, ou formar armamentos avançados adequados às suas personalidades e métodos de caça. Essas manifestações externas tornam fácil para outros sumbreivas distinguir guerreiros superiores dos caçadores menos habilidosos. Diz-se que os maiores sumbreivas são gigantes inexoráveis adequados para caçar apenas kaiju, semideuses e a progênie de Rovagug."
      }
    ]
  },
  "creature-thousand-thieves": {
    "description": "Bons comparsas são difíceis de encontrar. Para um mestre ladrão incapaz de encontrar cúmplices competentes, às vezes a única forma de executar o assalto perfeito envolve tornar-se uma guilda inteira de criaturas minúsculas. Aqueles que se transformam propositalmente dessa forma favorecem criaturas que se arrastam, como centopeias ou aranhas. Ocasionalmente, mil ladrões se forma quando uma comunidade de ratos-do-campo descobre o corpo de um patife morto e luta por seus ganhos ilícitos. Esses andarilhos-enxame usam sua forma de enxame para entrar em casas, cofres e outros alvos com facilidade.",
    "sections": []
  },
  "creature-deimavigga": {
    "description": "Como mestres de lógica fria e calculada e de proselitismo perfeitamente cronometrado, os detestáveis deimaviggas buscam colocar amigo contra amigo e desviar os fiéis de suas crenças a cada oportunidade. Suas ferramentas mais comuns são o ego e o desespero mortais. Aqueles que ocupam posições altas ou são ambiciosos em sua fé são atraídos para a autoglorificação até se verem em primeiro lugar e sua divindade e clero em segundo. Aqueles propensos à dúvida ou ao desgosto são isolados, enquanto o deimavigga perturba suas magias divinas e enfraquece sua fé.",
    "sections": [
      {
        "id": "lore-operators",
        "title": "Operadores de Conhecimento",
        "body": "Enquanto a maioria dos diabos desempenha um papel especializado dentro de uma máquina infernal complexa, deimaviggas trabalham quase exclusivamente sozinhos, pois acham até os lacaios mais obedientes um entrave a suas estratagemas."
      }
    ]
  },
  "creature-eseneth": {
    "description": "Eseneths, comumente conhecidos como costureiros de almas, são cirurgiões impassíveis que reparam almas danificadas. Operam com eficiência profissional, manifestando grandes agulhas de costura compostas de energia espiritual para fazer seu trabalho necessário. Um eseneth aparece como um humanoide magro, sem pelos, de pele acinzentada e sem traços faciais. Manchas de carne escura e elevada pontilham seu peito e ombros.",
    "sections": [
      {
        "id": "spirit-needles",
        "title": "Agulhas Espirituais",
        "body": "As agulhas espirituais de um eseneth são compostas da essência do psicopompo. As agulhas se formam e se dissipam à vontade do eseneth e existem apenas enquanto o eseneth existir."
      }
    ]
  },
  "creature-kadamel": {
    "description": "Fiends espalham corrupção a lugares por todos os planos — a todo lugar que conseguem alcançar. Kadamels guardam as vias mais cruciais e santuários sagrados. Mantêm uma vigília paciente, nunca distraídos de sua tarefa. Mais crucialmente, vigiando portais planares, barrando a passagem a todos, exceto aos fiends mais poderosos. Quando encontrados, esses arcanjos falam e reagem pouco. Raramente se movem ou reagem, embora aceitem prontamente qualquer assistência para derrotar invasores infernais. Mesmo isso, aceitam apenas com um aceno ominoso.",
    "sections": []
  },
  "creature-ninkonda": {
    "description": "Quando mortais outrora honrados caem na maldade e cometem atrocidades terríveis, ninkondas partem para rastreá-los. Vestidos em armadura de placas que apresenta um espelho brilhantemente reluzente no peito e carregando espinhos e pregos cravados em seus corpos, ninkondas servem como caçadores das forças celestiais. Em vez de abater imediatamente suas presas, porém, ninkondas fazem o possível para encorajar uma mudança de coração e fomentar eventual redenção em seus alvos. Ninkondas usam seus espelhos para refletir os pecados do alvo e mostrar o estado de sua alma, e muitos alvos buscam mudar após vislumbrar esse reflexo. Aqueles que não o fazem em breve se veem frente a frente com o poder mudo de seu caçador.",
    "sections": [
      {
        "id": "seeking-redemption",
        "title": "Buscando Redenção",
        "body": "Ninkondas têm uma origem particularmente única entre anjos. Embora o ninkonda ocasional seja nascido da alma de um mortal justo que buscou continuar seu trabalho de redimir outros na vida após a morte, a maioria provém das fileiras dos menos escrupulosos. Após séculos ou milênios de perseverança, almas que buscam verdadeira redenção ganham a habilidade de se juntar às fileiras celestiais dos anjos, geralmente como cassisianos ou outros seres humildes. Conforme ascendem pelas fileiras celestiais, gravitam em direção ao papel de ninkondas na esperança de ajudar outros. De certa forma, ninkondas são autopropagantes. Dado tempo suficiente, poderiam acumular incontáveis anjos em suas fileiras graças aos próprios esforços."
      }
    ]
  },
  "creature-phasmadaemon": {
    "description": "Os aterrorizantes phasmadaemons usam ilusões e suas próprias aparências assustadoras (a de serpentes com caudas ósseas, crânios crocodilianos cornudos como cabeças e várias pinças insetoides) para incutir medo nos corações dos outros. Representam mortes provocadas pelo pavor. Em última instância, qualquer tipo de medo pode levar à criação de um phasmadaemon, mas uma alma que se transforma em tal fiend deve rapidamente encontrar outros medos para se alimentar e acumular sua própria força. Sem a nutrição do medo humano, o phasmadaemon recém-nascido começa a definhar, eventualmente \"morrendo\" e tornando-se quintessência planar. Apenas os phasmadaemons mais astutos e capazes sobrevivem à fome inicial, aprendendo a predar até as almas mais corajosas como resultado.",
    "sections": [
      {
        "id": "fearful-machinations",
        "title": "Maquinações Medrosas",
        "body": "Embora daemons normalmente não precisem de alimento, phasmadaemons parecem empenhados em se alimentar das emoções, e especialmente dos medos, dos mortais. Alguns acreditam que a força vital e as emoções das criaturas servem como combustível para a magia de um phasmadaemon, enquanto outros suspeitam que phasmadaemons simplesmente deleitam-se em encarar mortais olho a olho enquanto se alimentam, regozijando-se com o medo dos momentos finais de sua presa."
      }
    ]
  },
  "creature-radiant-warden": {
    "description": "Os enigmáticos e estranhos guardiões radiantes foram construídos há milhares de anos para proteger observatórios e eruditos contra a incursão de agressores alienígenas do Domínio do Negro. Com o tempo, seus papéis como guardiões se expandiram para incluir vigiar qualquer região onde as leis do tempo e do espaço se desgastaram, particularmente perto de portais e portões permanentes entre planetas, planos ou dimensões.\n\nNomeados tanto pela natureza radial dos anéis concêntricos que compõem seus corpos quanto pelo brilho radiante de seus ataques, guardiões radiantes continuam suas ordens, defendendo sítios de invasão com propósito inabalável.",
    "sections": [
      {
        "id": "ancient-intellects",
        "title": "Intelectos Antigos",
        "body": "A força animadora de cada guardião radiante consiste em energia de vitalidade bruta fundida à alma de um sacrifício voluntário — geralmente um astrônomo ou erudito perto do fim de sua vida natural. Focados agora em proteger um sítio de qualquer intrusão — incluindo arqueólogos curiosos ou aventureiros —, um guardião radiante pode fazer uma pausa antes de um ataque se abordado pacificamente. Infelizmente, esses construtos tendem a falar em enigmas vagos ou diatribes matemáticas complexas que podem ser tão confusas quanto intrigantes. Muitas vezes, as discussões se desfazem conforme a frustração cresce de um lado ou de ambos."
      }
    ]
  },
  "creature-vaspercham": {
    "description": "Vasperchams são horrores aquáticos que deleitam-se com a violência, espreitando nas águas rasas perto de costas. Uma vez que um vaspercham se instala num lar, permanece teimosamente ali, independentemente de quaisquer comunidades que habitem por perto. A força física e as habilidades de distorção mágica de um vaspercham tornam-no incrivelmente difícil de desalojar uma vez instalado. Vasperchams respondem apenas à força, então é preciso vencê-los em combate para obter sua cooperação relutante. Mas uma vez que um vaspercham recupera sua força, inevitavelmente trai qualquer aliança temporária.",
    "sections": [
      {
        "id": "forbidden-armor",
        "title": "Armadura Proibida",
        "body": "Após uma batalha devastadora com um vaspercham, muitos heróis lendários tentaram forjar armaduras ou armas a partir da carapaça mágica da fera marinha, mas todos falharam graças à poderosa maldição que impregna o material opalino. Se alguém fosse capaz de dissipar a maldição da carapaça de um vaspercham — ou de algum modo torcer a maldição a seu próprio benefício —, seria capaz de forjar um traje incrível de _armadura de placas +2 antimagia resiliente maior_."
      }
    ]
  },
  "creature-ximtal": {
    "description": "As lutas da solidão e a ansiedade que acompanha esse sentimento afligem muitas criaturas, e ximtals deleitam-se em explorar esse medo para seu próprio ganho perverso. Aparecendo como um híbrido de rato e caranguejo com tentáculos agarradores, esses fiends ardilosos manipulam suas vítimas ao longo de longos períodos, como pakalchis, para saborear o máximo de medo possível. Ximtals usam sutileza para enredar sua presa e muitas vezes não se envolvem diretamente com seus alvos. Usam inseguranças como ferramenta e forçam comportamento ruim em mortais sobre os quais fixam seus olhos. Preferem concentrar suas maquinações em mortais de vontade forte e boas intenções, esperando corroer seu orgulho e autoestima e, em última instância, levá-los a abandonar esforços altruístas.\n\nEm vez de se concentrar numa única vítima, um ximtal pode buscar uma causa particular relevante aos apetites do sahkil. Muitas vezes vagam pelo multiverso buscando sabotar cruzadas sociais ou suprimir ideologias divergentes. Deleitam-se particularmente em explorar os medos de grupos de indivíduos de mentalidade semelhante.\n\nEmbora a maioria dos ximtals trabalhe sozinha, às vezes recrutam a assistência de pakalchis, que compartilham gostos semelhantes em medo mortal. Juntos, esses dois tipos de fiends podem dissolver a autoestima individual, relacionamentos e até organizações inteiras.",
    "sections": []
  },
  "creature-adamant-sentinel": {
    "description": "Forjadas de um metal quase indestrutível de grande raridade, sentinelas de adamantina não podem ser destruídas exceto pelos inimigos mais poderosos. Forjar uma sentinela de adamantina requer uma quantidade de adamantina tão massiva que coletá-la geralmente exige montar uma expedição de mineração a um planeta distante, ao Plano da Terra ou a um Plano Exterior.",
    "sections": [
      {
        "id": "adamantine-hunks",
        "title": "Blocos de Adamantina",
        "body": "A quantidade incrível de adamantina necessária para criar uma única sentinela de adamantina vale mais do que os tesouros de muitas nações. O coração poderoso de uma sentinela de adamantina pode ser transformado numa forja lendária para ferraria."
      }
    ]
  },
  "creature-katpaskir": {
    "description": "Nascidos das almas de apocalípticos e líderes de culto que buscaram minar e desfazer a realidade, katpaskirs são demônios do niilismo e do desfazimento. Investigam as bordas da realidade, colocando-se nas fissuras entre reinos e arranhando a compostura da própria existência. Katpaskirs têm um senso inquietante para localizar portais e outras convergências planares. Buscam corromper e expandir esses portões, soltando-os para se expandirem por conta própria ou derivarem pelo multiverso. Ao fazê-lo, contribuem lentamente para o desfazimento final da realidade. Katpaskirs muitas vezes aparecem como humanoides insetoides com múltiplos braços ou pernas, cada um capaz de arranhar e rasgar as costuras da existência.",
    "sections": [
      {
        "id": "rift-makers",
        "title": "Criadores de Fissuras",
        "body": "Katpaskirs sentem fraquezas no tecido planar. Esses demônios se enroscam nos espaços entre dimensões e desfazem as barreiras. Deixam buracos destinados a causar caos e dissolução. Dessa forma, katpaskirs roem a realidade, esperando um dia desfazê-la."
      }
    ]
  },
  "creature-shoggoth": {
    "description": "Enquanto fanáticos delirantes e profetas apocalípticos afirmam desesperadamente que o monstruoso shoggoth não passa de uma visão induzida por drogas ou pesadelo irreal, a verdade é bem mais grave. Shoggoths existem, mas tendem a permanecer nas trincheiras oceânicas mais profundas ou nas cavernas e ruínas mais remotas, emergindo apenas para espalhar caos e destruição em seus rastros viscosos.\n\nOs primeiros shoggoths foram criados por uma espécie alienígena para servir como bestas de carga insensatas. Seu vasto volume e natureza amorfa os tornaram úteis para muitos tipos de trabalho, e sua habilidade de formar espontaneamente novos olhos, bocas ou outros órgãos os tornou incrivelmente versáteis. Eventualmente, desenvolveram inteligência suficiente para se rebelar contra seus mestres, e agora espreitam nas profundezas sem luz.\n\nUm shoggoth tem objetivos insondáveis para seres humanoides. Lembram seus eons de servidão, e comparados a seus mestres misteriosos, outros seres sencientes são meros pontos que rastejam sobre a superfície, indistinguíveis de animais. Quando rolam seu corpo hediondo sobre um bando de exploradores, engolindo-os numa prensa gelatinosa de dentes roedores, não é tanto maldade quanto indiferença.\n\nShoggoths podem tornar-se objeto de culto para seitas dedicadas ao caos e à entropia. Não respondem a essa adoração, mas podem-se contar com eles para consumir qualquer vítima que a seita sacrifique. Rumores de shoggoths com intelectos ainda maiores são, espera-se, apenas isso, pois o dano que um capaz de raciocínio superior poderia causar ao mundo é perturbador, para dizer o mínimo.",
    "sections": [
      {
        "id": "tekeli-li",
        "title": "Tekeli-Li",
        "body": "Embora a cacofonia de um shoggoth seja uma mistura eldritch de som e segredos perigosos, a frase \"tekeli-li\" é o grito mais frequentemente repetido, e essas palavras misteriosas são sempre discerníveis entre suas vocalizações. Às vezes, aves selvagens que habitam lugares assombrados por shoggoths gritam essa estranha frase, enquanto perto de outros lares de shoggoth ela pode ser ouvida em rajadas de vento congelado. Tentativas de traduzir a frase, mesmo via magia, só encontraram fracasso, como se as próprias palavras resistissem a revelar seus segredos ao mundo."
      }
    ]
  },
  "creature-urveth": {
    "description": "Um urveth é um terror escavador massivo de quatro braços com corpo semelhante a verme e bocarra escancarada que devora tudo que consegue. Urveths escavam fundo debaixo da terra para se esconder do sol, emergindo sob o manto da escuridão para matar e consumir.",
    "sections": []
  },
  "creature-hesperid-queen": {
    "description": "Rainhas hesperídes governam regiões isoladas encharcadas pela luz do pôr do sol. Guardam incontáveis tesouros e segredos, embora, se lhes for oferecido um acordo intrigante por alguém que as trate com o devido respeito, estejam dispostas a ceder algum conhecimento ou itens — exceto os mistérios e valores que juraram proteger.\n\nDentro de seus reinos dourados, rainhas hesperídes são relativamente propensas a salvaguardar objetos de poder, como relíquias ou artefatos antigos. Como tal, estão plenamente cientes do perigo representado por caçadores de tesouros inescrupulosos que buscam obter esses itens a qualquer custo, e usam suas mentes incríveis para armar contramedidas diabólicas para proteger suas protegidas, mesmo no caso de sua própria morte.",
    "sections": [
      {
        "id": "draconic-rapport",
        "title": "Afinidade Dracônica",
        "body": "Rainhas hesperídes e dragões da fortuna têm uma afinidade incomum, às vezes trabalhando juntos para guardar tesouros. A rainha pode guardar tais valores como parte de sua protegida, mesmo enquanto o dragão os vê como seu tesouro. Os pontos de vista concorrentes não incomodam nenhuma das partes, e tais alianças podem durar milênios."
      }
    ]
  },
  "creature-obcisidaemon": {
    "description": "Embora a guerra possa ter muitas facetas, obcisidaemons se importam apenas com a brutalidade e a violência que o conflito traz. Esses daemons devastadores buscam apenas destruir, deixando escombros e cinzas em seu rastro. Refletindo o desejo mortal de erradicar completamente o inimigo, obcisidaemons nunca deixam intencionalmente uma alma para trás em seus caminhos de guerra. Reivindicam as almas daqueles que massacram, adicionando-as a uma capa profana que exsuda de seus corpos como névoa pegajosa. Almas adicionadas à capa não conseguem viajar para a vida após a morte, e a maioria dos obcisidaemons só consegue reter um punhado dessas almas por vez. Sempre que a capa de um obcisidaemon está sobrecarregada ou em momentos em que o fiend precisa de maior poder, consome uma alma e recebe rejuvenescimento ou a força necessária para causar mais destruição.",
    "sections": [
      {
        "id": "soul-hoarding",
        "title": "Acúmulo de Almas",
        "body": "Obcisidaemons carregam algumas almas por meses ou até anos, escolhendo nunca consumi-las mesmo quando isso poderia lhes conceder vantagem em combate."
      }
    ]
  },
  "creature-tzitzimitl": {
    "description": "Devido à sua afinidade com a escuridão e o terror apocalíptico, tzitzimitls são amplamente temidos como arautos da morte e da destruição. Um eclipse solar marca sua chegada, e extraem estranhos poderes de escuridão e eletricidade desses fenômenos. Alguns sábios acreditam que tzitzimitls são instrumentos dos deuses, convocados para destruir mundos cujo tempo chegou, enquanto outros afirmam que são os restos mortos-vivos de exilados de uma civilização distante de gigantes viajantes do espaço. Tais lendas são antigas e fragmentadas, mas algumas falam de tzitzimitls derrotados por grandes heróis e selados — embora esses contos impliquem que os enormes mortos-vivos agora jazem enterrados e à espera, em breve a devastar de novo se suas tumbas forem violadas.",
    "sections": [
      {
        "id": "harbingers-of-the-end",
        "title": "Arautos do Fim",
        "body": "A chegada de um tzitzimitl numa região muitas vezes precede um desastre mortal ou evento apocalíptico. Não se sabe se o tzitzimitl acompanha um evento já destinado a ocorrer ou se o morto-vivo causa tais eventos por meio de sua própria magia estranha."
      }
    ]
  },
  "creature-baomal": {
    "description": "Poucos monstros marinhos são tão temidos quanto o baomal de duas cabeças. Esses predadores massivos tipicamente habitam as águas mais profundas, competindo com krakens e outros colossos por comida. Subsistem de baleias e outras grandes criaturas marinhas, muitas vezes seguindo-as até a superfície da água durante uma caçada. Perto da superfície, baomals que encontram navios aprendem rapidamente que contêm uma variedade de petiscos saborosos. As enormes feras usam seus espinhos devastadores para rasgar os cascos dos navios, depois se alimentam com calma dos marinheiros indefesos.",
    "sections": [
      {
        "id": "mysterious-origins",
        "title": "Origens Misteriosas",
        "body": "Com muita frequência, aqueles que estudam monstros estranhos assumem que foram criados por magos poderosos, porém imprudentes, ou que são resultado dos experimentos antigos do império alghollthu. No caso do baomal, pesquisa extensa sugere que nenhuma dessas explicações é precisa. Nenhum texto antigo foi recuperado em que um mago afirme ter criado o primeiro baomal, e embora os alghollthus os usem como feras de guerra, entalhes antigos sugerem que, nos primeiros dias, baomals caçavam vorazmente alghollthus."
      }
    ]
  },
  "creature-bikkhasura": {
    "description": "Asuras que foram reencarnadas à força ao longo de incontáveis vidas, bikkhasuras cresceram até níveis de poder quase divinos.",
    "sections": []
  },
  "creature-draconal": {
    "description": "Agathions dracônicos, conhecidos como draconals, estão entre os mais poderosos de sua espécie e também os mais sábios, personificando a sabedoria de um filósofo-rei benevolente. Com sua sabedoria vem uma elevação acima de assuntos materiais, tornando-os os mais distantes dos problemas e vidas dos mortais. Draconals servem como guardiões de magia poderosa e dispensam sua sabedoria a serviço do bem maior de Nirvana e dos planos celestiais.\n\nComo seres celestiais, draconals se opõem a forças profanas e perversas. São criaturas pacientes e atemporais, e suas maquinações contra as forças do mal às vezes avançam a um ritmo glacial. Draconals tendem a ter impacto mais imediato e direto trabalhando como mentores de mortais. Podem fornecer conselho e conhecimento a indivíduos ou grupos de heróis que trabalham contra a maldade, guiando os mortais a extirpar o mal com precisão de bisturi. Essa mentoria também permite a um draconal manter seu foco em assuntos planares ou num plano maior e de longo prazo contra o mal. Alguns draconals veem a presença do mal como algo útil, uma motivação para incitar criaturas benevolentes à ação. Para mortais, essa perspectiva às vezes pode parecer indiferença, mas draconals raramente permitem conscientemente que um mal saia do controle.\n\nDraconals parecem mais dracônicos do que humanoides. Andam sobre as patas traseiras e se equilibram em suas longas caudas serpentinas. Garras afiadas pontuam suas mãos humanoides escamadas. Cada draconal muitas vezes personifica uma sabedoria central de algum tipo. Essa sabedoria frequentemente afeta sua aparência física de formas distintas. Por exemplo, um draconal que acredita que a maior sabedoria está em compreender a si mesmo provavelmente terá escamas reflexivas, permitindo que quem olha para ele se veja plenamente. Por isso, draconals vêm em todas as formas, tamanhos e cores diferentes.",
    "sections": [
      {
        "id": "draconals-and-dragons",
        "title": "Draconals e Dragões",
        "body": "Draconals têm grande respeito por dragões, particularmente grandes dragões, mas como raramente visitam o Universo mortal, as interações entre os dois grupos tendem a ser mínimas. Apesar de um respeito geral pelo dragão, draconals muitas vezes detestam dragões maliciosos. Em tempos de conflito, draconals usam sua força e sabedoria contra as forças da maldade. Posicionam-se ao lado de dragões empíreos e outros dragões celestiais para enfrentar forças profanas."
      }
    ]
  },
  "creature-eremite": {
    "description": "Eremitas vagam pelos planos em busca de porções ideais de outras criaturas, como o braço empunhador de espada de um herói ou as penas de um anjo. Eremitas capturam esses espécimes, testam clinicamente seus verdadeiros limites, depois colhem as partes mais escolhidas e as acrescentam aos próprios corpos. Um eremita pode prender línguas à mão como dedos extras ou um punho na nuca numa horrenda \"melhoria\". Eremitas tipicamente medem cerca de 2,1 m de altura e pesam aproximadamente 90 kg.",
    "sections": []
  },
  "creature-izfiitar": {
    "description": "Ocupando o ápice do sistema de castas proteano frouxo, izfiitars executam os planos em constante mudança dos venerados senhores proteanos e dos divinos Oradores das Profundezas.",
    "sections": [
      {
        "id": "heralds-of-the-speakers",
        "title": "Arautos dos Oradores",
        "body": "Izfiitars com a maior autoridade têm poderes ainda maiores, como a habilidade de separar porções de outros planos para o Maelstrom ou de desafiar as leis da realidade para redirecionar efeitos de magias a seu capricho."
      }
    ]
  },
  "creature-kimenhul": {
    "description": "Entre os mais fortes de sua espécie, além dos torturadores sahkil, kimenhuls trabalham sua arte para fomentar desespero naqueles que temem o fracasso, formando ciclos de autodesprezo. Esses sahkils poderosos concentram sua atenção em mortais que aparentemente estão no auge de sua habilidade, mas abrigam medos secretos de inadequação. As predações de um kimenhul podem deixar uma marca indelével em suas vítimas. O kimenhul sussurra ameaças e envia medos de fracasso esmagador à sua presa, aparentemente originando-se da própria mente do alvo, um trauma que pode ser difícil de suportar sem ajuda. Os fiends atormentam a presa enquanto as infelizes vítimas vivem, usando sua habilidade Medo Eterno todos os dias para lembrar psiquicamente suas vítimas anteriores de suas falhas. Alguns kimenhuls únicos se encontram em posições de liderança em Xibalba (veja barra lateral), onde esculpem seus próprios pequenos reinos e dirigem grupos de sahkils para ajudá-los a encontrar mortais para atormentar. Governam esses reinos de pesadelo pelo terror, muitas vezes deleitando-se em atormentar novos peticionários ou maquinando formas de agir contra inimigos imortais.",
    "sections": []
  },
  "creature-nasurgeth": {
    "description": "Nasurgeths são vazios famintos com olhos em hastes brilhantes e milhares de dentes. Espreitam nas profundezas sob as ondas, onde a luz do sol não alcança. À noite, ascendem aos céus e chovem destruição e ruína sobre os vivos.",
    "sections": []
  },
  "creature-veranallia": {
    "description": "Veranallias representam a liberdade da vida para crescer, mudar e se adaptar. Raramente interagem diretamente com não azatas, pois a maioria dos outros seres acha sua natureza difícil de compreender, mas aqueles que garantem sua ajuda os encontram aliados poderosos. A metade inferior do corpo de uma veranallia é feita de vegetação que repete constantemente um ciclo vertiginoso de brotamento, floração, prosperidade e murchamento. A metade superior de seu corpo aparece como a de um humanoide de qualquer gênero — é raro uma veranallia permanecer consistente em seu gênero por mais de algumas estações de cada vez.\n\nVeranallias transformam a paisagem em seu rastro, trazendo criação e destruição igualmente. O mundo ao redor delas transborda de abundância de vegetação, com comida de sobra para animais próximos, e quando trazem destruição, fazem-no sem crueldade, pois às vezes é necessário abrir espaço para nova vida. Provocam incêndios florestais em bosques antes que a vegetação seca se acumule a níveis perigosos e trazem invernos rigorosos a áreas assoladas por parasitas que prosperam em clima quente.",
    "sections": [
      {
        "id": "primordial-veranallia",
        "title": "Veranallia Primordial",
        "body": "Nas profundezas mais remotas de Elysium, vagam as veranallias mais anciãs. Esses seres se preocupam com transformações que ocorrem ao longo de milênios, bem como mudanças nos climas de mundos inteiros. Veranallias primordiais têm uma gama de poderes únicos que podem afetar a área por muitos quilômetros ao redor delas, desde transformar desertos em vidro até provocar terremotos."
      }
    ]
  },
  "creature-volnagur": {
    "description": "De toda a progênie de Rovagug, a criatura conhecida como Volnagur é aquela que mais se distanciou do Cofre Morto no núcleo de Golarion, fazendo em vez disso seu lar entre os céus. Volnagur possui muitas asas, e elas são desparelhadas, assimétricas e descoordenadas, mas a progênie massiva é capaz de voo poderoso que a leva tão longe quanto Arcadia, Tian Xia e até Sarusan. Embora capaz de causar grande destruição tanto com suas muitas línguas afiadas como navalhas quanto com poderosos jatos de energia de seus quatro olhos, a habilidade mais temível de Volnagur é a canção discordante produzida pelo angulamento preciso de suas asas contra o vento, que leva todos que a ouvem à violência, colocando vizinho contra vizinho.\n\nEmbora não avistada há décadas, astrônomos recentemente localizaram um satélite nos limites superiores da atmosfera de Golarion, onde Volnagur paira imóvel. Conforme deriva de continente a continente, seus olhos parecem alternadamente voltar-se para a lua, depois de volta a Golarion, como se aguardasse um sinal.",
    "sections": []
  },
  "creature-green-man": {
    "description": "Homens verdes são deidades menores antigas e enigmáticas das florestas primevas, encarnações vivas da natureza e do reino vegetal. Quando uma floresta ou outro terreno arborizado gera espíritos da natureza suficientes, seres com o mesmo tipo de essência vital que encarna leshies ou responde ao chamado de uma comunhão naturalmente se coalescem e se apoteosam num homem verde. Homens verdes não se preocupam com todos os processos multifacetados da natureza como Gozreh ou muitas outras deidades da natureza. Em vez disso, concentram quase toda sua atenção nas plantas de seu lar, preocupando-se com animais, minerais e similares apenas na medida em que afetam as plantas. Apesar do nome, homens verdes não são necessariamente masculinos; como criaturas de puro poder natural, para muitos deles o conceito de gênero não tem significado, e para aqueles que o têm, podem ser de qualquer gênero.\n\nA maioria dos homens verdes tende a ignorar animais, que para eles incluem criaturas sencientes como humanos. Porém, homens verdes que se envolvem nos assuntos de tais criaturas existem. Esses indivíduos são bem mais propensos a tentar espalhar sua influência longe e amplamente, seja para o bem ou para o mal. Homens verdes virtuosos proporcionam socorro a todos que entram em seu lar, não apenas às plantas, oferecendo sabedoria como um pai ou mãe acolhedor. Homens verdes perversos, porém, permitem que plantas raras e perigosas prosperem em seus domínios espalhando medo e devastação a todos que possam ameaçar a vida vegetal, embora possam manter alguns animais por perto para caçar por esporte.",
    "sections": [
      {
        "id": "leshies-and-green-men",
        "title": "Leshies e Homens Verdes",
        "body": "Homens verdes são às vezes chamados de \"reis leshy\" em manuscritos antigos. Druidas consideram os primeiros homens verdes a fonte original dos rituais para criar leshies menos divinos e possivelmente até arbóreos e outras plantas inteligentes. A afinidade entre leshies e homens verdes é mútua. Leshies são a ancestralidade mais provável a adorar homens verdes, e homens verdes são particularmente afeiçoados a seus parentes menos poderosos."
      },
      {
        "id": "worshipping-green-men",
        "title": "Adorando Homens Verdes",
        "body": "Homens verdes individuais são deidades menores, capazes de conceder magias àqueles que os adoram. Homens verdes tipicamente só permitem que plantas inteligentes — como leshies — sejam seus clérigos. Se outra criatura prova ser amiga das plantas, após uma avaliação pessoal minuciosa, um homem verde pode aceitar de todo coração esse estranho adorador carnudo em seu seio. Embora homens verdes individuais tenham éditos e anátemas diferentes adequados às suas personalidades, o seguinte é uma linha de base que a maioria dos adoradores de homens verdes segue."
      }
    ]
  },
  "creature-sorvuth-ka": {
    "description": "Sorvuth-ka é a mais jovem da progênie de Rovagug. Nunca foi vista comendo; carecendo da fome voraz observada nas outras Progênies, parece destruir simplesmente pelo prazer, abordando cada um de seus ataques com crueldade nova e inventiva. Sorvuth-ka pode fazer uma pausa enquanto destrói uma cidade para dar à população tempo justo o bastante para fugir, só para que percebam em desespero que sua única rota de fuga é um desfiladeiro de montanha que Sorvuth-ka já desmoronou. Porém, a criatura se entedia facilmente, despachando depressa a presa com membros laminados se seus jogos deixam de sair conforme o plano ou demoram demais para se concretizar.\n\nCuriosamente, apesar das habilidades regenerativas de Sorvuth-ka — poderosas até para uma Progênie e capazes de torná-la resistente a ataques que a feriram —, tem várias feridas que se recusam a cicatrizar, notavelmente um grande talho através de seu rosto. Alguns eruditos teorizam que essas feridas são algum desígnio cruel de Rovagug, para melhor permitir acesso ao sangue âmbar que é o principal instrumento de destruição de Sorvuth-ka. Outros tomam isso como prova da existência de uma arma capaz de acabar com a ameaça da Progênie de Rovagug de uma vez por todas.",
    "sections": []
  },
  "creature-fetchling-scout": {
    "description": "Batedores fetchling patrulham as periferias de suas comunidades, vigiando quaisquer ameaças possíveis.",
    "sections": []
  },
  "creature-naari-pyrochemist": {
    "description": "O sangue dos naaris arde com fogo elemental. No Plano do Fogo, a maioria dos naaris são cidadãos de segunda classe que servem sob o tacão de ferro dos ifrits e seu Domínio da Chama, mas aqueles nascidos fora da hierarquia ifrit ou que escolhem fugir dela vivem vidas de paixão em busca de fama, glória e poder.\n\nNaaris gostam de fogo, mas isso não significa que todos abracem a natureza destrutiva do fogo. Aqueles que buscam papéis mais produtivos numa sociedade podem valorizar o calor protetor do fogo e o papel que desempenha na criação ou na culinária. Outros encontram inspiração na forma como as chamas dançam e cintilam, e orgulham-se de suas habilidades como acrobatas ou dançarinos. A igreja de Sarenrae acolhe particularmente dançarinos do fogo naari, tanto em apreciação de sua habilidade quanto para ajudar a garantir que esses naaris tenham um lugar seguro longe de seus parentes mais violentos.\n\nMas, em geral, naaris são atraídos a profissões e vocações que lhes permitem indulgir nas glórias do fogo. Pirotécnicos naari aplicam essa vocação aos ensinamentos alquímicos, vendo pureza em cada bomba arremessada ou conflagração acesa.",
    "sections": [
      {
        "id": "geniekin-parentage",
        "title": "Linhagem Geniekin",
        "body": "Filhos planares dos planos elementais são conhecidos como geniekin porque nascem esmagadoramente de uniões entre mortais e gênios: naaris nascem de ifrits, oreads de jabalis, sulis de jann, sylphs de jaathooms e undines de faydhaans. Apesar dessa ascendência distinta, geniekin não exibem a maioria dos talentos excepcionais de seus pais."
      }
    ]
  },
  "creature-oread-guard": {
    "description": "Terra elemental percorre os ossos dos oreads, que parecem estátuas de pedra de sua ascendência mortal, com cristais delicados no lugar de cabelo, pelos ou escamas. A maioria dos oreads é estoica e lenta para planejar, mas inabalável em sua resolução e firme em suas convicções.\n\nO oread típico valoriza reclusão silenciosa. Porém, conforme envelhecem, muitos oreads se veem inexplicavelmente atraídos a algum local distante com um puxão como o exercido sobre a agulha de uma bússola — intangível, constante e, em última instância, irresistível. O destino dessa peregrinação misteriosa é único para cada oread, embora geralmente termine em algum lugar de grande poder místico, esplendor natural ou aprendizado esotérico. A maioria dos oreads é atraída a um lugar que é de algum modo familiar, mas um punhado raro sente-se compelido a viajar numa direção aparentemente aleatória, partindo apenas com a esperança de descobrir qualquer mistério que jaz no fim de seu caminho invisível.\n\nMuitos oreads acham que o papel de guarda combina bem com sua personalidade, pois nesse papel podem sentir que estão ajudando a promover a ordem, mas também encontram tempo para manter vigília como sentinelas solitárias sobre uma porção específica de uma fortificação ou um local remoto numa trilha na natureza selvagem.",
    "sections": []
  },
  "creature-samsaran-anchorite": {
    "description": "Muitos samsarans preferem uma vida reclusa em suas tentativas de alcançar iluminação.",
    "sections": []
  },
  "creature-suli-dune-dancer": {
    "description": "Como seus antepassados gênios viajam por todo o Universo, sulis (descendentes de mortais e jann, que são compostos de todos os seis elementos) são em geral os geniekin mais comuns naquele plano. Muitas vezes são artesãos e mediadores de paz, compelidos a tentar trazer harmonia e equilíbrio num mundo repleto de discórdia.\n\nSulis têm um charme natural que muitas vezes escapa a outros geniekin, mas tendem a sobrepor um nível de orgulho jactancioso ou até arrogância como peculiaridade pessoal ou fachada humorística. Poucos não-sulis percebem que se gabar não é simplesmente sintoma de um ego inflado para sulis, mas em vez disso uma instituição cultural facilmente comparável à poesia humana. Os gabarites dos sulis não só glorificam a si mesmos, mas também fixam as realizações de seus companheiros e famílias na história, com o objetivo final de tecer histórias que serão recontadas por gerações. Isso é especialmente verdadeiro para sulis que viveram com outros geniekin e foram vistos como inferiores por não ter uma conexão forte com um Plano Elemental.\n\nDançarinos das dunas suli são apenas uma forma pela qual esses geniekin buscam integrar-se a outras sociedades humanoides. Trabalham para aprimorar suas habilidades de gabarito a um ponto em que suas afirmações ajudem a fortalecer aqueles com quem viajam. Sulis de regiões que não sejam desertos ajustam seus nomes para combinar com seus terrenos, mas independentemente de preferirem florestas, colinas ou planícies árticas, seus gabarites permanecem tão convincentes.",
    "sections": []
  },
  "creature-sylph-sneak": {
    "description": "Nascidos com vendavais elementais percorrendo sua respiração, sylphs são filhos planares etéreos cujos corpos parecem presos numa brisa suave perpétua. Mais comumente nascidos de uniões entre mortais e jaathooms, sylphs são perspicazes e criativos, mas propensos a voos de fantasia e tendem a se distrair facilmente.\n\nSylphs são notórios por sua prática de \"ouvir o vento\", que a maioria dos outros descarta como um nome pomposo para bisbilhotar. Porém, esse costume significa muito mais para sylphs, que passam horas ouvindo as histórias trazidas a eles na brisa proverbial. Enquanto alguns sylphs menos escrupulosos podem usar a informação que aprendem para chantagear ou abusar de outros, a maioria vê ouvir o vento como sua forma de permanecer conectada ao mundo ao redor, mantendo-o confortavelmente à distância de um braço. Certamente, o batedor sylph típico não busca usar o que aprende para o mal, mas em vez disso avisa outros de perigos ainda não realizados ou se prepara para uma tarefa perigosa.",
    "sections": []
  },
  "creature-undine-hydromancer": {
    "description": "Undines são infundidos com água elemental — o poder revolto das profundezas salgadas flui por elas. Esses filhos planares são muitas vezes atléticos e ágeis, mas se distraem facilmente com sensações auditivas por causa de quão mais alto e claro o som ressoa acima das ondas.\n\nUndines são talvez os geniekin mais estabelecidos, muitas vezes formando comunidades ao longo da costa ou até sobre a própria água. No último caso, preferem se estabelecer em cidades-navio que às vezes contam com dezenas de embarcações de todas as formas e tamanhos. Os undines que povoam essas comunidades são igualmente diversos, trazendo aspectos de múltiplas culturas juntos para formar um todo. Cidades-navio são permanentes, mas fluidas — crescem, recuam e migram constantemente conforme famílias undine acrescentam seus navios à ou os removem da flotilha. Uma cidade undine assim pode permanecer no mar por anos, seus residentes vindo à terra apenas em raras ocasiões para coletar madeira para fogueiras de cozinha ou reparar seus lares. A permanência paradoxalmente mutável dessas comunidades reflete as virtudes undine de adaptabilidade e liberdade, mantendo também a importância primordial da comunidade.\n\nHidromantes undine são bastante valorizados nesses assentamentos flutuantes para proteger residentes dos perigos das marés. Até hidromantes novatos fornecem um serviço crucial com sua habilidade de criar água doce potável enquanto à deriva no mar.",
    "sections": []
  },
  "creature-vanara-disciple": {
    "description": "Muitos vanaras jovens viajam, tanto para ver o mundo quanto para buscar um caminho que possa levar à iluminação.",
    "sections": []
  },
  "creature-wayang-whisperblade": {
    "description": "Alguns wayangs usam suas conexões com sombras para superar seus inimigos em combate.",
    "sections": []
  },
  "creature-jotunborn-sage": {
    "description": "Na sociedade jotunborn, sábios são guardiões do conhecimento. Mantêm histórias de seus clãs ou civilizações inteiras. Suas tramas tendem a aparecer ao longo de olhos e ouvidos, representando suas habilidades observacionais e o conhecimento que retêm.",
    "sections": []
  },
  "creature-kitsune-trickster": {
    "description": "Com magia menor e habilidades de metamorfose, esses trapaceiros adoram pregar pegadinhas em geral inofensivas para seu próprio divertimento.",
    "sections": []
  },
  "creature-munavri-spellblade": {
    "description": "Embora as Darklands subterrâneas sejam conhecidas pelas civilizações cruéis e dominadoras lideradas por povos adoradores de fiends que habitam aquelas cavernas sinistras, nem toda sociedade subterrânea é governada dessa forma. Munavris são talvez o melhor exemplo de um povo que tende a tratar novos visitantes em seus territórios das Darklands com bom humor, justiça e respeito.\n\nEsses humanoides são descendentes de humanos que sobreviveram ao cataclismo apocalíptico chamado Queda da Terra — marinheiros que foram raptados por alghollthus e arrastados pelas profundezas oceânicas até emergirem do outro lado do assoalho marinho, em meio ao Mar Cego no reino sem luz de Orv.\n\nGradualmente, os corpos dos munavris se adaptaram a seu novo lar: começaram a demonstrar poderes telecinéticos e desenvolveram visão altamente sensível e belos crescimentos cristalinos ao longo da pele, que se diz representar suas habilidades psíquicas. Esses munavris primitivos eventualmente se estabeleceram num arquipélago misterioso de ilhas de jade — formações verdes místicas que pareciam ressoar com estranhas e poderosas energias psíquicas que repeliam seus captores alghollthu. A salvo de seus raptores e nutridos pelos estranhos poderes de suas ilhas de jade, munavris permaneceram livres para aprimorar suas habilidades telecinéticas em substancial proeza psíquica.\n\nTodo munavri tem a habilidade de concentrar energia psíquica sobre um objeto e imediatamente discernir o que é e como usá-lo da melhor forma. Tal intuição natural incrível não vem facilmente, porém. Usar esse poder exige que munavris gastem grande parte de sua energia psíquica limitada, e o sono é a única forma de reabastecer esse poço psíquico. Hoje, quase todos os munavris ainda habitam o arquipélago de jade e navegam pelas águas do Mar Cego. Sua cultura predominante promove nobreza tanto de feito quanto de coração, e muitos munavris dedicam suas vidas a travar guerra contra aqueles que semeiam discórdia nas Darklands.",
    "sections": []
  },
  "creature-nagaji-soldier": {
    "description": "A maioria dos guerreiros nagaji está conectada a um templo, seja uma rede religiosa nacional ou um único sítio sagrado, dependendo de onde residem.",
    "sections": []
  },
  "creature-strix-kinmate": {
    "description": "Kinmates carregam um forte vínculo uns com os outros e se destacam em trabalho em equipe.",
    "sections": []
  },
  "creature-aphorite-sharpshooter": {
    "description": "Os habitantes da Cidade Eterna de Axis forjaram os aforitas para servir de emissários, agentes e facilitadores, com um pé na ordem sublime e perfeita e outro no lodo confuso, turvo e bagunçado do Universo. Com o tempo, aforitas espalharam-se pelo comprimento e largura de Golarion. Hoje, podem ser encontrados em qualquer canto de qualquer terra, e só uma fração ainda serve Axis diretamente.\n\nAforitas, como todos os nefilins, destacam-se de forma bem vívida entre os demais mortais, ostentando pele metálica, uma leve cobertura de poeira cristalina, um redemoinho de símbolos matemáticos ou traços perfeitamente simétricos. Muitos aforitas pensam de forma lógica e acham satisfação em carreiras que lidam com números e informação. Muitas vezes isso os leva a se tornarem contadores, escriturários ou arquitetos, mas alguns viram engenheiros militares ou atiradores de elite. Outros são atraídos à arte da produção, tornando-se ferreiros, carpinteiros, engenheiros, arquitetos, alfaiates, pedreiros ou outros artesãos. Mas, independentemente da carreira, aforitas muitas vezes sentem o impulso de mexer e improvisar, e invenções aforitas atraem zombaria e apreço na mesma medida.\n\nAforitas que trabalham em profissões menos acadêmicas, como mercenários ou operários, às vezes escondem a inteligência analítica aguçada sob modos extravagantes e chapéus espalhafatosos. Alguns elaboram até esses disfarces com a mesma profundidade e complexidade que dedicam a outros aspectos da vida, considerando cada tique teatral com cuidado e planejando cada detalhe.",
    "sections": [
      {
        "id": "aphorite-gear",
        "title": "Equipamento Aforita",
        "body": "Devido à propensão a mexer e improvisar, muitos soldados e mercenários aforitas carregam armas estranhas ou improváveis — como bestas com miras de precisão, lâminas requintadamente equilibradas ou aljavas particionadas com flechas para cada ocasião. Forasteiros muitas vezes expressam ceticismo sobre essas armas, mas ninguém pode negar a eficácia."
      }
    ]
  },
  "creature-ganzi-martial-artist": {
    "description": "Filhos do caos primordial, ganzis entrelaçam o pandemônio fervilhante do Maelstrom com o tumulto mais mundano da vida mortal. Alguns surgem em linhagens tocadas por criaturas do Maelstrom em gerações anteriores; outros são mudados pelo atrito planar que ferve nas margens da criação, mas todos compartilham a essência da anarquia no sangue e nos ossos.\n\nDevido à conexão com o Maelstrom, ganzis variam enormemente na aparência; os parentes de proteanos mais comuns têm manchas de escamas e penas e caudas travessas e sinuosas. Outros podem ter traços mais estranhos, como chifres, olhos laranja brilhantes ou membros cintilando com auras inofensivas de energia entrópica. Ganzis podem ser dramaticamente mais baixos, altos, magros ou robustos do que é típico da ancestralidade, e não é incomum serem confundidos com nefilins mais comuns.\n\nIndependentes ao extremo, muitas vezes criativos e caprichosos, ganzis preferem profissões que lhes permitam ser os próprios mestres. Se tal profissão dá a um ganzi oportunidade de desnortear ou confundir os cidadãos mais sisudos de Golarion, tanto melhor. Ganzis frequentemente ganham reputação de expansivos, desviantes ou sedentos de emoção, e muitos abraçam de coração essas reputações e as exageram. De todos os descendentes planares, ganzis estão entre os mais propensos a adotar a vida de andarilhos.\n\nGanzis com gosto por combate corpo a corpo às vezes são atraídos às artes marciais, transformando as formas curiosas em armas potentes e inesperadas. É comum achar tais ganzis no emprego temporário de outros, seja por ideologia genuinamente compartilhada ou simplesmente pela necessidade de dinheiro. Com igual frequência, porém, pode-se simplesmente achar um artista marcial ganzi demonstrando o ofício numa esquina ou aplicando justiça a executores de leis cruéis.",
    "sections": [
      {
        "id": "ganzi-martial-arts",
        "title": "Artes Marciais Ganzi",
        "body": "Artistas marciais ganzis muitas vezes são atraídos a estilos que enfatizam acrobacia, mobilidade, flexibilidade ou arte. Os ganzis de Arcadia são particularmente famosos por um estilo semelhante a dança — raramente compartilhado com forasteiros — que enfatiza movimento fluido sobre posicionamento rígido e comumente emprega manobras como chutes invertidos e golpes de perna em varredura."
      }
    ]
  },
  "creature-hellbound-attorney": {
    "description": "A advogada condenada buscou a assistência de um fistófilo — um dos diabos de contrato do Inferno — para reforçar a habilidade legalista no Universo.",
    "sections": []
  },
  "creature-strix-aerialist": {
    "description": "Os acrobatas aéreos strix são acrobatas talentosos.",
    "sections": []
  },
  "creature-vishkanya-infiltrator": {
    "description": "Essas vishkanyas conseguem fundir-se à multidão e entrar e sair de lugares que de outro modo estariam interditados.",
    "sections": []
  },
  "creature-harakasura": {
    "description": "Harakasuras aparecem como duas figuras intrínsecamente entrelaçadas, movendo-se em completo uníssono. Na verdade, são um único ser com o coração e as vontades partidos, alternando entre virtude e ruína desafiadora dos deuses. Harakasuras são acima de tudo seres de bondade e caridade, e no entanto cada ato bondoso que buscam realizar só enfatiza a natureza quebrada do mundo — pois se a todos fosse dado o que precisam, a caridade nunca seria necessária. Harakasuras assim se autodenominam ladrões e saqueadores, roubando de um canto do mundo para dar a outro, rasgados entre a lealdade de ajudar as pessoas e o desespero de uma existência horrenda em que as pessoas não conseguem sobreviver sem sua ajuda.",
    "sections": []
  },
  "creature-ozthoom-shadow-double": {
    "description": "Ozthooms são assassinos sombrios que servem criaturas fey poderosas ou até os Primogênitos — os semideuses do Primeiro Mundo. Em meio às cortes dos Primogênitos ou de outros governantes fey poderosos, esses assassinos sinistros espreitam no alto enquanto aguardam o chamado à ação — ameaças implícitas semelhantes a armas mortais penduradas como decoração num salão real. Ozthooms nunca falam em voz alta; quando sentem necessidade de comunicar-se, fazem-no num sussurro telepático direto na mente da vítima. Embora o corpo de um ozthoom seja um material estranho e carnoso, as garras mortais e as asas cruelmente ganchudas são feitas de ferro frio afiado como navalha, uma qualidade que os torna muito temidos entre outros fey. Um ozthoom típico tem 3 m de altura e envergadura de 2,4 m, mas pesa menos de 36 kg.\n\nEmbora a maioria dos ozthooms sirva mestres poderosos, alguns desses fey assassinos foram deixados à própria sorte e não servem senão os próprios caprichos volúveis. Em alguns casos, o mestre foi morto; em outros, o ozthoom foi dispensado do serviço por qualquer número de razões. Um ozthoom deixado a indulgir os desejos cruéis sem freio é muitas vezes o ozthoom mais perigoso de todos.",
    "sections": []
  },
  "creature-ravener-husk": {
    "description": "Raveners exigem uma dieta constante de almas, e um ravener incapaz de se alimentar por tempo demais eventualmente canibaliza a própria alma. Se a guarda da alma de um ravener for reduzida a 0 PV pela fome enquanto o ravener tiver mais de 1 PV (ver Guarda da Alma), ele perde todos os vestígios da identidade anterior (perdendo a maioria dos traços únicos, inclusive o que combinava com a tradição anterior) e desce a um estado feral, quase sem mente. Mesmo que uma casca de ravener consuma energia de alma depois, a transformação só pode ser revertida via Banquete Voraz.",
    "sections": []
  },
  "creature-ravener": {
    "description": "O ravener apresentado aqui já foi um dragão de cinzas ancião.",
    "sections": [
      {
        "id": "ravener-spellcasters",
        "title": "Conjuradores Ravener",
        "body": "Em vez de ganhar a habilidade críticos cruéis, um ravener conjurador ganha proeza adicional de conjuração. Ao criar o próprio ravener conjurador, dê-lhe a habilidade de conjuração de um conjurador cerca de 2 níveis acima de um dragão conjurador normal de seu tipo. Isso em geral significa que, se o dragão original tinha duas magias preparadas do círculo mais alto, você deve acrescentar mais uma magia daquele círculo e então duas magias do círculo seguinte; se tinha três magias preparadas do círculo mais alto, acrescente três magias do círculo seguinte (se aplicável, acrescente só uma magia de 10º círculo). De qualquer forma, aumente o círculo dos truques em 1.\n\nSe o ravener for excepcionalmente jovem, você talvez possa usar magias da barra lateral de conjuradores do dragão relevante, mas para um dragão ancião típico, considere as magias a seguir para preencher os novos espaços, dependendo de que círculo precisar. Como sempre, as magias de um ravener conjurador devem vir da mesma tradição do dragão original.\n**10º** _manifestação_; **9º** _massacre_, _apoderar-se da alma_, _exigência telepática_; **8º** _desaparecimento_, _mente oculta_, _encrencamento_; **7º** _égide de energia_, _executar_, _riposte de magia_"
      }
    ]
  },
  "creature-sportlebore": {
    "description": "Um sportlebore se esconde no meio da comida de um prato ou dentro de um pacote de ração de trilha.",
    "sections": []
  },
  "creature-cinder-dragon-young": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-cinder-dragon-adult": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-cinder-dragon-ancient": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-coral-dragon-young": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-coral-dragon-adult": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-coral-dragon-ancient": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-despair-dragon-young": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-despair-dragon-adult": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-despair-dragon-ancient": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-phase-dragon-young": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-phase-dragon-adult": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-phase-dragon-ancient": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-requiem-dragon-young": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-requiem-dragon-adult": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-requiem-dragon-ancient": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-resurrection-dragon-young": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-resurrection-dragon-adult": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-resurrection-dragon-ancient": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-rune-dragon-young": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-rune-dragon-adult": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-rune-dragon-ancient": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-whisper-dragon-young": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-whisper-dragon-adult": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-whisper-dragon-ancient": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-skeletal-titan": {
    "description": "Só os poderosos e os tolos ergueriam os ossos de um titã poderoso ou criatura igualmente gargantuesca como esqueleto. Praticantes hábeis veem isso como desperdício de um corpo poderoso e, em vez disso, imbuem-nos com magia que lhes permite voar. Os sábios sabem que é quase impossível controlar tal colosso e que é tão provável esmagar o criador sob o pé poderoso quanto fulminar os inimigos dele.",
    "sections": []
  },
  "creature-elysian-titan": {
    "description": "Os titãs que permaneceram fiéis aos criadores, recusando-se a participar da rebelião dos pares, ganharam a liberdade enquanto os outros foram aprisionados. Muitos titãs elísios treinam aspirantes a campeões da liberdade, do sacrifício e do desprendimento.",
    "sections": []
  },
  "creature-thanatotic-titan": {
    "description": "Titãs tanatóticos serviram de assassinos na guerra contra as divindades. Aprenderam a cortar as conexões divinas dos alvos, assassinando sacerdotes mortais e arautos divinos. Foram trancados nas Fendas Exteriores, mas alguns se libertaram e saíram das Fendas para continuar as ondas de assassinato e caos. Mantêm a devoção ao propósito e um rancor, e até hoje buscam os fiéis para o massacre.",
    "sections": []
  },
  "creature-danava-titan": {
    "description": "Titãs danavas um dia regularam as forças fundamentais que moldaram a realidade. Repreendidos pelos deuses por serem supervisores duros e inflexíveis, esses titãs rejeitados uniram-se aos irmãos na guerra fracassada contra os criadores. Derrotados, os danavas foram lançados às profundezas paralisantes dos mares do cosmos. Os poucos titãs danavas que escaparam agora empunham o frio, a escuridão e a pressão esmagadora das prisões em busca das visões antigas de realidade. Danavas fendem montanhas, despertam bestas primordiais ou arrasam civilizações inteiras de acordo com desenhos grandiosos forjados na aurora do tempo. Outros caçam e colhem os aeons que impõem o equilíbrio, a quem veem como usurpadores da responsabilidade divina.",
    "sections": [
      {
        "id": "danava-pillars",
        "title": "Pilares Danava",
        "body": "Alguns danavas, conhecidos como pilares danava, são custódios de um conceito fundamental como vida ou conhecimento — cada um, um cerne do universo. Destruir um pilar danava rasga à força os vínculos e arrisca desfazer uma porção da realidade, com efeitos potencialmente desastrosos."
      }
    ]
  },
  "creature-hekatonkheires-titan": {
    "description": "Os três primeiros hecatonquiros deveriam guardar os portões das Fendas Exteriores, mas provaram-se aterradores e rebeldes demais — e assim, com nojo, os deuses os lançaram aos abismos entre os planos. Titãs hecatonquiros são progênie incompleta e monstruosa dos três originais, dos quais esses titãs se desprenderam como icebergs.\n\nHecatonquiros empunham a escuridão interestelar como arma e desprezam os limites da realidade física, literalmente alcançando através do espaço com os braços incontáveis. Tomados pelo impulso de descobrir a identidade perdida ou criar uma nova, destripam metafisicamente seres antigos e magias cósmicas, usando as entranhas para achar pistas da própria natureza e parentesco ou como matéria-prima para alimentar alguma apoteose alienígena.",
    "sections": [
      {
        "id": "hekatonkheires-anatomy",
        "title": "Anatomia de Hecatonquiros",
        "body": "Artesãos com habilidade excepcional podem colher os ossos negros de um hecatonquiros antes que se dissolvam na morte do titã. Esses ossos podem ser forjados em armas que mudam de forma ou refinados em chaves planares que permitem viagem a planos esotéricos."
      }
    ]
  },
  "creature-soulrider-celestial": {
    "description": "Embora soulriders possam crescer bastante, a maioria é de criaturas estreitas com só alguns palmos de comprimento. Mesmo depois de se fixarem a uma alma e passarem entre planos, precisam completar a adaptação ao novo ambiente antes de começar a crescer.\n\nEsses soulriders menores podem ser achados em qualquer lugar do Universo mortal com um portal para a Esfera Externa ou um histórico de magia de convocação. Grandes ninhadas de crias no ermo muitas vezes são ceifadas por predadores naturais, mas crias individuais podem sobreviver anos e viajar muitos quilômetros enquanto buscam um hospedeiro.",
    "sections": []
  },
  "creature-soulrider-fiend": {
    "description": "Embora soulriders possam crescer bastante, a maioria é de criaturas estreitas com só alguns palmos de comprimento. Mesmo depois de se fixarem a uma alma e passarem entre planos, precisam completar a adaptação ao novo ambiente antes de começar a crescer.\n\nEsses soulriders menores podem ser achados em qualquer lugar do Universo mortal com um portal para a Esfera Externa ou um histórico de magia de convocação. Grandes ninhadas de crias no ermo muitas vezes são ceifadas por predadores naturais, mas crias individuais podem sobreviver anos e viajar muitos quilômetros enquanto buscam um hospedeiro.",
    "sections": []
  },
  "creature-soulrider-monitor": {
    "description": "Embora soulriders possam crescer bastante, a maioria é de criaturas estreitas com só alguns palmos de comprimento. Mesmo depois de se fixarem a uma alma e passarem entre planos, precisam completar a adaptação ao novo ambiente antes de começar a crescer.\n\nEsses soulriders menores podem ser achados em qualquer lugar do Universo mortal com um portal para a Esfera Externa ou um histórico de magia de convocação. Grandes ninhadas de crias no ermo muitas vezes são ceifadas por predadores naturais, mas crias individuais podem sobreviver anos e viajar muitos quilômetros enquanto buscam um hospedeiro.",
    "sections": []
  },
  "creature-spawning-soulrider-celestial": {
    "description": "Quando soulriders absorvem energia planar suficiente, ficam grávidos de incontáveis ovos minúsculos. Tais soulriders voltam por instinto ao Universo via as Estradas Mortas para depositar as crias, embora o processo metafísico exato ainda não seja plenamente compreendido. Infernais e outros ávidos por entrar no mundo mortal começaram a capturar e estudar soulriders geradores, embora tais experimentos tragam riscos próprios, pois soulriders impedidos de voltar ao Universo continuam a crescer à medida que absorvem mais energia.\n\nDe volta ao Universo, soulriders geradores tornam-se ferozmente protetores dos ovos quase translúcidos e das crias minúsculas, usando as bocas semelhantes a rêmora para afastar ameaças. Quem perturba um soulrider no processo de gerar pode descobrir como é ter pedaços da alma arrancados.\n\nSoulriders geradores ganham uma habilidade adicional baseada na adaptação planar. Soulriders com os traços sagrado e celestial ganham Labareda Celestial. Soulriders com os traços infernal e profano ganham Estocada Infernal. Soulriders com o traço monitor ganham Fuga de Monitor. Soulriders que seguiram uma alma a um plano mais esotérico têm habilidades diferentes a critério do MJ, mas tais criaturas são incomuns.",
    "sections": []
  },
  "creature-spawning-soulrider-fiend": {
    "description": "Quando soulriders absorvem energia planar suficiente, ficam grávidos de incontáveis ovos minúsculos. Tais soulriders voltam por instinto ao Universo via as Estradas Mortas para depositar as crias, embora o processo metafísico exato ainda não seja plenamente compreendido. Infernais e outros ávidos por entrar no mundo mortal começaram a capturar e estudar soulriders geradores, embora tais experimentos tragam riscos próprios, pois soulriders impedidos de voltar ao Universo continuam a crescer à medida que absorvem mais energia.\n\nDe volta ao Universo, soulriders geradores tornam-se ferozmente protetores dos ovos quase translúcidos e das crias minúsculas, usando as bocas semelhantes a rêmora para afastar ameaças. Quem perturba um soulrider no processo de gerar pode descobrir como é ter pedaços da alma arrancados.\n\nSoulriders geradores ganham uma habilidade adicional baseada na adaptação planar. Soulriders com os traços sagrado e celestial ganham Labareda Celestial. Soulriders com os traços infernal e profano ganham Estocada Infernal. Soulriders com o traço monitor ganham Fuga de Monitor. Soulriders que seguiram uma alma a um plano mais esotérico têm habilidades diferentes a critério do MJ, mas tais criaturas são incomuns.",
    "sections": []
  },
  "creature-spawning-soulrider-monitor": {
    "description": "Quando soulriders absorvem energia planar suficiente, ficam grávidos de incontáveis ovos minúsculos. Tais soulriders voltam por instinto ao Universo via as Estradas Mortas para depositar as crias, embora o processo metafísico exato ainda não seja plenamente compreendido. Infernais e outros ávidos por entrar no mundo mortal começaram a capturar e estudar soulriders geradores, embora tais experimentos tragam riscos próprios, pois soulriders impedidos de voltar ao Universo continuam a crescer à medida que absorvem mais energia.\n\nDe volta ao Universo, soulriders geradores tornam-se ferozmente protetores dos ovos quase translúcidos e das crias minúsculas, usando as bocas semelhantes a rêmora para afastar ameaças. Quem perturba um soulrider no processo de gerar pode descobrir como é ter pedaços da alma arrancados.\n\nSoulriders geradores ganham uma habilidade adicional baseada na adaptação planar. Soulriders com os traços sagrado e celestial ganham Labareda Celestial. Soulriders com os traços infernal e profano ganham Estocada Infernal. Soulriders com o traço monitor ganham Fuga de Monitor. Soulriders que seguiram uma alma a um plano mais esotérico têm habilidades diferentes a critério do MJ, mas tais criaturas são incomuns.",
    "sections": []
  },
  "creature-shade-abaddon": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-astral-plane": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-axis": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-boneyard": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-universe": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-cinder-dragon-young-spellcaster": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-cinder-dragon-adult-spellcaster": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-cinder-dragon-ancient-spellcaster": {
    "description": "Entre os maiores e mais ferozes dragões, dragões de cinzas são em geral voláteis, exigindo respeito — até deferência — de criaturas menores. A aparência dos dragões de cinzas evoca a chama, muitas vezes em escamas com padrões mistos de vermelho, laranja e amarelo. Muitos habitam vulcões ativos e locais igualmente ígneos. Preferem tesouros que suportem o calor dos corpos e covis, com gemas, ouro e prata comuns entre os tesouros.",
    "sections": []
  },
  "creature-coral-dragon-young-spellcaster": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-coral-dragon-adult-spellcaster": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-coral-dragon-ancient-spellcaster": {
    "description": "Dragões de coral são os guardiões primais dos vastos recifes de coral vivos achados em oceanos por Golarion. Mesmo para padrões dracônicos, destacam-se pela arrogância e vaidade, ostentando orgulho desmedido nas cores vibrantes das próprias escamas incrustadas de coral e no esplendor deslumbrante dos recifes que protegem. Gostam de decorar os recifes, que encaram como covis, com objetos de beleza, salpicados de alguma coisa de valor como moedas. Quem busca o favor de um dragão de coral muitas vezes o acha facilmente persuadido pela lisonja, sobretudo quando acompanhada de presentes brilhantes ou coloridos que complementam a beleza cintilante do dragão e do domínio submarino.",
    "sections": []
  },
  "creature-despair-dragon-young-spellcaster": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-despair-dragon-adult-spellcaster": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-despair-dragon-ancient-spellcaster": {
    "description": "O medo é uma das emoções mais poderosas, e dragões do desespero são mestres em canalizar esses sentimentos de terror e desesperança em benefício próprio. Como outros dragões ocultos, são movidos por uma compulsão inata — no caso deles, o desejo de aterrorizar os outros. Tendem a instalar-se perto de povoados, para ter uma fonte de medo da qual se alimentar. Os itens mais comuns nos tesouros de dragões do desespero são pergaminhos, tomos e relíquias que servem de material de pesquisa. Por meio deles, aprendem o folclore local, lendas urbanas e mais para assombrar melhor os alvos.",
    "sections": []
  },
  "creature-phase-dragon-young-spellcaster": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-phase-dragon-adult-spellcaster": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-phase-dragon-ancient-spellcaster": {
    "description": "Nenhum lugar contém um dragão de fase ou sequer prende o interesse por muito tempo; a conexão arcana inata os liga à magia de teletransporte e reposicionamento. Exploradores e eruditos, dragões de fase movem-se à vontade, descobrindo novos locais e os segredos arcanos do teletransporte. Frequentemente estabelecem múltiplos covis em lugares distantes que visitam de novo. Além da riqueza típica dos covis, tendem a guardar itens de valor sentimental das viagens, como uma flor particularmente rara da região ou uma peça de um artista local.",
    "sections": []
  },
  "creature-requiem-dragon-young-spellcaster": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-requiem-dragon-adult-spellcaster": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-requiem-dragon-ancient-spellcaster": {
    "description": "Dragões do réquiem são mordomos do Rio das Almas e do processo pelo qual as almas alcançam o destino final na vida após a morte. A jornada segura de uma alma é da máxima importância para um dragão do réquiem, e alguns seguem almas individuais desde a primeira entrada no rio até o julgamento no Cemitério e, por fim, até o descanso último. A maioria se liga a planos específicos e pastoreia quaisquer almas destinadas àquele plano, levando a dragões ligados a lugares como o Céu ou o Inferno, embora esses dragões nunca jurem lealdade verdadeira a esses planos. Enchem os covis ao longo do Rio das Almas — colagens de arquitetura sombria resgatada de outros planos — com registros inestimáveis e lembranças de grandes feitos.",
    "sections": []
  },
  "creature-resurrection-dragon-young-spellcaster": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-resurrection-dragon-adult-spellcaster": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-resurrection-dragon-ancient-spellcaster": {
    "description": "Dragões da ressurreição oscilam entre vida e morte. Têm maestria das energias vitais, permitindo restaurar a vida aos mortos, e maestria das energias de vazio, para conceder a morte a outros. Usam as habilidades para brincar com as vidas dos mortais, chamando espíritos para auxiliá-los ou revivendo criaturas que acham importantes ou interessantes. O covil de um dragão da ressurreição em geral é um lugar árido. Embora ainda acumulem riqueza como outros dragões, pouco fazem para decorar os covis, e tesouros em geral ficam em nichos escuros, como se o dragão pouco se importasse com as posses. Tendem, porém, a tomar lembranças daqueles que ressuscitam ou planejam ressuscitar, e estes são guardados com particular segurança.",
    "sections": []
  },
  "creature-rune-dragon-young-spellcaster": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-rune-dragon-adult-spellcaster": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-rune-dragon-ancient-spellcaster": {
    "description": "Dragões das runas têm compreensão inato sobre o poder das runas. A maioria mantém uma variedade de runas gravadas nas escamas, que o corpo pode empoderar magicamente. Em geral não lançam magias, em vez disso confiando na habilidade de criar runas na hora para produzir os efeitos desejados. Um dragão das runas muitas vezes chama o tesouro de biblioteca, pois está cheio de textos históricos importantes, peças, discursos, livros didáticos e grimórios escritos por povos de culturas diferentes numa variedade de idiomas. Embora muitas vezes possam falar um idioma com o auxílio de magia, preferem de longe aprender idiomas no contexto de quem os fala, para captar as nuances escondidas na sintaxe e a magia dentro dos símbolos.",
    "sections": []
  },
  "creature-whisper-dragon-young-spellcaster": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-whisper-dragon-adult-spellcaster": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-whisper-dragon-ancient-spellcaster": {
    "description": "Dragões do sussurro são colecionadores ávidos de rumores e segredos que passam séculos aprimorando redes de informação e relacionamentos. Em geral não o fazem com a intenção de usar a informação contra os outros ou para as próprias maquinações, mas simplesmente porque o processo de aprender e reunir informação é gratificante. Os tesouros são esparsos comparados aos de outros dragões, pois guardam os verdadeiros tesouros — segredos — na mente.",
    "sections": []
  },
  "creature-clockwork-dragon": {
    "description": "Dragões-relógio são maravilhas do desenho de corda. Essas obras-primas poderosas têm a habilidade de voar, tornando-os assassinos versáteis e perigosos. O mecanismo de corda de um dragão-relógio é mais eficiente que o de outros autômatos, permitindo reutilizar parcialmente a energia gerada ao bater as asas. Criar um dragão-relógio exige não só compreensão avançada de desenho de corda, mas também um estoque maior de recursos raros, pois o corpo precisa de reforço sólido. Como resultado, a maioria dos dragões-relógio tem fortificação de adamantina. Criar um dragão-relógio sem adamantina é inteiramente possível, embora tais dragões em geral sejam menores e mais frágeis.",
    "sections": []
  },
  "creature-zombie-dragon": {
    "description": "A casca apodrecida de um dragão outrora grandioso, esta abominação perdeu todo o esplendor anterior, mas nenhuma da ferocidade. As asas remendadas e podres não geram sustentação o bastante para mantê-lo no ar, mas as energias necromânticas vis que o animam ainda permitem voar, embora devagar.",
    "sections": [
      {
        "id": "hoarding-instincts",
        "title": "Instintos de Tesouro",
        "body": "Embora zumbis não tenham uso para riqueza — de fato, a maioria nem compreende o conceito —, dragões zumbis retêm um vestígio da tendência inata de acumular. Um cadáver mais fresco pode guardar o tesouro que reuniu em vida (ou o que resta dele), enquanto um dragão zumbi mais distante da vida pode acumular ossos, pedras, cadáveres ou outros objetos incomuns. O valor monetário desses tesouros varia bastante."
      }
    ]
  },
  "creature-dragonblood-occultist": {
    "description": "O ocultista sangue-de-dragão extrai poder do benfeitor dragão do agouro. Essa conexão oculta permite ao ocultista perceber vislumbres do futuro próximo.",
    "sections": [
      {
        "id": "dragonbloods-of-xa-hoi",
        "title": "Sangue-de-dragão de Xa Hoi",
        "body": "Há muito tempo, as facções em guerra do que viria a ser a nação de Xa Hoi, em Tian Xia, juraram fidelidade aos dragões soberanos da região em troca de proteção. Desde então, Xa Hoi é governada pelos descendentes desses dragões. Os cidadãos estão acostumados à prevalência do dragão soberano por toda a nação e consideram evidência física da influência dos dragões na prole uma bênção desejada. Feiticeiros com a linhagem dracônica e indivíduos sangue-de-dragão muitas vezes são tidos em alta estima e espera-se que façam grandes coisas."
      }
    ]
  },
  "creature-giant-dragonfly": {
    "description": "Esses insetos zumbidores têm o tamanho de um cavalo pequeno. São predadores de emboscada que caçam bestas e humanoides igualmente, capazes de usar acrobacia aérea impressionante para mergulhar de cima e arrebatar a presa.",
    "sections": []
  },
  "creature-giant-dragonfly-nymph": {
    "description": "A prole aquática e sem asas das libélulas chama-se ninfa de libélula. Ninfas de libélula gigante podem ter vários palmos de comprimento e caçam sobretudo em águas rasas, comendo carniça e emboscando criaturas vivas junto com os pares já crescidos. Não se intimidam com criaturas maiores, compelidas pelo instinto de comer o máximo possível para sustentar o crescimento.",
    "sections": []
  },
  "creature-shade-creations-forge": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-dead-vault": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-dreamlands": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-elysium": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-ethereal-plane": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-heaven": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-hell": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-maelstrom": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-netherworld": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-nirvana": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-outer-rifts": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-air": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-earth": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-fire": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-metal": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-water": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  },
  "creature-shade-plane-of-wood": {
    "description": "Quando um mortal morre, a alma viaja ao Cemitério nos Planos Exteriores, onde é julgada por Pharasma, deusa dos mortos. Uma vez julgada, a alma segue para a recompensa ou punição final e, no processo, transforma-se numa criatura conhecida como sombra. Essa transformação concede à alma um corpo novo, cuja forma é determinada pelas forças filosóficas predominantes do plano para o qual é enviada. As memórias da vida anterior da sombra em geral se apagam, reduzidas a alguns fragmentos enevoados semelhantes a sonhos pela metade. Independentemente do tamanho, poder ou natureza em vida, a sombra é uma criatura Média na vida após a morte.\n\nA existência como sombra pode durar éons, mas não é necessariamente eterna. Divindades, habitantes poderosos do Grande Além ou até os Planos Exteriores podem alterar ainda mais a natureza de uma sombra, seja reduzindo-a a quintessência bruta — essência espiritual então usada para expandir a manifestação física de um plano — ou transformando-a numa nova forma de vida sobrenatural, como um celestial, monitor ou infernal. Se uma sombra morrer, o corpo se decompõe num processo semelhante à decomposição, a forma revertendo aos elementos que compõem o plano. Isso representa o fim verdadeiro da jornada de uma alma — a essência vital reunindo-se ao coração do Grande Além para ser reciclada na Forja da Criação, alimentando a criação de novas almas.",
    "sections": [
      {
        "id": "first-world-shades",
        "title": "Sombras do Primeiro Mundo",
        "body": "Uma alma enviada ao Primeiro Mundo não se torna uma sombra. Em vez disso, reencarna imediatamente numa criatura fey cujo temperamento e papel combinam com as personalidades mortais. Esse processo tende a deixar almas que encarnam no Primeiro Mundo com um pouco mais de memórias do que a maioria das sombras, ainda assim não o bastante para que lembrem quem foram."
      },
      {
        "id": "other-shades",
        "title": "Outras Sombras",
        "body": "Cada plano (salvo o Vazio) tem a própria categoria de sombra, mas nem todo plano presente no cenário de Pathfinder está listado aqui. Planos de sua própria criação certamente não estão representados! Você pode usar a ampla gama de tipos e descrições aqui como inspiração para criar novas sombras: cada uma precisa de um nome, aparência, idioma, habilidade adicional e ataque. Por exemplo, Desna mantém um demiplano chamado Cynosure que se estende entre o Universo e o Elísio. Sombras ali são conhecidas como os sonhadores escolhidos e aparecem como versões idealizadas e brilhantes dos eus mortais; falam Empíreo, são imunes a confusão e Embotado, e causam dano de concussão com os punhos."
      }
    ]
  }
}

export function applyCreatureLore(creatures: Creature[]): Creature[] {
  return creatures.map((creature) => {
    const lore =
      CREATURE_LORE[creature.id] ??
      CREATURE_LORE_LOST_OMENS[creature.id] ??
      CREATURE_LORE_BATTLECRY[creature.id] ??
      CREATURE_LORE_RAGE_OF_ELEMENTS[creature.id] ??
      CREATURE_LORE_HOWL_OF_THE_WILD[creature.id] ??
      CREATURE_LORE_DRACONIC_CODEX[creature.id] ??
      CREATURE_LORE_SEASON_OF_GHOSTS[creature.id] ??
      CREATURE_LORE_GATEWALKERS[creature.id] ??
      CREATURE_LORE_SEVEN_DOOMS[creature.id] ??
      CREATURE_LORE_WARDENS[creature.id] ??
      CREATURE_LORE_CURTAIN_CALL[creature.id] ??
      CREATURE_LORE_TRIUMPH_TUSK[creature.id] ??
      CREATURE_LORE_SPORE_WAR[creature.id] ??
      CREATURE_LORE_SHADES_OF_BLOOD[creature.id] ??
      CREATURE_LORE_MYTH_RUNELORDS[creature.id] ??
      CREATURE_LORE_HELLBREAKERS[creature.id] ??
      CREATURE_LORE_STANDALONE_FIVE[creature.id] ??
      CREATURE_LORE_HELLS_BASTION[creature.id] ??
      CREATURE_LORE_NPC_CORE[creature.id]
    if (!lore) return creature
    const description = lore.description?.trim() ? lore.description : creature.description
    const loreSections = lore.sections.length > 0 ? lore.sections : creature.loreSections
    return {
      ...creature,
      description,
      loreSections,
    }
  })
}
