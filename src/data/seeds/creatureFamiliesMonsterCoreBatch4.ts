import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 4 do Monster Core.
 * Textos traduzidos das entradas oficiais (AoN / Monster Core). Sem Legacy.
 */
export const catalogCreatureFamiliesMonsterCoreBatch4: CreatureFamily[] = [
  fam({
    id: 'family-herexen',
    name: 'Herexen',
    originalName: 'Herexen',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Herexen',
    intro:
      'Quando um clérigo se rebela contra a deidade e morre no aperto de uma fúria blasfema, as heresias cometidas em vida podem alimentar a transformação num herexen morto-vivo. Buscam vingança contra o deus que um dia adoraram: profanam templos, matam fiéis e reúnem mortos-vivos menores na busca ímpia. Agarram-se teimosos a restos do poder antigo, ainda empunhando magia e a arma predileta da deidade que tanto desprezam.',
    sections: [
      {
        id: 'herexen-congregations',
        title: 'Congregações blasfemas',
        body: 'Grupos que blasfemaram contra a mesma deidade às vezes se juntam numa paródia de congregação, conduzindo ritos com algo próximo de euforia. Muitas nascem de um culto cujos membros praticaram a heresia juntos em vida e morreram juntos.',
      },
    ],
  }),
  fam({
    id: 'family-shark',
    name: 'Tubarão',
    originalName: 'Shark',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Great%20White%20Shark',
    intro:
      'Tubarões de todos os tamanhos e formas percorrem os oceanos, em grande parte inalterados, desde tempos primordiais. São predadores eficientes e implacáveis, com várias fileiras de dentes capazes de rasgar a presa num instante. A capacidade inquietante de farejar sangue na água faz com que possam aparecer em qualquer cena de carnificina aquática.',
    sections: [
      {
        id: "when-sharks-attack",
        title: "Quando tubarões atacam",
        body: "Ao contrário da crença popular, tubarões não são particularmente afeitos a humanoides como refeição. Só nas condições certas — comida escassa, ou o tubarão confundindo a vítima com uma foca — atacam um nadador ou um barco pequeno. Essas ocasiões são traumáticas o bastante para os sobreviventes perpetuarem o mito de que tubarões caçam gente.",
      },
    ],
  }),
  fam({
    id: 'family-flytrap',
    name: 'Dionéia',
    originalName: 'Flytrap',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Snapping%20Flytrap',
    intro:
      'Dionéias se alimentam com avidez de humanoides, insetos monstruosos e presas maiores. Folhas dentadas no fim de hastes longas fecham de golpe e não largam até a digestão terminar.',
    sections: [
      {
        id: "flytrap-treasure",
        title: "Tesouro de dionéia",
        body: "Dionéias gigantes têm intelecto instintivo o bastante para emboscar presas ou se mover em busca de terreno de caça melhor, mas não valorizam tesouro. Ainda assim, tendem a acumular um pequeno espólio descartado de quem comeram, deixando essas bugigangas brilhantes na periferia das raízes depois de terminar de digerir a refeição.",
      },
    ],
  }),
  fam({
    id: 'family-psychopomp',
    name: 'Psicopompo',
    originalName: 'Psychopomp',
    trait: 'Psychopomp',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Nosoi',
    intro:
      'Psicopompos são guardiões e pastores dos mortos no Ossário, o vasto plano de túmulos onde almas mortais são julgadas e enviadas às recompensas ou condenações eternas. Garantem que os mortos aceitem a transição da mortalidade e sejam classificados no além adequado. Também protegem almas de predadores sobrenaturais. Quase todos usam máscaras, sobretudo quando interagem com mortais, embora os tipos de máscara sejam tão variados quanto os próprios psicopompos. Os tribunais do Ossário presidem em Requiano, um idioma sóbrio porém melódico, falado devagar com várias mudanças de tom.\n\nMuitos estão intimamente envolvidos na burocracia maciça do Ossário. Poucos perseguem misericórdia, justiça ou ganho pessoal: os deveres para com Pharasma e o Ossário são supremos. Ainda assim, cada um interpreta o dever de um jeito, o que pode pô-los em conflito com mortais ou até uns com os outros.',
    sections: [
      {
        id: "psychopomp-courts",
        title: "Tribunais psicopompos",
        body: "Psicopompos raramente se opõem a celestiais ou capetas. Na verdade, frequentemente os recebem no Ossário, sobretudo nos tribunais psicopompos espalhados onde esses forasteiros pedem que uma alma ou outra seja remetida à sua jurisdição. Casos complicados são julgados por yamarajes; os mais espinhosos ou politicamente delicados, pela própria Pharasma.",
      },
      {
        id: "psychopomp-divinities",
        title: "Divindades psicopompas",
        body: "Os psicopompos mais poderosos são semideuses conhecidos como “ushers”. Incluem Atropos, a Última Irmã; Barzahk, a Passagem; Ceyanan, o Pastor; Dammar, o Negado; Imot, o Símbolo da Perdição; Mãe Abutre, a Devoradora de Carne; Mrtyu, Consorte da Morte; Narakas, a Sentença Purificadora; o Cavalo Pálido; Phlegyas, Consoladora dos Ateus; Saloc, Guardião dos Imortais; Teshallas, o Veneno Primordial; e Vale, o Tribunal dos Ancestrais.",
      },
      {
        id: "psychopomp-foes",
        title: "Inimigos dos psicopompos",
        body: "Os maiores inimigos dos psicopompos são criaturas que devoram ou roubam almas, como astradaemons e vilderavns. Outros oponentes incluem necromantes, proteanos e quem estendeu a vida de forma antinatural, como liches.",
      },
      {
        id: "psychopomp-traitors",
        title: "Traidores psicopompos",
        body: "Alguns psicopompos veem a tarefa de separar almas como oca e sem sentido, já que o próprio multiverso um dia deve acabar. Éons atrás, esses rebeldes abandonaram o dever e fugiram para os cantos vazios dos planos, tornando-se um novo tipo de criatura maligna: o sahkil. Sahkils se alimentam de medos mortais, sobretudo o medo da morte, e gostam de atormentar quem precisa morrer. Psicopompos em geral deixam esses descontentes em paz, salvo quando interferem no fluxo adequado das almas.",
      },
    ],
  }),
  fam({
    id: 'family-azata',
    name: 'Azata',
    originalName: 'Azata',
    trait: 'Azata',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Lyrakien',
    intro:
      'Azatas são manifestações de liberdade e alegria sem freio — celestiais bondosos com gosto por exploração curiosa, folia espontânea e missões caprichosas. Nascidos de sonhos bons e de desejos sinceros de um mundo melhor, residem nos ermos indomáveis do Elísio. São apaixonados e volúveis, belos e brilhantes como a fantasia de uma criança, mas também ferozmente leais a quem estimam. Agem rápido e direto contra influências profanas, mas tendem a evitar guiar assuntos mortais no resto, deixando que cada um escolha o próprio destino sem intromissão de forças de outro mundo.\n\nRejeitam as correntes gêmeas do dever e da tirania, e também as correntes pesadas do desespero que a realidade tantas vezes impõe. Isso lhes dá reputação dúbia com outros celestiais, que os consideram volúveis e pouco confiáveis; azatas sabem que o autossacrifício implacável pode ser tão destrutivo para a alma quanto o mal. Recusam-se a comprometer a beleza do mundo com essa banalidade: vivem sem arrependimento e saboreiam cada triunfo e agonia no caminho.',
    sections: [
      {
        id: "azata-divinities",
        title: "Divindades azata",
        body: "Os azatas mais poderosos pertencem à hoste de semideuses conhecidos como senhores empíreos. Essas deidades menores mantêm muitos cultos em muitos mundos do Universo mortal, e entre os seus estão figuras tão diversas quanto Ashava, protetora de espíritos perdidos e dançarina ao luar; Borboleta Negra, agente misteriosa de Desna e padroeira das profundezas do espaço; e Sinashakti, andarilho alegre e portador de sabedoria a vagabundos.",
      },
      {
        id: "azata-intercession",
        title: "Intercessão azata",
        body: "Azatas às vezes intervêm em assuntos mortais quando liberdades óbvias estão em risco. São conhecidos por aparecer e ajudar mortais contra tiranos ou outros seres perversos. Esses momentos de auxílio são breves, porém, e em geral partem assim que o opressor cai. O valor da liberdade é tão importante que preferem ir embora para não influenciar um mortal de forma direta e, assim, ferir essa liberdade.",
      },
      {
        id: "azata-treasures",
        title: "Tesouros azata",
        body: "Azatas não estão acima da riqueza material, e a maioria adora finura por uma paixão inocente pela beleza. Não de todo imunes ao constrangimento, podem justificar armas cravejadas como ferramentas necessárias contra o mal, ou a profusão de joias e sedas que vestem como instrumentos diplomáticos importantes.",
      },
      {
        id: "other-azatas",
        title: "Outros azatas",
        body: "Os ermos do Elísio abrigam uma gama ampla de azatas, os mais variados e espalhados dos celestiais. Do uinuja de quatro olhos, semelhante a uma mariposa, à veranallia sobrenaturalmente verdejante e bela, cujo corpo inferior é um jardim de flores silvestres, azatas não pecam por falta de diversidade.",
      },
    ],
  }),
  fam({
    id: 'family-daemon',
    name: 'Daemon',
    originalName: 'Daemon',
    trait: 'Daemon',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Cacodaemon',
    intro:
      'Moradores do plano desolado e terrível de Abaddon, daemons são moldados pela destruição da vida em todas as formas — e dedicados a ela. Buscam a morte de cada ser mortal pelos meios mais dolorosos e horrendos, a serviço dos Cavaleiros do Apocalipse. Cada tipo representa um jeito diferente de morrer, e os poderes quase sempre visam espalhar aquela forma particular de morte. Com isso, tentam arrastar toda a existência a um poço de desesperança e condenar todas as almas ao esquecimento.\n\nEnquanto muitos capetas tentam almas mortais para o mal niilista, daemons ainda são movidos por uma fome sobrenatural de almas e usam vários métodos — não menos as gemas de alma dos cacodaemons — para aprisioná-las. Em Abaddon e noutros lugares inóspitos do multiverso, almas são ao mesmo tempo iguaria, mercadoria e fonte de poder mágico, e os daemons estão entre os maiores glutões, mercadores e abusadores desse “recurso” espiritual.',
    sections: [
      {
        id: "daemonic-divinities",
        title: "Divindades daemônicas",
        body: "Numerosos semideuses daemons únicos e poderosos, conhecidos coletivamente como arautos, governam faixas de Abaddon. Acima desses semideuses há entidades ainda maiores — os quatro Cavaleiros do Apocalipse. Conforme os éons passam, os nomes e identidades de Cavaleiros específicos mudam. Hoje são Apollyon (Cavaleiro da Pestilência), Charon (Cavaleiro da Morte), Szuriel (Cavaleira da Guerra) e Trelmarixian (Cavaleiro da Fome). Destes, só Charon nunca caiu diante de um aspirante. Alguns sustentam que um “Quinto Cavaleiro” um dia governou os outros quatro; outros, que o sol eternamente eclipsado nos céus de Abaddon é tudo o que resta desse deus há muito morto.",
      },
      {
        id: "other-daemons",
        title: "Outros daemons",
        body: "Existem tantos daemons quanto formas horrendas de morrer. O sangudaemon ensanguentado personifica a morte por perda de sangue; o thanadaemon esquelético, a morte por velhice. Os mais poderosos são os olethrodaemons, que representam as mortes em massa causadas por apocalipses e o fim de mundos inteiros.",
      },
      {
        id: "soul-gems-as-treasure",
        title: "Gemas de alma como tesouro",
        body: "Gemas de alma são negociadas em mercados ilícitos, tradição que celestiais e psicopompos acham vil. O valor varia, mas em geral corresponde ao nível da alma cativa na gema.",
      },
      {
        id: "the-daemonic-paradox",
        title: "O paradoxo daemônico",
        body: "Daemons encarnam um paradoxo fundamental: são encarnações da morte e buscam devorar tudo o que vive, mas são eles mesmos criaturas vivas. Alguns falam de um fim glorioso após o qual a realidade estará enfim livre do contágio que é a própria vida. A maioria não dá atenção a esse paradoxo.",
      },
    ],
  }),
  fam({
    id: 'family-nightmare',
    name: 'Pesadelo',
    originalName: 'Nightmare',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Nightmare',
    intro:
      'Pesadelos são equinos flamejantes, arautos da morte. Cascos queimam a estrada, a fumaça negra ofusca quem tenta seguir, e o galope leva cavaleiro e montaria entre os planos.',
    sections: [
      {
        id: "nightmare-steeds",
        title: "Corcéis pesadelo",
        body: "Pesadelos só permitem que as criaturas mais malignas os montem e são parceiros dispostos na destruição que esses cavaleiros infligem. Dullahan poderosos são particularmente conhecidos por se associar a pesadelos.",
      },
    ],
  }),
  fam({
    id: 'family-effigy',
    name: 'Efígie',
    originalName: 'Effigy',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Clay%20Effigy',
    intro:
      'Efígies são construtos sem alma, moldados para guardar túmulos, tesouros e recintos sagrados. A de argila carrega um toque do divino e maldições para punir invasores; a de pedra é muralha que anda, esmagando de perto e de longe. Supersticiosos ainda pisam leve perto de estátuas elaboradas que lembrem essas sentinelas — mesmo quando a estátua é só pedra.',
    sections: [
      {
        id: 'effigy-guardians',
        title: 'Guardiões',
        body: 'Para algumas efígies de argila, a proteção divina vai mais fundo: servos menores da deidade vigiam a estátua e sentem quando ela é danificada. As mais preciosas são cobertas de rituais que convocam esses guardiões direto. Ladrões de túmulo experientes aprendem a enxergar tais marcas de longe.',
      },
    ],
  }),
  fam({
    id: 'family-centaur',
    name: 'Centauro',
    originalName: 'Centaur',
    trait: 'Centaur',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Centaur%20Herbalist',
    intro:
      'Centauros são caçadores e rastreadores lendários que lembram humanos musculosos com o corpo de cavalos poderosos da cintura para baixo. Em geral são nômades e se consideram guardiões das paisagens ao redor. Histórias de choques sangrentos com viajantes humanoides são conhecidas, mas centauros não são intrinsecamente sanguinários nem agressivos por capricho. São orgulhosos e teimosos, e não levam na boa quem busca saquear os recursos naturais das áreas em que as comunidades vivem — algumas há milhares de anos. Contra devastadores da natureza que ignoram o aviso, não hesitam em usar a caça apurada para feridas mortais.\n\nTreinam com armas e com os cascos pesados, e o trovão de um bando em carga pelo campo muitas vezes é confundido com estouro de manada ou até terremoto. Apesar dos laços apertados com os parentes, alguns estabelecem alianças próximas com elfos, feéricos, gnomos e comunidades humanas isoladas. Tais aliados muitas vezes se beneficiam do conhecimento extenso de herbalismo e sobrevivência no ermo. Gostam de viajar, mas a maioria acha difícil cortar os laços com a família e deixar o bando para aventurar-se no mundo amplo.\n\nHá variação enorme de tamanho e coloração. O tronco superior compartilha os tons de pele de outros humanoides da região, mas o corpo inferior — como o de cavalos — pode variar muito de pai para filho. A maioria tem pelo menos 2,1 m de altura e pesa mais de 900 kg. Vivem em grupos de dezenas, em geral liderados por alguém que cumpriu muitos feitos nobres e ganhou respeito para a vida.',
    sections: [],
  }),
  fam({
    id: 'family-dullahan',
    name: 'Dullahan',
    originalName: 'Dullahan',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Dullahan',
    intro:
      'Montado num cavalo negro como a noite, o caçador sem cabeça rastreia e leva as cabeças dos que julga indignos de continuar vivo. Ao se aproximar para matar, primeiro sussurra o nome da vítima, depois coleta o prêmio, lançando um manto de pavor sobre quem testemunha.\n\nUm dullahan se manifesta quando um guerreiro particularmente violento é decapitado e a alma se agarra teimosa à existência material. A maioria volta às terras natais para vingar-se. A justiça é rápida e implacável; uma vez escolhido o alvo, não vacila. Talvez mais do que vingança, deseja a própria cabeça. Quem a empunha ganha serviço de má vontade — até o dullahan matar o suserano e retomar o crânio.',
    sections: [],
  }),
  fam({
    id: 'family-sphinx',
    name: 'Esfinge',
    originalName: 'Sphinx',
    trait: 'Sphinx',
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Sphinx',
    intro:
      'Esfinges são seres místicos com corpo de leão, asas de ave grande e torso e cabeça de humano. Muitas vezes malvistas nas lendas como meros monstros, e embora sejam rápidas à ira e capazes de retribuição mortal por ofensas percebidas, também são muito inteligentes.\n\nCostumam ser associadas a desertos, mas também habitam climas mais amenos. Formam grupos pequenos de uma só família estendida. Ao amadurecer, desenvolvem inquietação: um impulso de reunir saber oculto e resolver os maiores enigmas do mundo.\n\nSe tratadas com respeito — e bem alimentadas — podem trocar informação. A moeda predileta são enigmas e segredos. Quem oferece insight mesquinho e enigmas velhos pode não viver o bastante para se arrepender.',
    sections: [],
  }),
  fam({
    id: 'family-giant',
    name: 'Gigante',
    originalName: 'Giant',
    trait: null,
    sourcePage: 164,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=420',
    intro:
      'Gigantes são humanoides maciços que vivem em regiões remotas mundo afora. Variam muito, mas os une a fome: precisam da substância do próprio elemento junto dos banquetes que se espera de um humanoide desse tamanho. Para alguns é simples; tipos mais esotéricos acham essa necessidade uma realidade dura. Um punhado enorme de gelo ou neve ao lado da refeição satisfaz um gigante do gelo; gigantes das sombras têm fome das sombras coaguladas do Mundo Inferior.',
    sections: [
      {
        id: "giant-holdings",
        title: "Domínios gigantes",
        body: "Por mais descomunais que sejam, gigantes tendem a habitar regiões remotas do mundo, onde têm o luxo de reivindicar territórios maiores. Muitos tipos residem nas Terras da Saga, onde os ancestrais foram forçados a servir a antiga Thassilon, e nas Montanhas Mindspin.",
      },
      {
        id: "giant-pets",
        title: "Mascotes gigantes",
        body: "Como muita gente, gigantes gostam de ter animais de estimação. Animais grandes como ursos e leões, megafauna como mamutes-lanosos e dinossauros são populares entre muitos. Gigantes rúnicos são os que mais se afastam desse padrão, preferindo cuidar dos gigantes que controlam, mas tipos mais esotéricos muitas vezes acham mascotes igualmente curiosos.",
      },
      {
        id: "other-giants",
        title: "Outros gigantes",
        body: "Além dos detalhados aqui, muitos outros habitam regiões remotas. Gigantes da madeira são guardiões pacíficos das florestas, gigantes das cavernas espreitam sozinhos como predadores cruéis, e gigantes das montanhas são açougueiros horrendos que até outros gigantes temem.",
      },
      {
        id: "oversized-themes",
        title: "Temas descomunais",
        body: "Gigantes são inimigos em escala descomunal. Embora muitos tenham temas ligados a forças elementais ou mágicas, o tema principal que compartilham é encarnar um tropo cultural clássico como base. Gigantes do fogo, por exemplo, podem ser vistos como ferreiros descomunais, e gigantes do gelo devem evocar o tema de um guerreiro viking em escala.",
      },
    ],
  }),
  fam({
    id: 'family-ape',
    name: 'Símio',
    originalName: 'Ape',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Gorilla',
    intro:
      'Embora muitos símios mostrem comportamento pacífico ou recluso, gorilas podem ser territoriais, e o megaprimata é especialmente agressivo e perigoso.',
    sections: [],
  }),
  fam({
    id: 'family-octopus',
    name: 'Polvo',
    originalName: 'Octopus',
    trait: null,
    aonUrl: 'https://2e.aonprd.com/Search.aspx?q=Giant%20Octopus',
    intro:
      'Polvos gigantes habitam o coração de oceanos profundos e escuros. Espertos e adaptáveis, caçam todo tipo de animal. Apesar do tamanho, comprimem o corpo para passar por frestas pequenas, desde que caiba o bico. Favorecem naufrágios, recifes e cavernas submersas, e gostam de enfeitar o covil com objetos achados — muitas vezes armas mágicas, escudos ou obras de arte de navios afundados.',
    sections: [],
  }),
]
