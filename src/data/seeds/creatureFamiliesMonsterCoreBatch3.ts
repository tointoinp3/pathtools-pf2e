import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 3 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch3: CreatureFamily[] = [
  fam({
    id: 'family-elemental',
    name: 'Diabrete elemental',
    originalName: 'Elemental, Scamp',
    trait: 'Elemental',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=411',
    intro:
      'Diabretes elementais são bichinhos com jeito de morcego marcados por poderes dos Planos Elementais. Mais poderosos os despacham de casa, ou invocadores novatos os chamam ao Universo. Todos têm um resto de magia da ligação com o plano natal — e usam isso sobretudo para pregar peças.\n\nFormam depressa uma hierarquia de esperteza. Humanoides que encontram um diabrete pela primeira vez costumam deixá-lo confuso; aí começa uma escalada de travessuras para ver até onde pode ir e qual é o lugar dele na ordem.',
    sections: [
      {
        id: 'conjuring-scamps',
        title: 'Conjurando diabretes',
        body: 'Diabretes são alvo favorito de conjuradores de nível baixo para invocar, tanto pelas várias habilidades úteis quanto por serem relativamente fáceis de comandar e manipular. Ainda assim, é preciso cuidado ao usá-los como lacaio: se ficarem sem vigilância ou sem supervisão por tempo demais, causam todo tipo de travessura.',
      },
      {
        id: 'other-scamps',
        title: 'Outros diabretes',
        body: 'Os quatro diabretes apresentados aqui são só os mais comuns do tipo. Diabretes de metal existem no Plano do Metal e diabretes de madeira no Plano da Madeira, embora os de madeira estejam animados para se espalhar pelo Universo do qual ficaram tanto tempo barrados.',
      },
    ],
  }),
  fam({
    id: 'family-tooth-fairy',
    name: 'Fada dos dentes',
    originalName: 'Tooth Fairy',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=477',
    sourcePage: 327,
    intro:
      'Fadas dos dentes nascem quando o dente de uma criança (ou, mais raro, a criança inteira) é enterrado em terreno saturado de energia feérica. Saem do dente como larva de ovo, improvisam um alicate com o que acham e saem caçando mais dentes — com ou sem o consentimento do dono.',
    sections: [
      {
        id: "folk-traditions",
        title: "Tradições populares",
        body: "Fadas dos dentes temem gatos e fogem até de gatinhos recém-nascidos. A antipatia é mútua: todos os gatos caçam e matam fadas dos dentes com gosto.\n\nEm algumas vilas, adultos deixam uma moeda pequena debaixo do travesseiro da criança como suborno para que as fadas não machuquem ninguém da casa — o que às vezes funciona.",
      },
    ],
  }),
  fam({
    id: 'family-horse',
    name: 'Cavalo',
    originalName: 'Horse',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Riding%20Horse',
    intro:
      'Cavalos servem de montaria e besta de carga em muitas sociedades. Fiéis e em geral dóceis, valem ouro para quem precisa viajar longe. Povos menores, como gnomos e halflings, costumam usar pôneis; humanos e outros humanoides Médios preferem cavalos. A maioria que o viajante encontra é domesticada, embora ainda existam manadas grandes no ermo.',
    sections: [
      {
        id: "goblins-and-horses",
        title: "Goblins e cavalos",
        body: "Goblins têm muitas superstições e manias, mas poucas são mais fortes do que o medo e o ódio que sentem de cavalos. Não é via de mão única: cavalos também temem e odeiam goblins, e alguns saem do caminho para ferir um. Um goblin tentando montar quase sempre leva uma saraivada de corcoveios violentos — o cavalo faz de tudo para arremessá-lo ao chão, ao alcance dos cascos.",
      },
    ],
  }),
  fam({
    id: 'family-eagle',
    name: 'Águia',
    originalName: 'Eagle',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Eagle',
    intro:
      'Poucas aves rivalizam a beleza e a graça da águia. Essas rapinas grandes mergulham de alturas incríveis para agarrar peixe e mamífero pequeno nas garras. Aninham no alto de árvores ou em penhascos com vista do entorno.',
    sections: [],
  }),
  fam({
    id: 'family-grindylow',
    name: 'Grindylow',
    originalName: 'Grindylow',
    trait: 'Grindylow',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Grindylow',
    intro:
      'A metade de cima de um grindylow lembra um goblin; da cintura para baixo o corpo se abre num emaranhado de tentáculos com ventosas. Vivem em água rasa, doce ou salgada: lagos, rios, costa e recife. Organizam-se em grupos chamados cardumes, de uns poucos até algumas centenas. Cardumes menores às vezes caem sob o domínio de uma criatura aquática poderosa — aliança que dura até o primeiro desastre, quando os sobreviventes se espalham e formam cardumes novos.',
    sections: [
      {
        id: 'grindylow-squid',
        title: 'Ódio a lulas',
        body: 'Grindylows respeitam predadores marinhos maiores, mas têm ódio especial de lulas (e de qualquer coisa que se pareça com lula). Marinheiros pintam lulas no fundo do casco para afastar ataques. Isso segura cardumes pequenos, mas pode reunir grupos maiores para um assalto coordenado se a rota for previsível. O ódio não se estende a outros tentaculados: para o grindylow, o polvo é o auge da graça e do poder.',
      },
    ],
  }),
  fam({
    id: 'family-fleshwarp',
    name: 'Distorcido de carne',
    originalName: 'Fleshwarp',
    trait: 'Fleshwarp',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=415',
    sourcePage: 152,
    intro:
      'Acidentes mágicos, maldições divinas e tecnologia não testada são capazes de transformar o corpo de forma tão drástica que a criatura deixa de ser da ancestralidade original. Esses seres são raros, e a aparência inquietante costuma provocar horror.\n\nAlguns revelam na degradação total do inimigo derrotado. A técnica foi ensinada a mortais pelo senhor demoníaco Haagenti, e desde então foi aperfeiçoada. Carniceiros da carne torturam rivais em cubas de reagentes mágicos, remodelando carne e psique em coisas horrendas.',
    sections: [
      {
        id: "failed-fleshwarps",
        title: "Distorcidos de carne falhos",
        body: "Nem todo distorcido de carne emerge da cuba capaz de sobreviver. Muitos perecem em minutos, quando órgãos fundamentais para a vida simplesmente falham ou desabam sobre si. Carneiros da carne em geral conseguem reciclar os falhos de volta à mistura depressa o bastante, mas de vez em quando restos conhecidos como dregs de carne ficam estáveis o bastante para viver vidas próprias, atormentadas de dor. Essas criaturas vis muitas vezes infestam os recintos dos carneiros, como ratos ou outra praga em lugares menos horrendos.",
      },
      {
        id: "fleshwarping-centers",
        title: "Centros de distorção de carne",
        body: "Embora a maioria em Golarion nunca encontre um distorcido de carne, há lugares em que são bem mais comuns. Em Nex e nas Terras da Mana, aparecem em comunidades do deserto e em comunas nas entranhas das cidades. Distorcidos conhecidos como “Neathers” vivem sob as cidades de Mendev, descendentes dos primeiros cruzados que sofreram com a energia demoníaca à qual os pais foram expostos.",
      },
    ],
  }),
  fam({
    id: 'family-dwarf',
    name: 'Anão',
    originalName: 'Dwarf',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dwarf%20Warrior',
    intro:
      'A força de um anão vem da determinação estoica, do equipamento de qualidade e da capacidade de guardar rancor por séculos. Entre equipamento bem forjado e coragem natural, um guerreiro anão segura o terreno contra inimigos poderosos. Respeitado, vira aliado para a vida; ofendido, vira espinho no calcanhar até o fim dos dias.',
    sections: [
      {
        id: "clan-memory",
        title: "Memória de clã",
        body: "Anões costumam ter laços fortes com a família e o clã. As rixas dos membros são compartilhadas entre si e através das gerações. A honra dos amigos, porém, também se compartilha do mesmo jeito. Isso às vezes faz um anão ter opinião forte sobre alguém com base nas ações de um parente antigo.",
      },
      {
        id: "dwarven-beards",
        title: "Barbas anãs",
        body: "A ideia de um anão em geral evoca um homem baixo e barbudo, mas a barba não é exclusiva dos homens. Qualquer anão, independentemente do gênero, é capaz de cultivar uma barba impressionante. Nas culturas da superfície, os homens tendem a ser os que mais deixam crescer e cuidam da barba. Entre anões subterrâneos, barbas são mais comuns no geral. Deixar crescer é, no fim, questão de gosto pessoal.",
      },
      {
        id: "rivethun",
        title: "Rivethun",
        body: "A prática conhecida como Rivethun é a forma mais popular de conexão espiritual entre anões. Ensina que espíritos estão em toda parte e que até os deuses são espíritos, embora bem mais altos na hierarquia. Os adeptos aprendem a recorrer a dores do passado para focar a mente e, com esse foco, desbloquear potencial maior. Se esse potencial vem na forma de magia ou de entendimento mais profundo dos espíritos varia de pessoa para pessoa.",
      },
      {
        id: "strata-of-life",
        title: "Estratos da vida",
        body: "Anões tendem a se dividir em três grupos: subterrâneos, das montanhas e da superfície. Cada um vive numa altitude diferente, mas costuma compartilhar traços dentro do próprio estrato. Os subterrâneos tendem a ser mais tradicionalistas, mais ligados às origens anãs antigas. Os das montanhas em geral buscam glória — por habilidade, saber ou proeza em combate. Os da superfície são os mais variados, e suas culturas superam em número as dos outros anões.",
      },
    ],
  }),
  fam({
    id: 'family-lizard',
    name: 'Lagarto',
    originalName: 'Lizard',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=440',
    sourcePage: 224,
    intro:
      'Lagartos variam em aparência e habilidade, mas a maioria divide a forma reptiliana básica: cauda longa, boca larga cheia de dentes e quatro patas. Poucas espécies se movem sobre duas patas por pouco tempo; a maioria é estritamente quadrúpede.',
    sections: [
      {
        id: "lizard-locations",
        title: "Locais de lagarto",
        body: "Lagartos gigantes aparecem em todos os climas temperados ou tropicais, muitas vezes relativamente perto de vilas menores ou regiões rurais, onde podem ser ameaça perigosa a gado ou viajantes. Os dois apresentados aqui tendem a habitar regiões mais quentes — selvas para camaleões gigantes e savanas para megalanias.",
      },
      {
        id: "lizards-and-lizardfolk",
        title: "Lagartos e povo-lagarto",
        body: "Lagartos gigantes muitas vezes são usados como montaria e guarda, ou mantidos como mascotes, mas o mais tradicional é serem criados pelo povo-lagarto. O parentesco que esse povo compartilha com lagartos gigantes é inconfundível: valorizam a companhia a um ponto que iguala ou até supera o que outras sociedades têm por companheiros animais populares como cães e cavalos.",
      },
      {
        id: "other-giant-lizards",
        title: "Outros lagartos gigantes",
        body: "As três espécies de lagarto gigante apresentadas aqui são só as mais comuns encontradas na natureza. Histórias de lagartos bem maiores persistem, incluindo a megalania de 6 metros, uma versão verdadeiramente enorme do monitor gigante capaz de engolir criaturas inteiras. Menos perigoso é o camaleão gigante, embora a capacidade de misturar-se ao entorno o torne uma ameaça bem mais insidiosa e furtiva do que a megalania maciça e lenta.",
      },
    ],
  }),
  fam({
    id: 'family-kholo',
    name: 'Kholo',
    originalName: 'Kholo',
    trait: 'Kholo',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=434',
    sourcePage: 208,
    intro:
      'Kholos são humanoides altos de cabeça de hiena que habitam savanas, campos quentes e colinas áridas. Dividem casa, comida e muitos hábitos com as hienas. Como elas, têm reputação ruim pelo mesmo motivo: riso inquietante, inteligência assustadora e táticas de matilha. Os kholos alimentam o rumor de propósito — guerra psicológica contra o inimigo.',
    sections: [
      {
        id: "kholo-lairs",
        title: "Covis kholo",
        body: "Kholos habitam sobretudo savanas secas e planícies varridas pelo vento. Graças à constituição resistente e ao instinto forte de sobrevivência, têm poucos escrúpulos em estabelecer morada ao ar livre. Muitos montam acampamentos — em geral de toldos e tendas de couro — no alto de colinas inclinadas para melhor vigiar a região em busca de presa. Raramente habitam cavernas ou recintos semelhantes, sabendo que é fácil demais ficar encurralado quando só há uma saída.",
      },
      {
        id: "kholo-packs",
        title: "Matilhas kholo",
        body: "As matilhas kholo mais encontradas são bandidos ou saqueadores em busca de recursos fáceis para pilhar de vítimas desprotegidas. Embora nem todos os kholos sejam oportunistas assim, ainda podem ser vizinhos altamente imprevisíveis. Até kholos que parecem recuar em paz de um encontro com outro grupo podem voltar à noite para armar uma emboscada oportuna. Essas táticas vis são traumáticas o bastante para que kholos sejam muitas vezes desconfiados e desprezados.",
      },
    ],
  }),
  fam({
    id: 'family-hryngar',
    name: 'Hryngar',
    originalName: 'Hryngar',
    trait: 'Hryngar',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=432',
    sourcePage: 202,
    intro:
      'Bem abaixo da superfície, os anões sisudos chamados hryngars teimam no trabalho, reivindicando as terras ancestrais subterrâneas de outros anões. Há muito, líderes hryngar recusaram subir à superfície com os “primos”, abandonando a Busca pelo Céu. Um deus anão exilado, Droskar, ofereceu salvação dos horrores das Terras Sombrias em troca de servidão sem fim. Muitos hryngars acreditam que, trabalhando mais que os irmãos, erguem uma sociedade maior que qualquer coisa sob o sol.',
    sections: [
      {
        id: "hryngar-communities",
        title: "Comunidades hryngar",
        body: "Além dos reinos hryngar em Nar-Voth, comunidades hryngar aparecem bem no subterrâneo, nas ruínas de cidades anãs abandonadas. Gerações de ocupação resultaram na perda da história anã, pois os cinzentos honram a deidade capataz retrabalhando a arte anã tradicional em temas que elevam o deus exilado. Que a sociedade predatória dos hryngars pareça incapaz de alcançar as alturas de arte dominadas pelos ancestrais anões é fonte de frustração sem fim.",
      },
      {
        id: "occult-traditions",
        title: "Tradições ocultas",
        body: "Provavelmente devido ao pacto que os ancestrais firmaram com Droskar, todos os hryngars têm ao menos algumas magias ocultas inatas, a principal delas a capacidade de derramar o sangue de quem os fere. Esse poder desencoraja fortemente retaliação violenta contra hryngars, embora usá-lo contra um superior possa trazer repercussões duras — a menos que a oportunidade seja capitalizada e o hryngar que usou a magia inata prove ser capataz mais capaz.",
      },
    ],
  }),
  fam({
    id: 'family-umbral-gnome',
    name: 'Gnomo umbral',
    originalName: 'Umbral Gnome',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Umbral%20Gnome%20Warrior',
    intro:
      'Gnomos são criativos e curiosos, com cerca de 90 cm e personalidade tão viva quanto o cabelo e os olhos. Têm ligação natural com o lar ancestral, o Primeiro Mundo, e buscam aventura para afastar a Descoloração: quem deixa de sonhar e inovar perde a cor e cai em depressão profunda.',
    sections: [
      {
        id: 'drathnelar',
        title: 'Drathnelar',
        body: 'Um subgrupo notável, os gnomos umbrais, costuma ter pele cinza ou marrom de textura pedregosa e cabelo fino e pálido, ou a cabeça raspada. São mais numerosos nas Terras Sombrias, onde se chamam drathnelar. Muitos atribuem a mudança à deidade gnômica Nivi Rhombodazzle, a primeira da espécie, que desceu às profundezas e ganhou semidivindade ao trocar uma gema com Torag. Nivi é imune à Descoloração; gnomos umbrais muitas vezes também o são, ou resistem a ela. Guerreiros umbrais entram rápido na briga, mas preferem defender parentes e lar a táticas mais agressivas quando há escolha.',
      },
    ],
  }),
  fam({
    id: 'family-reefclaw',
    name: 'Garra-de-recife',
    originalName: 'Reefclaw',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Reefclaw',
    intro:
      'Garras-de-recife são monstros aquáticos que lembram camarões ou lagostas enormes. As pinças desproporcionais apertam como torno e injetam veneno potente. Não falam, mas entendem o idioma local dos humanoides perto do território de caça — às vezes escutam conversa para emboscar, às vezes só pelo entretenimento (gostam de vozes agudas).',
    sections: [
      {
        id: 'reefclaw-death-grip',
        title: 'Aperto até o fim',
        body: 'Uma vez decidida a ação, a garra-de-recife segue até o fim, mesmo que isso a mate. Sobreviventes juram que ela só soltou o aperto depois de o crânio estar aberto — e ainda assim deu um último corte no último suspiro. Na época de acasalamento, as fêmeas são um pouco mais pragmáticas e soltam a presa antes de se pôr em risco.',
      },
    ],
  }),
  fam({
    id: 'family-eel',
    name: 'Enguia',
    originalName: 'Eel',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Electric%20Eel',
    intro:
      'Embora esses peixes longos e estreitos se pareçam, enguias são um grupo diverso. A enguia-elétrica vive em rios e lagos de água doce. Não é particularmente agressiva, mas a capacidade de atordoar predador e presa é perigosa para criaturas maiores em busca de refeição. São mais próximas de bagres do que de outras enguias.',
    sections: [],
  }),
  fam({
    id: 'family-dinosaur',
    name: 'Dinossauro',
    originalName: 'Dinosaur',
    trait: 'Dinosaur',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=391',
    sourcePage: 96,
    intro:
      'Restos da era primeva, esses animais reptilianos enormes ainda existem em grande número em ermos remotos ou no subterrâneo mágico das Terras Sombrias. Povo-lagarto, orcs, gigantes e outros humanoides próximos os usam como montaria, guarda ou besta de caça. Nobres ricos às vezes os colecionam em menageries — o que quase sempre termina com exemplares soltos sendo tratados por druidas e outros campeões da natureza. Quando dinossauros se estabelecem fora do habitat normal, em geral é o resultado de uma coleção grande sendo solta.',
    sections: [
      {
        id: "dinosaur-abilities",
        title: "Habilidades de dinossauro",
        body: "Embora o registro fóssil do mundo real ofereça uma riqueza de inspiração para reconstruir dinossauros num RPG, você também pode olhar para criaturas vivas em busca de ideias. Dar a um dinossauro uma mordida venenosa ou uma rotina de ataque incomum como Investida Esmagadora garante que dinossauros sejam tão interessantes em combate quanto na aparência.",
      },
      {
        id: "dinosaur-guardians",
        title: "Guardiões dinossauros",
        body: "Como a maioria dos animais, dinossauros podem ser amansados ou domesticados, mas a dificuldade aumenta junto com o nível do dinossauro. Povo-lagarto e xulgaths gostam de usá-los como bestas de carga, montaria ou até feras de guerra. Certos dinossauros, como velociraptores e deinonychus, também são rastreadores excelentes. Os maiores e mais perigosos, como o tiranossauro, em geral são evitados, embora criaturas mais poderosas como gigantes consigam tê-los como mascotes, guardiões ou até algozes brutais. Em culturas mais sanguinárias, dinossauros às vezes são usados, infelizmente, como combatentes em batalhas de gladiadores.",
      },
      {
        id: "dinosaur-resources",
        title: "Recursos de dinossauro",
        body: "Como animais, dinossauros têm pouco interesse em tesouro (embora velociraptores e deinonychus, como os primos pássaros, gostem de guardar bugigangas brilhantes no ninho), mas os restos de aventureiros espalhados pelos covis muitas vezes ainda têm equipamento valioso. Além desses tesouros tradicionais, civilizações locais costumam caçar dinossauros por carne, peles e ovos.",
      },
      {
        id: "dinosaurs-in-fantasy",
        title: "Dinossauros na fantasia",
        body: "À primeira vista, incluir dinossauros num cenário de fantasia pode parecer estranho, mas são uma criatura excelente para um jogo que faz a ponte entre animais familiares do mundo real e monstros lendários. Se misturá-los livremente com leões, mantícoras e dragões ainda parecer estranho, considere usá-los em terras remotas e primevas, como sugerem as barras abaixo.",
      },
      {
        id: "hollow-worlds",
        title: "Mundos ocos",
        body: "Mundos ocos são outro local clássico da ficção onde dinossauros aparecem. Alguns cenários podem não conter mundos isolados inteiros no interior, mas muitos, como Golarion, têm terras subterrâneas vastas. A região mais profunda das Terras Sombrias de Golarion — um reino chamado Orv — é ótima para achar um mundo oco. Em geral infundidas com magia que permite selvas crescerem no fundo da terra (e às vezes até orbes semelhantes a sóis que iluminam as terras de cima, simulando um ciclo dia-noite), áreas como o Tolguth Profundo de Orv são lugares perfeitos para dinossauros vaguearem.",
      },
      {
        id: "magical-dinosaurs",
        title: "Dinossauros mágicos",
        body: "Num cenário de fantasia, efeitos mágicos ou influências sobrenaturais podem realçar dinossauros, dando-lhes ataques inesperados, modos de movimento ou outras habilidades. Você cria depressa uma fera mágica memorável só dando a um dinossauro o ataque mágico de outra criatura de nível igual — por exemplo, um espinossauro ganhando um sopro de fogo semelhante ao de um dragão de brasa jovem.",
      },
      {
        id: "other-dinosaurs",
        title: "Outros dinossauros",
        body: "Uma gama larga de dinossauros aparece nestas páginas, mas qualquer ida ao cinema, exploração de livros de dinossauro ou busca online revela uma riqueza de criaturas adicionais que também caberiam no jogo. Os iguanodontes de polegar em espinho, os espinossauros de vela nas costas, os terizinossauros de garras enormes e mais esperam quem busca os mistérios dos mundos perdidos onde os lagartos-trovão ainda reinam!",
      },
      {
        id: "primeval-lands",
        title: "Terras primevas",
        body: "Em Golarion, dinossauros aparecem em terras isoladas como vales de selva primeva ou planaltos — às vezes chamados mundos perdidos pela inacessibilidade e pela falta de civilização que avance. Além de dinossauros, outras megafaunas podem existir nesses lugares, junto com insetos gigantes ou criaturas agressivas como plantas carnívoras, drakes, linnorms e rocs.",
      },
    ],
  }),
  fam({
    id: 'family-wasp',
    name: 'Vespa',
    originalName: 'Wasp',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Wasp%20Swarm',
    intro:
      'A vespa comum quase não ameaça um aventureiro endurecido além da ferroada desconfortável. Um enxame grande e agressivo dessas insetos territoriais — para não falar das parentes gigantes — pode derrubar um grupo inteiro. Ninhos de fibra de madeira mascada viram um material parecido com papel; um só ninho abriga milhares.',
    sections: [
      {
        id: "paralytic-poison",
        title: "Veneno paralítico",
        body: "O veneno da vespa gigante perde a potência logo depois de colhido, mas alquimistas aprenderam a preservar parte das propriedades com uma série de aditivos duros; esse método o torna ainda mais mortal.",
      },
      {
        id: "sacred-stingers",
        title: "Ferrões sagrados",
        body: "Vespas são tidas como sagradas no sacerdócio da deidade élfica Calistria, deusa da vingança. Alguns sacerdotes invocam vespas gigantes ou enxames de vespas como servos; uns poucos as criam como animais, guardiãs de templo ou companheiras. Seguidores de Calistria emulam o gosto da vespa por deixar a vítima ferroada viva para sofrer por um longo período — um modelo adequado para a vingança.",
      },
    ],
  }),
  fam({
    id: 'family-protean',
    name: 'Proteano',
    originalName: 'Protean',
    trait: 'Protean',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=457',
    sourcePage: 270,
    intro:
      'Guardiões da desordem e nativos do plano primal do caos chamado Maelstrom, proteanos consideram vocação espalhar tumulto e apressar fins entrópicos. Os mais poderosos são semideuses conhecidos como senhores proteanos. Dividem-se numa casta frouxa e possuem uma variedade vertiginosa de poderes. A maioria tem corpo serpentino e cabeça de fera primeva.',
    sections: [
      {
        id: "ancient-immortals",
        title: "Imortais ancestrais",
        body: "Entre os inúmeros tipos de imortais que habitam o Grande Além, os proteanos são com certeza dos mais antigos. Travaram guerra contra os aeons inevitáveis desde o advento da primeira criação e falam com saudade daquele tempo antes de os próprios deuses imporem ordem à realidade.",
      },
      {
        id: "born-from-chaos",
        title: "Nascidos do caos",
        body: "O Maelstrom, lar de todos os proteanos, é a massa rodopiante de energia primal turbulenta, ondas planares e substância de alma que cerca os Planos Exteriores. Estudiosos planares teorizam que toda a realidade foi formada originalmente do Maelstrom nos primeiros dias do cosmos — uma teoria que os proteanos não necessariamente contestam.",
      },
      {
        id: "defending-chaos",
        title: "Defendendo o caos",
        body: "Aonde proteanos vão, o caos segue. Para eles, não há forma mais pura de existência do que a entropia, e buscam o tempo todo se opor ao estabelecimento de ordem no Grande Além. Porém, não veem a vida como incompatível com o caos; antes, simplesmente acreditam que os seres — imortais ou não — merecem liberdade completa nos próprios termos.",
      },
      {
        id: "galisemni",
        title: "Galisemni",
        body: "Só magia poderosa consegue estabilizar o Maelstrom por um tempo, permitindo que ilhas estáveis se formem. A mais proeminente é a cidade planar de comércio maciça de Galisemni, nas Terras de Fronteira, uma região um pouco mais estável do Maelstrom onde ele encosta nos outros Planos Exteriores.",
      },
      {
        id: "other-proteans",
        title: "Outros proteanos",
        body: "Muitos outros proteanos além dos apresentados aqui habitam o Maelstrom, incluindo akizendris que corrompem saber, naunets fisicamente ameaçadores, pelagastrs espectrais, ourdivars quase humanoides que mudam de forma, e izfiitars incrivelmente poderosos.",
      },
      {
        id: "protean-divinities",
        title: "Divindades proteanas",
        body: "Os mais poderosos de todos os proteanos são um grupo de semideuses conhecidos coletivamente como senhores proteanos. Ainda assim, o poder vasto deles empalidece diante dos misteriosos Falantes das Profundezas. Os Falantes são os mais enigmáticos dos deuses do Maelstrom — até a natureza exata é desconhecida, e estudiosos discordam se sequer são divindades ou só aspectos do próprio Maelstrom.",
      },
      {
        id: "protean-names",
        title: "Nomes proteanos",
        body: "Cada proteano tem dois nomes: um nome tradicional no idioma sibilante e confuso; e um título honorário. O último se traduz fácil para outros idiomas, mas o nome tradicional raramente pode ser pronunciado em qualquer língua que não Proteano. Por isso, a maioria tende a usar os títulos ao lidar com forasteiros, referindo-se a si como, por exemplo, “Canção de Veneno Gentil” ou “Grito Sibilante da Tempestade.”",
      },
    ],
  }),
  fam({
    id: 'family-angel',
    name: 'Anjo',
    originalName: 'Angel',
    trait: 'Angel',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=359',
    sourcePage: 14,
    intro:
      'As hostes celestiais de anjos são mensageiras e guerreiras, divididas em coros conforme habilidade e domínio. Foram das primeiras criações dos deuses. A maioria dos anjos modernos não é criação divina direta, e sim almas mortais elevadas dos planos celestiais. A maior parte dos anjos sem afiliação vive em Nirvana; os ligados a deidades habitam os domínios delas.',
    sections: [
      {
        id: "angelic-divinities",
        title: "Divindades angélicas",
        body: "Os anjos mais poderosos pertencem a uma categoria de semideuses conhecidos como senhores empiriais — título compartilhado com outros semideuses sagrados poderosos entre a hoste de arcontes, azatas e outros habitantes dos planos celestiais. O senhor empirial mais famoso e poderoso, Sarenrae, ascendeu à divindade e agora reina acima dos outros senhores empiriais.",
      },
      {
        id: "angelic-locations",
        title: "Locais angélicos",
        body: "Anjos normalmente vivem em Nirvana ou noutros planos celestiais, mas as missões podem levá-los ao Universo. Conjuradores podem invocá-los para ajuda ou conselho em tempos de necessidade, e até podem ser achados, embora raro, cruzando contra capetas no Inferno, nas Fendas Exteriores ou em qualquer lugar entre eles.",
      },
      {
        id: "angelic-treasure",
        title: "Tesouro angélico",
        body: "Muitos anjos vestem armadura requintada ou empunham armas belas e muitas vezes mágicas. Embora não sejam atrapalhados por pecados mortais como ganância ou orgulho (salvo a exceção muito rara e trágica), apreciam a beleza e o ofício de roupas finas, joias requintadas e obras de arte.",
      },
      {
        id: "holy-forces",
        title: "Forças sagradas",
        body: "Relações entre anjos e outros celestiais nunca são completamente harmônicas, mas em geral evitam choques focando nos respectivos pontos fortes: anjos na negociação, arcontes na guerra, azatas em trazer alegria ao reino mortal, e assim por diante. Anjos também trabalham com os outros para garantir que as vontades dos deuses estejam representadas.",
      },
    ],
  }),
  fam({
    id: 'family-chupacabra',
    name: 'Chupacabra',
    originalName: 'Chupacabra',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Chupacabra',
    intro:
      'Predadores notórios com sede inegável de sangue. Preferem presa fraca e lenta, escondidos e observando por muito tempo antes do bote. Ágeis e furtivos, fazem ninho em capim alto e pedra; as escamas levemente reflexivas ajudam a sumir no entorno. Viajantes solitários e gado (em especial cabras) são o prato; o rastro costuma ser só a carcaça esgotada.',
    sections: [
      {
        id: 'chupacabra-myth',
        title: 'Mito e matilha',
        body: 'A combinação de sumiço e hábito noturno faz supersticiosos imaginarem um vampiro imprudente na região. Em geral solitários, às vezes formam gangues pequenas em áreas fartas, ousadas o bastante para atacar manadas e viajantes. Alguns rumores — como o de que certos chupacabras voam — são verdadeiros demais.',
      },
    ],
  }),
  fam({
    id: 'family-vampire',
    name: 'Vampiro',
    originalName: 'Vampire',
    trait: 'Vampire',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Vampire%20Servitor',
    intro:
      'Vampiros são mortos-vivos que se alimentam do sangue dos vivos. Usam servidores recém-alçados como peões de infiltração e reconhecimento — ainda famintos, ainda aprendendo a fingir humanidade.',
    sections: [
      {
        id: "building-vampires",
        title: "Criando vampiros",
        body: "Como vampiros podem infligir sua natureza a qualquer criatura cujo sangue bebam, quase qualquer ser vivo pode se tornar um desses horrores mortos-vivos. Quando precisar criar um vampiro para o jogo, há dois caminhos. Na maioria dos casos, é mais eficaz montá-lo do zero, com as regras padrão de criação de monstros (foi assim que o conde, o serviçal e o mente-mestra destas páginas foram feitos). Ou use as diretrizes de Criar um Vampiro para transformar uma criatura existente, ajustando como achar melhor. Em ambos os casos, habilidades específicas como restauração do caixão, Fuga em Névoa e Beber Sangue funcionam igual. O Pathfinder Book of the Dead também inclui regras para transformar personagens jogadores em vampiros via arquétipo.",
      },
      {
        id: "death-wears-many-cloaks",
        title: "A morte veste muitos mantos",
        body: "Os vampiros mais comuns e tradicionais, como os apresentados aqui, também são conhecidos como “moroi”. São mais prevalentes em Golarion nos condados enevoados de Ustalav e aparecem em número pequeno em quase toda nação do Mar Interior. Outros tipos incluem o nosferatu ressequido, o jiang-shi saltitante, o vrykolakas feral e o vetalarana psíquico — compartilham muitos traços básicos com os moroi, mas têm habilidades próprias. Dhampirs podem nascer de qualquer um desses, embora os nascidos de moroi, chamados svetochers, sejam os mais comuns, sobretudo na região do Mar Interior.",
      },
      {
        id: "the-noble-dead",
        title: "Os mortos nobres",
        body: "A maioria dos vampiros sofre um deslizamento inevitável para a decadência moral, incapaz de reter a empatia e a bondade que possa ter tido em vida. Alguns conseguem guardar uma porção das emoções positivas, mas essa retenção parece sempre vir acompanhada de uma redução do poder vampírico, como se os restos de alma rejeitassem a completude da transformação em morto-vivo.",
      },
      {
        id: "where-rise-the-dead",
        title: "Onde os mortos se erguem",
        body: "Vampiros são inevitavelmente atraídos aos lugares e às pessoas que conheceram em vida. Um que vive numa cidade com vida noturna ativa pode manter o disfarce mortal por muitos anos antes da natureza morta-viva ficar aparente; os de vilas mais simples podem espreitar bosques e cavernas próximos, ansiando por uma vida que lhes foi negada para sempre.",
      },
    ],
  }),
  fam({
    id: 'family-lamia',
    name: 'Lâmia',
    originalName: 'Lamia',
    trait: 'Lamia',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=436',
    sourcePage: 214,
    intro:
      'Lâmias são vítimas sedentas de uma maldição antiga da qual culpam os deuses. A maioria é humanoide da cintura para cima e serpente da cintura para baixo. Magia sinistra lhes é natural; preferem ilusão para enganar a presa e depois consumi-la — ou só para torturar.',
    sections: [
      {
        id: "lamia-locations",
        title: "Locais de lâmia",
        body: "Lâmias habitam a beira da civilização em fortalezas em ruínas, cidades abandonadas e templos caídos de deuses esquecidos.",
      },
      {
        id: "lamia-treasure",
        title: "Tesouro de lâmia",
        body: "Lâmias salvam ouro, joias e itens mágicos dos templos abandonados e cidades arruinadas onde fazem covil. Às vezes se armam com adagas encantadas.",
      },
      {
        id: "other-lamias",
        title: "Outras lâmias",
        body: "Aventureiros relatam encontros com outras variedades de lâmia, incluindo versões imensas com o torso de gigantes, monstruosidades movidas por fome insaciável, ou monstros voadores com quase nenhum traço humanoide — ainda assim, todas essas variantes se curvam à sabedoria e à influência das matriarcas lâmia.",
      },
    ],
  }),
  fam({
    id: 'family-demon',
    name: 'Demônio',
    originalName: 'Demon',
    trait: 'Demon',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=387',
    sourcePage: 76,
    intro:
      'Quando uma alma mortal pecaminosa é julgada e enviada às Fendas Exteriores, pode virar um capeta mortal — um demônio. Demônios são encarnações vivas do pecado. Uma vez formados, os objetivos são dois: acumular poder pessoal e corromper almas mortais para que o pecado as manche, garantindo um suprimento sem fim de demônios novos.',
    sections: [
      {
        id: "demonic-deities",
        title: "Deidades demoníacas",
        body: "Os demônios mais poderosos são conhecidos como senhores demoníacos (o termo é neutro neste caso). Dessas divindades, Lamashtu é a mais poderosa. Inúmeros outros senhores demoníacos existem, incluindo Abraxas, Cyth-V'sug, Kabriri e Zura.",
      },
      {
        id: "demonic-sources",
        title: "Fontes demoníacas",
        body: "Quando uma alma mortal pecaminosa é consignada às Fendas Exteriores, passa um tempo se revirando no lodo e se alimentando de imundície. Se sobrevive e não é ela mesma comida, a alma por fim ascende a um demônio, influenciada pela natureza do pecado — ainda assim, a maioria dos demônios também é capaz de se reproduzir. A fecundidade da vida demoníaca é talvez o aspecto maior — e mais ameaçador — desses capetas perigosos.",
      },
      {
        id: "demons-and-souls",
        title: "Demônios e almas",
        body: "Demônios, como muitos outros capetas, têm fome de almas. Aos olhos deles, o uso principal dessas almas é gerar demônios novos, que servem de soldados, peões ou até moeda para os mestres mais poderosos.",
      },
      {
        id: "history-of-evil",
        title: "História do mal",
        body: "Antes de os mortais inundarem o Universo com pecados, qlippoths (página 280) governavam as profundezas das Fendas Exteriores. Faz éons que um qlippoth não sobe o bastante para desafiar diretamente o domínio dos demônios, mas os capetas antigos ainda trabalham para enfraquecer os inimigos atacando os mortais que os geram.",
      },
      {
        id: "newcomers-to-the-rifts",
        title: "Recém-chegados às Fendas",
        body: "Embora agora sejam os capetas mais numerosos das Fendas Exteriores, demônios são recém-chegados relativos, surgindo só quando a influência mortal — e o pecado mortal em particular — começou a moldar o plano. Por éons, lutaram com outros residentes antigos das Fendas pelo domínio, mas por fim o número puro permitiu que se tornassem os capetas predominantes do plano.",
      },
      {
        id: "out-of-the-rifts",
        title: "Fora das Fendas",
        body: "O reino sinuoso e sempre mutável das Fendas Exteriores é o lar planar da vida demoníaca, mas demônios podem ser achados em qualquer lugar onde exista capacidade de pecar. Conjuradores maus ou tolos gostam de invocar demônios para conselho ou necessidades mais sombrias. Quando as Fendas Exteriores rasgam os limites da realidade e criam portais como feridas para outros mundos, demônios podem transbordar e causar estrago incrível.",
      },
      {
        id: "sinful-destruction",
        title: "Destruição pecaminosa",
        body: "Embora gostem de causar destruição eles mesmos, a maioria dos demônios prefere enganar e tentar mortais a cair no pecado por vontade própria. Ao contrário dos diabos, que buscam controle, demônios têm gosto por ruína.",
      },
      {
        id: "uncountable-demons",
        title: "Demônios incontáveis",
        body: "As Fendas Exteriores podem ser o maior dos Planos Exteriores, e os mortais têm capacidade igualmente grande de trair a si, a sociedade e a ordem natural da realidade. Com essa fonte sem limite para pecados cada vez mais especializados, as Fendas geram o tempo todo tipos novos de demônios para assolar a realidade. A vasta maioria é destruída depressa e nunca se ergue de novo, mas os que sobrevivem bastam para que dezenas, se não centenas, de tipos de demônios existam além dos listados aqui.",
      },
      {
        id: "what-makes-a-sin",
        title: "O que faz um pecado?",
        body: "Alguns classificam o pecado em sete categorias — inveja, gula, ganância, luxúria, orgulho, preguiça e ira. Embora esses pecados personifiquem alguns dos demônios mais poderosos e numerosos, existem bem mais do que sete tipos. Qualquer ato de crueldade ou destruição que um mortal pratique para gratificar a si à custa dos outros é, no efeito, um pecado, e qualquer ato desses pode gerar um demônio de uma alma na vida após a morte.",
      },
    ],
  }),
  fam({
    id: 'family-wraith',
    name: 'Espectro',
    originalName: 'Wraith',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Wraith',
    intro:
      'Espectros são mortos-vivos malignos que drenam a vida e evitam a luz. A forma sombria se cobre de mantos insubstanciais, usados como insígnia, marcados com olhos que julgam os vivos. Podem nascer de magia vil ou exposição direta ao Vazio, mas com mais frequência resultam de morte em escala trágica. A existência é vazio e fome, com o desejo de chamar outros para o mesmo vazio.',
    sections: [
      {
        id: 'wraith-haunts',
        title: 'Onde assombram',
        body: 'Assombram qualquer lugar onde possam lidar com os vivos em segurança, escolhendo quem é “digno” de virar espectro e descartando o resto. A vulnerabilidade à luz do sol os prende às sombras. Reúnem-se onde morte e caos são rotina: campos de guerra, submundos urbanos, rituais profanos. Nestes lugares, o vivo faz bem em ficar na luz.',
      },
    ],
  }),
  fam({
    id: 'family-revenant',
    name: 'Revenante',
    originalName: 'Revenant',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Revenant',
    intro:
      'Revenantes são perseguidores mortos-vivos obcecados que surgem do próprio assassinato e são movidos por uma só coisa: vingança contra o assassino. A sabedoria comum diz que só nascem de quem foi traído por completo ou abandonado a uma morte lenta — e mesmo assim a vítima pode não se erguer. Em outros casos, o “assassino” nem quis matar: o revenante não entende piedade e nunca perdoa. Lembra pouco da vida além do que precisa para cumprir a vendeta.',
    sections: [],
  }),
  fam({
    id: 'family-manticore',
    name: 'Mantícora',
    originalName: 'Manticore',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Manticore',
    intro:
      'A mantícora é uma amálgama monstruosa de leão, dragão e humano com gosto por carne humana. A cauda se enfeita de espinhos grandes como de porco-espinho, que ela arremessa chicoteando o rabo como funda. Do céu, esses espinhos abatem até guerreiros bem armados.',
    sections: [
      {
        id: 'manticore-vanity',
        title: 'Vaidade e lealdade',
        body: 'O rosto antropomórfico sugere intelecto; a maioria é assassina de uma ideia só, embora minta com voz musical que já puxou viajante para emboscada. Humanoides ingênuos às vezes as adoram; a mantícora aceita tributo até faltar comida, e então come o rebanho. Um mestre forte pode intimidá-la a servir de montaria — fiel enquanto houver carne humana e vitória.',
      },
    ],
  }),
  fam({
    id: 'family-medusa',
    name: 'Medusa',
    originalName: 'Medusa',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Medusa',
    intro:
      'Humanoides monstruosos que lembram humanos com cobras no lugar do cabelo, medusas são mais conhecidas pelo olhar petrificante que — se demorar — transforma mortais em pedra de forma permanente. São adversárias astutas que colecionam segredos e exploram o medo dos mais fracos. Se o engenho falhar, um olhar basta para transformar rival em enfeite de pedra.',
    sections: [
      {
        id: 'medusa-lairs',
        title: 'Covil e arco',
        body: 'Muitas constroem covis elaborados, decorados com as estátuas dos inimigos como troféus. Ágeis e duras, raramente recuam. Aventureiros que se acharam preparados para o olhar ainda caem — medusas também são arqueiras mortais, com flechas envenenadas à distância. Ainda assim, podem barganhar a vida se não restar alternativa; os segredos que carregam muitas vezes valem poupá-las.',
      },
    ],
  }),
  fam({
    id: 'family-cyclops',
    name: 'Cíclope',
    originalName: 'Cyclops',
    trait: 'Cyclops',
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=385',
    sourcePage: 70,
    intro:
      'Cíclopes são gigantes violentos com um passado trágico. Embora tenham um só olho, um dia viram muito mais: sabedoria oculta e magia divinatória que lhes dava o poder místico de prever. Esse poder lendário não impediu a queda da sociedade, e os vastos reinos cíclopes há muito viraram ruína. Hoje esqueceram quase tudo que souberam, e espreitam entre os restos como reis e rainhas esquecidos dos próprios reinos caídos.',
    sections: [
      {
        id: "lost-civilizations",
        title: "Civilizações perdidas",
        body: "Ciclopes habitam nas ruínas das civilizações perdidas — notavelmente Ghol-Gan em Garund, Koloran no noroeste de Casmaron, e vários reinos em Iblydos. Ruínas de Ghol-Gan ainda pontilham o arquipélago das Correntes, e números incontáveis de tesouros do império ciclope antigo ainda esperam descoberta. Piratas e caçadores de tesouro regularmente fazem expedições em busca de relíquias ghol-gani perdidas, mas muitas dessas viagens nunca voltam. Entre as que voltam, sobreviventes falam de maldições terríveis, armadilhas gruesas e guardiões mortos-vivos de um olho só.",
      },
    ],
  }),
  fam({
    id: 'family-chimera',
    name: 'Quimera',
    originalName: 'Chimera',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Chimera',
    intro:
      'A quimera é o exemplo arquetípico de monstro antinatural feito da mistura de criaturas radicalmente diferentes: neste caso, leão, dragão e bode. Selvagem, odienta e faminta, tenta comer qualquer criatura que vê. Às vezes um mestre de vontade forte a obriga a servir de guarda ou montaria. Se perder o controle, em geral é o primeiro a ser devorado.',
    sections: [],
  }),
  fam({
    id: 'family-yeti',
    name: 'Yeti',
    originalName: 'Yeti',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Yeti',
    intro:
      'Quase mito, o yeti raramente é visto — e quando é, em geral já é tarde. Habitam os picos mais altos e remotos, descendo das fortalezas de neve para saquear, roubar gado e às vezes saciar impulsos de carnificina. Quem vive ao pé da montanha avisa dos “homens das neves abomináveis”: humanoides peludos que deixam rastros estranhos e sangrentos na neve.',
    sections: [
      {
        id: 'yeti-portals',
        title: 'Guardiões de portais',
        body: 'Na verdade, a maioria dos yetis protege o mundo em vez de caçar os outros habitantes, guardando portais eldritch que ligam o Universo mortal a dimensões muito mais estranhas. Dos arcos cobertos de neve saem alienígenas, pesadelos vivos, capetas e pior. Yetis que sucumbem aos horrores de dentro assumem os impulsos sanguinários das próprias coisas que deveriam conter. Expulsos do clã, vagam sozinhos e dão origem ao mito do homem das neves abominável.',
      },
    ],
  }),
]
