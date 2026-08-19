import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas Lost Omens / War of Immortals / Dark Archives. */
export const CREATURE_LORE_LOST_OMENS: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-mother-mitera": {
    "description": "",
    "sections": []
  },
  "creature-verdures-moonflower": {
    "description": "Essas plantas enormes têm troncos grossos e nodosos cobertos de flores com presas. Uma boca escancarada fica no topo do tronco, capaz de engolir inteiras a maioria das criaturas menores que a flor-da-lua. Flores-da-lua podem se mover lentamente sobre raízes poderosas ou usá-las para atacar, mas em geral as cravam fundo no solo ao redor e permanecem imóveis à espera da presa.\n\nEmbora flores-da-lua não falem no sentido convencional, comunicam-se telepaticamente com outras flores-da-lua. Exploradores que encontram uma única flor-da-lua podem ter certeza de que quaisquer outras nas proximidades estarão preparadas. Quem intercepta as comunicações telepáticas de uma flor-da-lua é assaltado por visões de selvas primevas terríveis governadas por vida vegetal titânica. Se isso é visão do passado ou sonho de futuro compartilhado por todas as flores-da-lua, ninguém sabe.\n\nFlores-da-lua são formas de vida alienígenas de um planeta há muito morto, mas sua proliferação pela galáxia foi garantida pelas maquinações do Domínio do Negro, organização sinistra e alienígena dos lugares escuros entre as estrelas.",
    "sections": []
  },
  "creature-the-morrowkin": {
    "description": "",
    "sections": []
  },
  "creature-k-h-w-s-echo": {
    "description": "",
    "sections": []
  },
  "creature-bone-ship": {
    "description": "Raramente resta algo vivo após a passagem de um navio de ossos — só morte, destruição e ondas vermelhas como sangue que se chocam e espumam em seu rastro. Quando um navio de ossos se forma, magia necromântica draga grandes ossos do fundo do mar e lentamente os dobra no lugar com intenção maliciosa. As costelas de baleias costumam formar as tábuas do casco, e suas colunas vertebrais imensas se torcem em mastros altíssimos. Músculos e tendões amarram o navio, apertando e afrouxando para virá-lo com precisão enquanto navega.\n\nQuando um navio de ossos encontra outra embarcação ou qualquer oportunidade de semear a morte, cadáveres menores espalhados pelo convés animam-se para formar tripulação e grupo de abordagem. Cada tripulante lembra um esqueleto humanoide, mas pode ser feito de ossos de várias criaturas. Para combate, o navio também cria canhões mágicos de osso que disparam estilhaços e detritos com rajadas de magia. As pequenas gemas negras salpicadas pela estrutura guardam as almas de uma tripulação afogada, pois um navio de ossos é o legado amaldiçoado de marinheiros mortos.\n\nQuando morte em massa acontece no mar — muitas vezes por um navio inteiro afundar longe da costa —, a angústia das vítimas moribundas pode gerar um navio de ossos. Isso pode ocorrer quando um marinheiro faz súplica final a um deus sombrio ou quando uma divindade aproveita para unir muitas almas de marinheiros mortos num espetáculo destrutivo de poder divino. Quando não criado por intervenção divina, um navio de ossos pode crescer lentamente e organicamente a partir de um dos navios pilotados pelos marinheiros mortos-vivos conhecidos como draugar. À medida que navios draugr assolam os mares e afundam outras embarcações, acumulam mais almas e ossos, até tornar-se navios de ossos. Essas embarcações parecem diferentes de muitos outros navios de ossos, com aparência remendada ou assimétrica.\n\nUm navio de ossos é quase glutão, com apetite incessante por morte, destruição e novas almas para seu número. Esses desejos vêm de uma causa subjacente, imposta pelo criador ou acumulada dos últimos desejos dispersos das almas mortas que o compõem. Por exemplo, uma divindade pode enviar um navio de ossos em missão especial para levar uma mensagem ou eliminar um adversário ou incômodo particularmente persistente. Embora naveguem sobre as ondas, navios de ossos não precisam respirar e podem cumprir missões subaquáticas a mando de seu criador.\n\nNavios de ossos têm reputação lendária entre marinheiros. Esses mortos-vivos podem surgir do nada para causar destruição, e se os corpos de uma tripulação estão ausentes de um naufrágio, a calamidade pode ser atribuída a um navio de ossos. O mar traz a morte de muitos modos, mas a escravidão eterna da alma é destino mais aterrorizante que a morte sozinha.",
    "sections": [
      {
        "id": "famed-bone-ships",
        "title": "Navios de Ossos Famosos",
        "body": "Navios de ossos não escolhem nomes próprios; deuses terríveis que os criam ou marinheiros sortudos o bastante para sobreviver a encontros com eles é que os batizam. Alguns nomes ainda sussurrados em tavernas costeiras:\n\nEpitáfio do Capitão Aster\nMiragem Carmesim\nBaleia Faminta\nArauto do Cavaleiro\nLamento nos Ventos"
      },
      {
        "id": "piloting-a-bone-ship",
        "title": "Pilotar um Navio de Ossos",
        "body": "Quando um navio de ossos é derrotado sem ser destruído, ou é tomado por um morto-vivo mais poderoso, pode ser usado como veículo. Usa Deslocamento e defesas normais e acrescenta as estatísticas a seguir. **Espaço** 30 m de comprimento, 6 m de largura, 7,5 m de altura **Tripulação** 1 piloto, 12 tripulantes **Passageiros** 12 **Teste de Pilotagem** Saber de Navegação (CD 40), Religião (CD 38); a propulsão é vento se usar Saber de Navegação, ou mágica se usar Religião **Colisão** 9d10 de concussão mais 5d6 de vazio (CD 38)"
      },
      {
        "id": "vessels-of-the-vile-gods",
        "title": "Embarcações dos Deuses Vis",
        "body": "Deidades malignas às vezes erguem navios de ossos vinculados a si. Essas capitânias anunciam a destruição feita à vontade do criador. Urgathoa ocasionalmente cria navios de ossos para levar acólitos reverenciados a terras distantes ou culturas no mar. Um dos quatro Cavaleiros do Apocalipse, Caronte o Barqueiro, conta muitos navios de ossos entre seus seguidores. Alguns navegam o Rio Estige em Abaddon, outros transportam apóstolos a outros planos. Os navios de ossos de Caronte se aproximam devagar, em vez de acelerar em direção à presa, dando mais tempo para que os corações de quem os testemunha percam toda esperança.\n\nKelizandri, senhor elemental da água, detém poder sobre os afogados. Dá-lhes novo propósito tripulando navios de ossos, onde podem viver eternamente no instante de sua morte sob as ondas. Seus navios frequentemente sondam as profundezas dos grandes mares, lançando luz verde fantasmagórica na escuridão."
      }
    ]
  },
  "creature-coral-capuchin": {
    "description": "Um coral capuchin lembra um macaco rosa sem pelos, com olhos grandes e asas de morcego. Uma espécie de incômodo tropical, essas criaturas anfíbias seguem navios mercantes na esperança de furtar pequenos objetos de valor para levar para casa ou talvez achar um marinheiro com quem fazer amizade e garantir comida regular.\n\nCoral capuchins vivem em climas tropicais e, embora respirem água ou ar com igual facilidade, a pele membranosa faz com que dependam muito de uma fonte de água próxima. Água doce e salgada servem igualmente, embora as criaturas em geral se agrupem perto de oceanos e mares por outros motivos. Selvas, ilhas e costas quentes são seus locais de nidificação mais comuns, embora escondam ninhos no alto das árvores ou em locais fora do alcance fácil de predadores, necrófagos ou de quem possa roubar os bugigangas que coletaram.\n\nEsses pequenos voadores são insaciavelmente curiosos e adoram seguir humanoides. Capuchins concordam em massa que humanoides têm a melhor comida e as melhores bugigangas. Mais inteligentes que animais e capazes de fala rudimentar, podem ser bastante úteis com o treinamento certo, aprendendo a buscar tesouros submersos ou caçar ratos e outras pragas a bordo. Alguns conjuradores em costas tropicais adotaram coral capuchins como familiares, embora muitos digam que as criaturas dão bem mais trabalho do que qualquer benefício vale. Um familiar capuchin pode furtar componentes de conjuração, gemas, frascos, materiais de criação e outras bugigangas do mestre, embora um mago esperto intercale iscas mais atraentes (e menos valiosas) para desviar a atenção do familiar de itens realmente importantes.\n\nClãs de capuchins vivem sob uma única matriarca, fêmea um pouco maior identificável pela pele incomumente prismática e olhos coloridos. Essas fêmeas recusam ser domadas ou mantidas como animais de estimação e resistem violentamente a qualquer captura. As mais poderosas até possuem poderes divinos que invocam para proteger lar e parentes. Em troca, o restante do clã luta ferozmente pela matriarca, defendendo-a (e suas bugigangas) de ameaças muito maiores que eles.",
    "sections": [
      {
        "id": "coral-capuchin-nests",
        "title": "Ninhos de Coral Capuchin",
        "body": "Os maiores ninhos conhecidos de coral capuchin ficam ao redor dos Shackles e das costas da Mwangi Expanse. Preferindo oceanos salgados a rios ou enseadas de água doce para caçar, coral capuchins demarcam territórios ao alcance de rotas marítimas e locais frequentados por humanoides. O tesouro de um ninho costuma incluir pequenos objetos de valor, como gemas, moedas e joias — qualquer coisa à prova d'água que possam levar com facilidade."
      }
    ]
  },
  "creature-coral-juggernaut": {
    "description": "Moldados a partir de recifes de coral vibrantes e sedimentos antigos, juggernauts de coral são criados tanto para força formidável quanto para aparência impressionante. Com inspiração no design tirada da fluidez e do caos do oceano, esses construtos podem lembrar desde criaturas aquáticas graciosas até amalgamas monstruosas de coral e rocha. Adornados com espinhos afiados de coral e tentáculos fluídos de vida vegetal, têm presença hipnotizante e aterrorizante.",
    "sections": [
      {
        "id": "symbiotic-companions",
        "title": "Companheiros Simbióticos",
        "body": "As fendas e cavidades do corpo espesso de um juggernaut de coral oferecem habitat a várias criaturas marinhas, incluindo enguias elétricas, corais chifre-de-veado e lulas-vampiro. Esses habitantes introduzem perigos adicionais para oponentes presos no aperto do juggernaut. Já impressionante na aparência, a presença dessas criaturas transforma o brutamontes de mero construto em ecossistema simbiótico, amplificando sua beleza temível e aprimorando suas capacidades de modos inesperados."
      }
    ]
  },
  "creature-pelagiadaemon": {
    "description": "Pelagiadaemons, também conhecidos como daemons do afogamento, abraçam a morte pelo sofrimento alheio, alimentando-se da dor de quem perece afogado. De quem é sufocado no isolamento frio das profundezas oceânicas a um corpo pesado preso no fundo de um lago tranquilo, ou até algo tão mundano quanto um rio furioso arrastando um viajante, pelagiadaemons prosperam em todos esses casos. Seus próprios métodos imitam essas mortes: lentos, cuidadosos, metódicos e letais. Esses daemons preferem isolar vítimas, tirando-lhes uma a uma as coisas queridas até que até luz ou calor se tornem memória fraca enquanto lutam só para manter ar nos pulmões.\n\nÀ distância, pelagiadaemons parecem sombreados e indistintos, corpos pellúcidos quase tão amorfos quanto as profundezas aquosas que habitam. Se você se aproxima o bastante de seu corpo pesado e vagaroso, os milhares de braços minúsculos vermelhos e negros com membranas que compõem a superfície do pelagiadaemon entram em foco, dobrando e desdobrando-se uns sobre os outros enquanto sua voz abafada e quieta invade sua mente.\n\nApesar da presença brutal, pelagiadaemons frequentemente se comunicam de boa vontade com mortais, abrindo mão do ganho de curto prazo da morte de um se puderem arranjar, por barganha, tentação ou coerção, mortes contínuas de outros. Tais mortais levam dezenas de novas vítimas a túmulos aquáticos na tentativa de manter poder, vida ou entes queridos. Quando o colaborador mortal deixa de servir, o pelagiadaemon emerge das trevas para arrastá-lo às profundezas oceânicas.",
    "sections": [
      {
        "id": "pelagic-temptations",
        "title": "Tentações Pelágicas",
        "body": "Marinheiros já convocaram pelagiadaemons para pedir segredos ocultos das profundezas do oceano, de navios afundados cheios de tesouro a localizações de ruínas azlanti há muito perdidas. Isso tem um preço: pelagiadaemons não são tolos e tecem cuidadosamente sementes de engano em respostas verdadeiras. Na esperança de encorajar decisões precipitadas alimentando a ganância, oferecem as rotas mais rápidas aos desejos dos interlocutores — só omitindo que costumam ser as mais letais.\n\nMarinheiros experientes anotam e decifram as respostas antes de agir conforme o conselho do daemon; outros são seduzidos pela urgência, ignorando lendas de incontáveis tragédias de outrora. Quanto aos pelagiadaemons, e daí se algum tesouro escapa de vez em quando? São sacrifícios aceitáveis em troca do número de marinheiros que sucumbiram a túmulos aquáticos nas profundezas."
      }
    ]
  },
  "creature-dedalon": {
    "description": "Formados a partir de desejos pungentes e traições traiçoeiras, dedalons agem por impulso emocional em vez de planos de longo prazo. O tipo de traição que forma um dedalon combina com seu próprio interesse egoísta; nos High Seas, costumam nascer de quem liderou motim fracassado ou tentou roubar tesouro valioso dos companheiros de navio. Demônios da traição atuam como agentes dorminhocos de curto prazo, com missões ou alvos específicos, antes de servir outro senhor demoníaco até que a ganância míope prevaleça.\n\nTalvez simbolizando desejos insatisfeitos, dedalons sofrem sede quase inextinguível. Quando hidratados, podem assumir disfarces humanoides impecáveis, mas sem água ficam ressecados e fibrosos, com cabeça encolhida e membros que se torcem para longe do torso de modo perturbador.",
    "sections": [
      {
        "id": "coveted-items",
        "title": "Itens Cobiçados",
        "body": "Quando não estão em disfarce humanoide, um pequeno objeto pode ser visto claramente embutido na carne de um dedalon. Além de ser pequeno o bastante para ficar preso na carne, esses itens não têm características físicas comuns — de lâminas e flechas quebradas a moedas de ouro, anéis e outras bugigangas já foram vistos. Esses itens cobiçados estão ligados à criação do dedalon, e os demônios os protegem acima de tudo. A posse do item cobiçado é a única coisa que oferece ao dedalon algum semblante de autocontrole; se perder contato físico com o item (por ser Desarmado ou ter o item Roubado), torna-se obcecado em recuperá-lo, abandonando todas as outras tarefas enquanto a impulsividade invejosa assume o controle."
      }
    ]
  },
  "creature-flotsam-terror": {
    "description": "Quando o mar é violento e suas correntes fervilham de malevolência, ondas podem chocar-se contra navios e transformar cascos de madeira em estilhaços. Esses naufrágios violentos deixam as almas de centenas de marinheiros presas nos destroços e na carnificina corporal, tudo coalescendo em dezenas de horrores mortos-vivos cruéis, cada um condenado a assombrar as profundezas para sempre. Também conhecidos como perdição do marinheiro ou enxames de jetsam, flotsam terrors derivam pelas ondas, indistinguíveis de detritos e algas inofensivos enquanto buscam sem fim navios que possam arrastar ao mesmo fim amargo que enfrentaram.\n\nEmbora se formem mais comumente no desfecho mortal de um grande naufrágio, onde há matéria-prima em abundância, flotsam terrors também surgiram após outros eventos traumáticos no mar. Motins fracassados, ataques piratas a viajantes inocentes ou até almas de quem sofreu a morte lenta e dolorosa de ficar à deriva podem encontrar-se presas na forma de uma amalgama violenta de detritos. Independentemente da tragédia que levou à criação, um flotsam terror persegue os mares faminto por vingança contra um mundo injusto, buscando outros sofredores cujas mortes indevidas o farão juntar-se à cruzada sangrenta e interminável pelo mar.",
    "sections": [
      {
        "id": "lost-at-sea",
        "title": "Perdidos no Mar",
        "body": "A maior parte de um flotsam terror é composta de madeira estilhaçada e pregos de um navio, mas qualquer coisa a bordo pode acabar nessa massa. Quando algo valioso se perde no mar e não pode ser recuperado do naufrágio, pode ter sido arrastado para um flotsam terror conforme ele se formava das almas inquietas da catástrofe. Muitos flotsam terrors escondem pequenos objetos de valor como joias, talheres de prata, moedas e gemas preciosas emaranhados nos demais destroços."
      }
    ]
  },
  "creature-gutaki": {
    "description": "Gutakis são cefalópodes aquáticos grandes cuja malícia por outras criaturas transparece em olhos azul-gelo. Com corpos roxo-avermelhado profundo, têm olhos temíveis, mas ainda mais assustadores são seus sete tentáculos contorcidos, cada um repleto de ganchos farpados inumeráveis. O corpo de um gutaki adulto tem cerca de 3 m de comprimento e pesa, em média, 225 kg. Devido ao tamanho e coloração, gutakis vivem e caçam nas profundezas mais escuras dos oceanos de Golarion, onde melhor se camuflam da presa. Porém, sobem à superfície quando seus habitats são perturbados ou superpescados. Quando o fazem, esses cefalópodes enormes sobem ousadamente aos convés de navios ou cais vazios para devorar qualquer coisa que se mova.\n\nEssas criaturas não são meros animais. Gutakis são inteligentes o bastante para entender vários idiomas e às vezes até falam com quem estão prestes a devorar. Seus padrões de fala, porém, são tão incomuns que quem os ouve pode confundir os sons com um balbuciar que só se assemelha à fala. Oceanógrafos que estudaram gutakis sabem que costumam misturar palavras de idiomas diferentes e que suas frases não respeitam sintaxe nem gramática. Com algum conhecimento e concentração, é possível entender as ameaças vis e declarações de fome que um gutaki profere... se você ainda não estiver sendo devorado vivo.\n\nA inteligência, coloração e temperamento dos gutakis levam muitos a crer que nasceram de influência demoníaca, possivelmente de uma antiga brecha planar para o Inferno ou os Vórtices Exteriores. Por isso, alguns os chamam de \"peixes-diabo\", enquanto outros fazem de tudo para evitar essas criaturas.",
    "sections": [
      {
        "id": "devilfish-cuisine",
        "title": "Culinária de Peixe-Diabo",
        "body": "Embora gutakis tenham inteligência comparativamente maior que a de um animal comum, alguns chefs sem coração pagam altas quantias por tentáculos de gutaki para preparar e vender a clientela elite (e igualmente sem escrúpulos). A forma mais popular de preparar peixe-diabo é refogá-lo em pimentas e especiarias fortes e servi-lo sobre massa ou arroz. A intenção é criar uma refeição picante o bastante para evocar os fogos demoníacos dos quais o gutaki recebeu o apelido."
      }
    ]
  },
  "creature-lunar-consort": {
    "description": "Sob o brilho pálido do luar, um lunar consort é criatura que reflete a beleza pura da natureza. Toma a forma de humanoide alto e esguio em um vestido perolado fluído que cintila ao refletir os raios de lua de volta ao céu. Por mais atraente que a lua o torne, o poder de um lunar consort não deve ser subestimado. Esses espíritos inquietos são incomuns, criados quando um mortal se afoga sob a luz de lua cheia. Conforme a pele começa a se descolar pela imersão prolongada, uma combinação de luar etéreo e energia de vazio transforma essa pele em ectoplasma gossamer, que o morto-vivo envolve ao redor do corpo como veste cintilante.\n\nFiel ao nome, lunar consorts apreciam a companhia das vítimas antes de se entregar ao banquete. Flertam com a presa infeliz com lisonjas ou compartilhando segredos da vida anterior, tentando empatizar para que baixem a guarda antes do ataque para se alimentar. Quem cativa os lunar consorts é recompensado tornando-se companheiro após a morte. Drenam todos os fluidos corporais e preservam os corpos desidratados. Lunar consorts às vezes guardam esses restos para companhia, escondidos em grutas isoladas e outros covis onde bolsões de ar ficaram presos.\n\nEmbora esses mortos-vivos retornem aos esconderijos em noites sem lua, preferem ficar submersos no resto do tempo. Propulsionam-se na água ondulando camadas de pele como águas-vivas. Quando famintos, nadam até a superfície junto a assentamentos costeiros ou barcos, deixando parte da pele flutuando como vestido sedoso, e se movem para chamar a atenção das vítimas. Lunar consorts então usam a carne para agarrar quem se aproxima e afogá-los.",
    "sections": [
      {
        "id": "the-beauty-on-the-shore",
        "title": "A Beleza na Margem",
        "body": "Como criaturas noturnas, lunar consorts dormem de dia submersos e emergem com a lua. Nessas noites iluminadas pela lua, preferem ficar em terra, contemplando a lua até o amanhecer. Ao longo dos anos, esse comportamento gerou muitos contos da dama à beira da água, chamando por seu amor perdido. Dependendo da história, podem ser pegadas na areia ou um fantasma caminhando às margens de lagos e rios, mas o aviso é o mesmo: se atender ao chamado, não verá o amanhecer do dia seguinte."
      }
    ]
  },
  "creature-naval-crew": {
    "description": "Toda marinha precisa de uma tripulação naval bem treinada e disciplinada. Infelizmente, a maioria dos chamados pelo mar é um grande ajuntamento de desajustados, rejeitados e rebeldes que buscam escapar das estruturas ou perigos da terra, então desenvolver trabalho em equipe e coordenação exige esforço enorme. Os adversários que uma tripulação naval enfrenta em geral não têm a mesma disciplina. Enquanto tripulações piratas improvisadas se destacam em agressão, improviso e até truques sujos, sua onda avassaladora muitas vezes quebra contra o recife inabalável de uma tripulação naval de verdade.\n\nEmbora cada marinha tenha regimentos de treinamento e prioridades próprias ao montar esses esquadrões disciplinados, a maioria concorda que a mesma combinação de equipamento é a mais eficaz: cutelos robustos perfeitos para cortar cabos de abordagem, combate corpo a corpo abaixo do convés e a oportunidade de armas mais ornamentadas preferidas por oficiais, junto com uma salva de bestas pronta para acertar um pirata fugitivo pelas costas ou surpreender um bando de malfeitores.",
    "sections": [
      {
        "id": "black-powder-crew",
        "title": "Tripulação de Pólvora Negra",
        "body": "Marinhas podem usar conexões com Alkenstar ou outras regiões produtoras de armas de fogo para equipar forças com pistolas em vez de bestas. Para uma tripulação naval equipada com pistolas de pederneira, substitua Salva de Bestas por Salva de Pistolas. Como em geral preferem balas soltas e pólvora à despesa de cartuchos, não podem disparar as pistolas repetidamente.\n\n**Salva de Pistolas** **Frequência** uma vez a cada 10 minutos; **Efeito** A tripulação naval saca e dispara pistolas de pederneira em uma explosão de 3 m dentro de 12 m, causando 7d4 de dano perfurante (CD 23 de Reflexos básico). Cada criatura usa o mais fraco entre sua resistência ou imunidade a perfurante ou concussão, e quem falhar criticamente no teste sofre 10 de dano perfurante adicional após dobrar. Quando a tripulação naval é reduzida a 2 segmentos ou menos, essa área diminui para uma explosão de 1,5 m."
      }
    ]
  },
  "creature-scylla": {
    "description": "Tão temidas quanto elusivas, scyllas usam ilusões e habilidades mentais para atrair navios à ruína. Essas aberrações inteligentes e horripilantes tomam a forma de humanoides belos com cabeças caninas alinhadas na cintura e tentáculos contorcidos em vez de pernas. Espreitam ao longo de rotas marítimas importantes, nas rochas afiadas ou nas profundezas turvas de passagens estreitas enquanto aguardam pacientemente a próxima presa.",
    "sections": [
      {
        "id": "fortunate-flora-and-fauna",
        "title": "Flora e Fauna Afortunadas",
        "body": "Ao contrário do que muitos supõem, devastação ou falta de vida marinha não é sinal de scyllas próximas. Na verdade, muitas vezes é sinal do oposto. Uma vez encontradas, scyllas são dissuasão significativa para a maioria dos marinheiros e navegantes que ouviram até um rumor de sua presença. Essa falta de intrusão permite que a vida marinha nessas partes do oceano floresça. Recifes, peixes, corais e muitas outras formas de flora e fauna marinha buscam os locais das scyllas para estabelecer lares seguros. Quanto maior a biodiversidade de um lugar, mais provável encontrar uma scylla, ou até grupos maiores, em suas profundezas."
      }
    ]
  },
  "creature-silt-frog": {
    "description": "O silt frog é um sapo superdimensionado que faz lar nas margens ricas em silte ao longo de lagos e rios nas ilhas dos High Seas. Embora forma e marcas sejam indistinguíveis de outros sapos comuns da região, identificam-se facilmente pelo tamanho prodigioso. Silt frogs são altamente territoriais, e é conhecimento comum que um silt frog até intimida a própria prole se ela não abandonar o território dos pais ao atingir a maturidade. Embora possam se alimentar de aves, morcegos, lagartos e outras criaturas pequenas, preferem devorar qualquer coisa mágica em vez do mundano. Quanto mais forte a magia que detectam — seja em criaturas, magias ou outro —, mais voraz fica a fome prodigiosa do sapo, insaciável por qualquer outra coisa. Com essa habilidade inata como sensor mágico altamente preciso, criação de silt frogs não é incomum, pois criá-los pode ser empreendimento lucrativo para quem aceita lidar com a agressão territorial. Se expostos repetidamente à mesma magia e fontes, um silt frog pode dessensibilizar-se a elas, tornando-se criatura que até os conjuradores mais avançados querem manter por perto, usándo-o como guarda contra infiltrações mágicas e alerta quando visitantes inesperados aparecem.\n\nGraças à dieta incomum, silt frogs representam ameaça única a criaturas mágicas sencientes. Muitos sprites ou puppet encontraram-se abruptamente devorados por um silt frog selvagem que nem nota a diferença entre eles e um familiar convocado. Por esse perigo, a maioria das ancestralidades com magia inata evita cuidadosamente os pântanos e rios dos High Seas e especialmente vilas onde silt frogs são criados e treinados. Sprites que vivem na região, atraídos pelo tesouro abundante e tripulações fáceis de pregar peças, muitas vezes protegem cidades e vilas com defesas elaboradas para manter silt frogs famintos afastados — embora até essas medidas sejam propensas a falhar, e assentamentos podem ser abruptamente dizimados por um predador grande e determinado o bastante.",
    "sections": [
      {
        "id": "raising-silt-frogs",
        "title": "Criar Silt Frogs",
        "body": "Ovos de silt frog são verdadeiros tesouros, pois só podem ser domesticados se criados desde o nascimento. Silt frogs selvagens tornam-se rapidamente temperamentais demais ao viver perto de pessoas, soltando desafios trovejantes a quem caminha perto das bordas de seu território. Se treinados desde o nascimento, podem aprender a compartilhar território com outros e acostumar-se a espaços menores, como cabine de capitão ou torre de mago, mas ainda são mais felizes com grande extensão de terra e corpo d'água para dominar. Vilas remotas podem ter linhagem de domadores de silt frog que mantém ambiente para um único sapo proteger a vila de ameaças mágicas. Esses sapos são muito honrados, com aldeões contando como os ancestrais dessas criaturas folclóricas amadas salvaram a vila de magos maliciosos ou maldições que mudam o destino."
      }
    ]
  },
  "creature-aurosrath": {
    "description": "A ganância pode ser força poderosa; os runelords antigos até criaram escola de magia baseada nela. Quando alguém morre cercado de riqueza em massa, a ganância pode até reanimar os mortos — avareza suficiente ancora a alma do falecido ao corpo. O resultado é um aurosrath, ser tão consumido pela ganância que se recusa a doar o cadáver ao ciclo natural.\n\nO folclore popular sobre a criação de um aurosrath muitas vezes retrata um avarento ironicamente esmagado pelo peso do próprio ouro. Embora origens poéticas assim possam ocorrer, a verdade costuma ser mais sombria. Paranoia sobre ladrões e parasitas leva ao isolamento, mental e físico. Um mercador rico sucumbe a doença comum por não pagar médico ou sacerdote. Outro morre de fome, incapaz de escapar da teia de armadilhas e barreiras que armou para defender o tesouro de ladrões.\n\nAnunciado pelo tilintar de moedas, um aurosrath aparece como cadáver inchado vestido com finura desbotada, volume quase estourando pelas costuras com moedas manchadas. As vozes costumam ser baixo estrondoso, fala salpicada de girias arcaicas da alta sociedade. São obstinados no desejo de acumular riqueza, mas podem ser razoados enquanto acreditarem que esse objetivo será satisfeito. Um aurosrath costuma assombrar as propriedades que possuía em vida. Não tolera competição na acumulação de riqueza e rapidamente recorre à violência ao encontrar outros da espécie. Essas monstruosidades, porém, ocasionalmente comandam lealdade de mortos-vivos menores e até servos mercenários mortais.",
    "sections": [
      {
        "id": "phantom-coins",
        "title": "Moedas Fantasma",
        "body": "A característica mais marcante de um aurosrath são as incontáveis moedas que enchem seu cadáver. A maioria de quem se torna aurosrath morre por motivos outros que ser esmagada pela própria riqueza, mas ainda manifestam essas moedas na não-vida. A mente de quem ressuscita como aurosrath deseja riqueza a ponto de produzir fac-símiles das moedas que enchem o corpo. Infelizmente, essas moedas desaparecem ao sair do corpo do aurosrath, pois se desconectam de sua mente."
      }
    ]
  },
  "creature-beiran-frosthunt": {
    "description": "Com pele azul-pálida e cabelo branco, os fey beiran perversos estão entre os mais cruelmente impetuosos descendentes do Primeiro Mundo. Comumente chamados de fey do gelo, esses trapaceiros invernais são sádicos e sem remorso no desejo de espalhar o frio por onde passam. Beirans acham temperaturas congelantes as mais confortáveis; o fato de outras criaturas sofrerem nessas condições faz parte da diversão. Embora um único beiran seja improvável de mudar a temperatura de um espaço em mais que alguns graus, são criaturas muito sociais, e é incomum encontrar menos que algumas dezenas ao mesmo tempo.\n\nEmbora sejam descaradamente grosseiros, há um tipo de criatura a quem se curvam e obedecem sem questionar: bruxas do inverno. Por razões desconhecidas, beirans são particularmente subservientes a essas bruxas e frequentemente se aglomeram em grande número ao redor de uma. Sob uma bruxa do inverno, os fey pioram uma onda de frio para uma cidade sofredora. Fogueiras são apagadas, madeira estragada, comida roubada — tudo conforme os gostos misteriosos da bruxa e sua preferência por paisagens sem alegria. O que os beirans ganham dessa relação é incerto, embora alguns acadêmicos fey acreditem que os primeiros beirans foram criados por bruxas do inverno, assim como os homens verdes criaram leshies.\n\nBeirans são mais comuns em terras do norte como Irrisen e a Terra dos Reis Linnorm, mas também têm presença surpreendente nos Shining Kingdoms. Quando a rainha Elvanna de Irrisen abriu portais para o Inverno Eterno de Irrisen, vários chegaram à cidade de Heldren em Taldor e, até hoje, alguns ainda assombram as matas ao redor. Dezoito anos atrás em Falcon's Hollow, um bando particularmente cruel de beirans esteve envolvido no Carnaval das Lágrimas, circo gelado que deixou muitos moradores mortos antes que aventureiros o desmantelassem. Invernos em Kyonin são frequentemente anunciados por enxames de beirans tocados por demônios vindos do Tanglebriar, deixando os Wylderhearts em serviço fey por meses.",
    "sections": [
      {
        "id": "winter-gatherings",
        "title": "Reuniões de Inverno",
        "body": "Quando vários grupos beiran se reúnem, podem aprimorar a capacidade de produzir temperaturas mais frias. Se pelo menos dois frosthunts se reunirem a até 30 m um do outro e passarem 1 semana de tempo livre focando habilidades primais, a área de frio fora de estação dobra de tamanho. Frosthunts adicionais podem aumentar essa área, até no máximo quatro vezes o tamanho original. A área permanece aprimorada enquanto os frosthunts ficarem a até 30 m uns dos outros. Podem manter o aprimoramento gastando coletivamente 1 dia de tempo livre por mês. Se os frosthunts se separarem ou deixarem de manter o aprimoramento, a área volta ao tamanho normal após 1 dia."
      }
    ]
  },
  "creature-bibliodaemon": {
    "description": "Bibliodaemons são daemons com quatro braços, parecidos com doninhas, que personificam a morte por papelada e burocracia incompetente. São frequentemente atraídos a lugares onde burocratas abusam do poder ou cortam caminhos às custas dos cidadãos. Disfarçando-se de funcionários do governo, bibliodaemons pioram os problemas, falsificando ou perdendo documentos importantes e escalando a complexidade da burocracia. Eventualmente, infrações graves — como prisão ou execução de inocente — começam a despedaçar a comunidade. O povo cai em paranoia e desconfiança dos oficiais, levando a revolta contra governos locais ou apatia completa pela falta de poder de mudar algo.\n\nA maioria dos bibliodaemons trabalha sozinha para causar esse caos, mas em alguns casos esses demônios foram usados estrategicamente. Afinal, uma vez que a área entra em tumulto, é fácil para outra parte intervir e tomar o controle. Durante a guerra civil em Cheliax, bibliodaemons foram às vezes convocados para desestabilizar áreas em disputas por poder. Embora ninguém admita, bibliodaemons estiveram presentes nas várias mudanças de governo pelos Shining Kingdoms.",
    "sections": [
      {
        "id": "preventative-measures",
        "title": "Medidas Preventivas",
        "body": "O medo de bibliodaemons percorre grande parte dos governos dos Shining Kingdoms, fomentando várias superstições para impedir que corrompam o trabalho diário.\nA partir do primeiro dia em um cargo novo, deve-se caminhar pelo perímetro do distrito designado três vezes por semana durante um mês.\nSe encontrar uma doninha, não deve retornar ao escritório pelo resto do dia para impedir que o daemon entre junto com o oficial.\nAprender falcoaria ou possuir ave de rapina pode tornar o oficial mais alerta a erros omitidos ou mais vigilante contra o demônio."
      }
    ]
  },
  "creature-corbayrant": {
    "description": "Corbayrants são criações da Mãe Verde, uma dos fey chamados os Mais Antigos. Na Era da Criação, ela os moldou de espinhos e musgo em predadores mortais. Quando gnomos migraram para o Universo mortal, muitos corbayrants seguiram, mas acharam-se mal adaptados à vida fora do Primeiro Mundo.\n\nCorbayrants são historicamente criaturas solitárias e territoriais. São incapazes de se reproduzir e, sem as propriedades revivificantes do Primeiro Mundo, seus números estão condenados a diminuir. Recentemente, vários corbayrants na Floresta Verduran superaram sua natureza para se unir. Têm sido vistos levando presas vivas, sacrificando vítimas em experimentos vis em tentativa de encontrar modo de propagar os corbayrants.\n\nCorbayrants parecem escorpiões enormes sem garras, cobertos de casca e espinhos. Uma névoa podre exala de seus corpos. Na rara ocasião em que dignam-se falar, fazem-no em sussurro rouco.",
    "sections": [
      {
        "id": "life-in-exile",
        "title": "Vida no Exílio",
        "body": "Durante a Era da Angústia, conforme corbayrants seguiram gnomos ao Universo mortal, os Mais Antigos — exceto a Mãe Verde — agiram para impedir que retornassem, cortando seu vínculo com o Primeiro Mundo e tornando impossível que essas criaturas voltassem por vontade própria. Não está claro por que esses Mais Antigos impuseram esse destino aos corbayrants, mas desde então muitos souberam do papel dos outros Mais Antigos em seu exílio e juraram vingança às divindades."
      }
    ]
  },
  "creature-failed-prophet": {
    "description": "Seguir os ensinamentos de Kalistrade é compromisso vitalício. Exige adesão estudiosa às estritas regras e tabus das Profecias. A recompensa final para os devotos é a promessa de um além personalizado, cheio de riqueza vitalícia e livre do julgamento de Pharasma. Nem todos que aprendem essas revelações finais estão à altura da tarefa. Para os afortunados, a única consequência de errar o ritual é morte simples. Para os menos afortunados, o resultado é meia-vida imortal de tormento. Preso entre uma paródia distorcida do além imaginado e o Universo mortal, um failed prophet não conhecerá paz até que seu corpo seja destruído.\n\nUm failed prophet lembra o cadáver sem pele de um humanoide coberto de fissuras douradas brilhantes semelhantes a veias. Em inspeção mais próxima, órgãos e musculatura são anormalmente lisos e brilhantes, como couro curtido e polido.",
    "sections": [
      {
        "id": "broken-prophets",
        "title": "Profetas Quebrados",
        "body": "Muitos kalistocratas que completaram com sucesso o ritual da morte despertaram recentemente de suas tumbas. O momento de sua emergência alinha-se de modo próximo demais à Chuva dos Deuses para ser coincidência. Esses chamados Profetas Quebrados vagam por Druma como se buscassem algo. Suas paisagens mentais permanecem em grande parte intactas, embora cada uma agora contenha um indivíduo cornuto sinistro pairando à distância. Todas as tentativas de se aproximar da figura fazem-na desaparecer ou recuar. Ao contrário dos failed prophets mais comuns, essa variedade tem cura de vazio e não é imune a cura, vitalidade ou vazio."
      }
    ]
  },
  "creature-goldpebble": {
    "description": "Goldpebbles são cobras aquáticas grandes cujos corpos, ao olho desatento, parecem nada mais que pedras de rio, algumas cintilando com traços de ouro. Essas criaturas aterrorizantes mimetizam o ambiente natural para emboscar aventureiros gananciosos.\n\nUma alquimista taldan criou o goldpebble com o objetivo final de criar criatura capaz de se reproduzir em alta taxa enquanto possuía corpo que se transformaria em ouro na morte, garantindo suprimento infinito de riqueza. Inicialmente os experimentos foram bem-sucedidos: cada troca de pele da cobra produzia traços de ouro. Conforme as cobras cresciam, porém, a quantidade de ouro não aumentou, e as próprias cobras tornaram-se difíceis de conter. Sem impedimentos, a alquimista redobrou esforços, adicionando reagentes alquímicos e recorrendo a táticas mais desumanas. Essas táticas não aumentaram o ouro produzido, mas mutaram o veneno das criaturas, dando-lhes capacidade de transformar lentamente o sangue da vítima em água congelada. Empoderadas com essa habilidade, as goldpebbles derrubaram a própria criadora e escaparam para se espalhar pela região do Mar Interno.\n\nGoldpebbles são em geral solitárias, exceto na estação de acasalamento semestral. Nessa época são ainda mais perigosas, tornando-se territoriais e protetoras das crias enquanto atacam em grupo. Após a eclosão, os locais de reprodução ficam cheios de centenas de cobrinhas minúsculas buscando novo território. Essas goldpebbles jovens controlam menos seus poderes alquímicos que as adultas e podem congelar a água ao redor num instante.\n\nGoldpebbles dependem muito de táticas de emboscada. Frequentemente escondidas em poças rasas, rios e lagos, atraem aventureiros desavisados com escamas salpicadas de ouro. Uma vez ao alcance, atacam com mordida horrível que pode envenenar a vítima, transformando lentamente o sangue da presa em água gelada. Também podem resfriar as águas ao redor, tornando muito difícil para a presa sobreviver.",
    "sections": [
      {
        "id": "gempebble",
        "title": "Gempebble",
        "body": "Um efeito colateral interessante do ciclo reprodutivo do goldpebble é a capacidade de se adaptar a ambientes diferentes. Após período de migração, alguns goldpebbles estabeleceram-se nas cavernas profundas das Five Kings Mountains. Devido à manipulação das escamas mineralizadas pela criadora alquimista, as escamas desses goldpebbles são riscadas de gemas ou outras pedras preciosas. Alguns clãs anões tentam usar a natureza adaptativa dessas feras para minerar em áreas perigosas ou compactas demais para mineiros anões. Libertam cobras jovens nessas áreas e colhem gemas dos gempebbles totalmente crescidos. Gempebbles, porém, são tão propensos a atacar os colhedores quanto seus primos dourados."
      }
    ]
  },
  "creature-lamp-blighter": {
    "description": "Lamp blighters são pequenas criaturas fey que assombram lugares escuros. Com presas pronunciadas, garras longas e asas de mariposa desbotadas e rasgadas, lembram pixies de pesadelo. Raramente ultrapassam 60 cm de altura, e a tendência de pairar no ar na altura dos olhos das vítimas faz com que poucos aventureiros encontrem um lamp blighter atacando do chão. Deleitam-se em arrancar globos oculares dos órbitas e frequentemente enfileiram os olhos das vítimas em colares que usam com grande orgulho. Ocasionalmente reciclam a energia de fogueiras apagadas em ataques baseados em chama; como lamp blighters desprezam luz, costumam recorrer a isso só em desespero.\n\nHá muito tempo, os seres parecidos com pixies que se tornariam lamp blighters habitavam o Universo em paz, encantados em fazer lar na natureza. Conforme civilizações gradualmente invadiram a natureza, muitos desses pixies fugiram para o Primeiro Mundo — mas alguns permaneceram. Ao testemunharem a destruição dos ambientes que amavam, amargura e malevolência cresceram neles. Eras passaram, e o desejo de vingança roeu seus corações. Puseram dentes afiados como flechas a propósitos cruéis; usaram garras para fins perversos. Passaram a odiar as luzes da civilização, mágicas e mundanas, e voltaram a mente aos modos como a própria escuridão poderia auxiliá-los na vingança. Assim surgiram os primeiros lamp blighters, e assim permanecem até hoje.",
    "sections": [
      {
        "id": "treacherous-tactics",
        "title": "Táticas Traiçoeiras",
        "body": "Embora a maioria dos lamp blighters prefira espreitar na escuridão, alguns ocasionalmente se disfarçam de pixies amigáveis para atrair aventureiros desavisados a uma armadilha. Costumam conseguir isso com uso inteligente de sombras, cobrindo o rosto com as asas e pantomima exagerada. A ilusão muitas vezes se desfaz quando um lamp blighter se frustra e revela a boca cheia de presas."
      }
    ]
  },
  "creature-shroudwing": {
    "description": "Essas aves perturbadoras são criaturas de corpo espesso e pernas longas, com 1,2 a 1,5 m de altura e envergadura de 2,4 m. Possuem penas negras, olhos brancos turvos e bico de obsidiana ameaçador, curvado na ponta como garra enrolada. Às vezes chamados de corvos comedores de almas, shroudwings são necrófagos conhecidos por vagar por cemitérios e locais de morte coletiva, absorvendo espíritos remanescentes e consumindo cadáveres em decomposição. Podem ser vistos desenterrando túmulos, cavando terra e arrombando caixões ou tumbas com bicos enormes e curvos, além de espreitar em locais de execução, montes funerários ou se alimentar de cadáveres de viajantes abandonados à beira de estradas.\n\nDevido ao tamanho, forma e propensão a terrenos funerários, não é incomum confundir um shroudwing com viúva em luto à distância — só quando uma criatura infeliz se aproxima o bastante descobre o perigo. Embora não sejam predadores nem agressivos de imediato, shroudwings são excepcionalmente territoriais; protegerão e defenderão tanto o local de alimentação quanto a área de nidificação de quem invadir.\n\nEmbora muitos conheçam essas aves incomuns pelo nome e pela aparência, ainda mais conhecem o shroudwing pelo som. Quando ameaçados, shroudwings emitem um chocalhar assombroso e indutor de medo audível a quilômetros. Preferem nidificar em matagais cobertos, e a estação de acasalamento ocorre nos meses de inverno. Shroudwings têm particular apreço pela coleção de crânios e são conhecidos por decorar ninhos com eles e usá-los em rituais de acasalamento, com o macho apresentando à fêmea o crânio mais fresco e limpo que encontrar.",
    "sections": [
      {
        "id": "death-rattle",
        "title": "Chocalhar da Morte",
        "body": "Um shroudwing depende de ingerir fragmentos ósseos dos cadáveres da refeição para atuar como gastrolitos. Com bico e garras afiadas como navalha, rasca ossos em pedaços pequenos o bastante para engolir inteiros, que ajudam a moer e digerir a comida. A presença desses fragmentos esqueléticos engolidos cria o chocalhar assombroso da chamada infame do shroudwing. Com o tempo, conforme esses fragmentos ficam mais lisos pelo uso (e portanto menos eficazes), o shroudwing vomita os pedaços quase polidos em troca de outros mais frescos e serrilhados. Para adoradores de Urgathoa, esses fragmentos descartados são preciosos, coletados e usados não só para fins cerimoniais, mas também decorativos, como joias."
      }
    ]
  },
  "creature-torn-quartet": {
    "description": "A guilhotina é o epítome da pena capital em Galt. Apesar da reputação hedionda, a maioria dos cidadãos a considera meio limpo e eficiente de execução política — pelo menos comparado às outras opções. Uma alternativa é o desmembramento a cavalos, método em que cada um dos quatro membros da vítima é amarrado a um cavalo diferente. Os cavalos são então estimulados a correr em direções opostas, com resultados agonizantes e horripilantes para o condenado. O foco de dor e ressentimento de tal morte às vezes reanima em monstro conglomerado incomum. Nunca mais inteiro de verdade, um torn quartet é simplista no desejo de infligir violência, geralmente começando por quem foi responsável por sua morte.\n\nUm torn quartet aparece como quatro pedaços flutuantes de cadáver humanoide, amarrados por cordas de energia espectral que cada uma ostenta um único membro. Uma seção pode incluir cabeça, mas é em grande parte não funcional. Quando uma seção é separada das demais, cai ao chão e se contorce até ser reunida.",
    "sections": [
      {
        "id": "deathly-masses",
        "title": "Massas da Morte",
        "body": "O método hediondo de execução não é exclusivo de indivíduos. Em alguns casos, várias pessoas são desmembradas a cavalos simultaneamente. Há relatos de que essas execuções em grupo resultaram em múltiplos torn quartets de uma vez. Em vez de funcionar como mortos-vivos individuais, os quartets se amontoam, compartilhando membros como uma única criatura massiva. Essas turbas despedaçadas são particularmente poderosas e capazes de dezenas de ataques ao mesmo tempo."
      }
    ]
  },
  "creature-vorvorak": {
    "description": "Quem invade canais abandonados pode deparar-se com um vorvorak, criatura grande que lembra dragão ou crocodilo. Essas feras territoriais guardam tesouros que disfarçam com ilusões mágicas, usando talento natural para conjuração. Frequentemente confundidos com dragões, vorvoraks são comumente chamados de dragões de canal ou dragões de lama. Porém, não são verdadeiramente parentes de dragões, e sim evoluíram de crocodilos locais e exposição à magia inata na região de Taldor.\n\nVorvoraks são solitários, preferindo caçar no início da manhã ou fim da tarde. Em geral fazem covil em áreas com alguma submersão. Esses lugares permitem esconder os tesouros e usar corpos marrons e musgosos como camuflagem natural. Devido à evolução e contaminação mágica, vorvoraks têm habilidades mágicas inatas limitadas, permitindo controlar a água ao redor e infundi-la com bile venenosa.\n\nTodos os vorvoraks compartilham traço comum: acumular tesouro. Muitos enchem covis com moedas, gemas e qualquer coisa brilhante tomada das vítimas; alguns tesouros antigos contêm relíquias das nações imperiais ao redor. A condição dos itens não importa para vorvoraks; um tesouro pode conter tralha tanto quanto itens de valor real.\n\nUm vorvorak totalmente crescido tem cerca de 7,2 m de comprimento e pesa aproximadamente 1.350 kg, com escamas marrons lamacentas, pescoço serpentino e barbatanas duras nas costas que lembram asas.",
    "sections": [
      {
        "id": "draconic-heritage",
        "title": "Herança Dracônica",
        "body": "Durante a Peste dos Dragões (3660–3672 ar), Taldor enfrentou ataques intensos de multidões de dragões frenéticos. As áreas entre o norte de Taldor e a Floresta Verduran foram as mais afetadas. A região tornou-se brutal em tentativas de matar todos os dragões, levando quase à extinção de dracos e dragões em Taldor. Essa mudança no ecossistema, nos anos antes do reaparecimento dos dragões, levou à evolução dos vorvoraks. Magia infundida no ecossistema fez vorvoraks evoluírem de crocodilos nativos da região e deu à espécie suas habilidades mágicas únicas."
      }
    ]
  },
  "creature-walcofinde": {
    "description": "Para sempre enterrados, walcofindes são criaturas mortas-vivas vingativas que habitam os espaços fechados onde foram selados e eventualmente pereceram. Como sucumbiram a morte lenta por fome e sufocamento, walcofindes são semelhantes a zumbis em fome e fúria. O que os distingue são garras vis de osso afiado como pedra, protrudindo por dedos desgastados e sem carne resultado de tentativas desesperadas e fúteis de escapar.\n\nWalcofindes estão vinculados ao local da morte. Esses mortos-vivos \"em caixão na parede\" podem manifestar formas dentro da estrutura onde foram selados, possuindo as paredes e atravessando-as furtivamente. As manifestações dos walcofindes adotam a aparência padronizada dos materiais da estrutura, mas não suas propriedades físicas. Tomam a forma de torsos humanoides famintos e agarradores emergindo das paredes como extensões horripilantes de sua prisão eterna. Incapazes de jamais deixar totalmente suas estruturas, esses mortos-vivos estão destinados a fazer parte delas para sempre.\n\nApesar das formas em decomposição, walcofindes retêm a inteligência que teriam em vida; por exemplo, um walcofinde que foi soldado pode entender táticas inimigas e avaliar aparência e equipamento dos adversários, permitindo estrategizar e priorizar alvos, além de organizar-se com outros walcofindes próximos para formular um ataque.",
    "sections": [
      {
        "id": "eternal-guardian",
        "title": "Guardião Eterno",
        "body": "Embora muitos saibam que imuramento é forma lenta e horrível de punição, há outros relatos desse processo usado em ritos culturais ou divinos. Os enterrados vivos às vezes eram sacrifício consciente para conferir força a uma estrutura, abençoar sua construção ou tornar-se guardião morto-vivo dela. Ressurgir como walcofinde, conforme as circunstâncias, podia ser considerado honra, dom dos deuses que permite à criatura continuar fortalecendo ou defendendo um local mesmo após a morte. Embora humanos sejam praticantes comuns desse rito, anões e halflings também participaram historicamente."
      }
    ]
  },
  "creature-agyra": {
    "description": "A Tempestade Eterna\n\nAgyra é um kaiju massivo que protege a Ilha Spinescar e seus habitantes.",
    "sections": []
  },
  "creature-immortal-trickster": {
    "description": "O Trapaceiro Imortal\n\nO Trapaceiro Imortal é um guia espiritual imortal que sempre retorna à vida não importa como seja morto. Após sua morte, frequentemente se reconstitui na mesma área, embora se seu corpo for destruído por completo, às vezes desperta em um continente inteiramente diferente.",
    "sections": []
  },
  "creature-mythic-gogiteth": {
    "description": "Gogiteths são pesadelos horripilantes com pernas aracnídeas agarradoras, dentes truculentos e olhos em excesso. De todas as criaturas de Golarion para as quais a aquisição de poder mítico poderia ser pesadelo para outros, o gogiteth é, sem dúvida, um dos mais terríveis.\n\nNormalmente, as vítimas de um gogiteth pelo menos têm a possível salvação de ouvir o estalo e estalo horríveis de suas articulações enquanto ele se arrasta na escuridão — oportunidade de fugir do pesadelo babante que os busca. Gogiteths emboscadores míticos, porém, são antinaturalmente silenciosos. O primeiro som que uma criatura pode ouvir ao ser caçada por tal monstruosidade é o sibilante curto de sua própria respiração fugaz quando as mandíbulas do gogiteth se fecham ao redor dela, ou o rasgar de carne e roupa quando uma de suas pernas a perfura.\n\nEmbora pouco se saiba sobre as origens dos gogiteths, gogiteths míticos em geral adquirem poder mítico como outras criaturas. Golarion não tem escassez de divindades vis que se deleitariam em conceder um fragmento de poder mítico a criatura tão medonha e terrível quanto um gogiteth. Seus covis tradicionais de colmeia nas Terras Sombrias tornam improvável que sejam afetados pela Chuva dos Deuses, mas não é impossível que gotas do sangue derramado de Gorum se infiltrem por fissuras até as mandíbulas sedentas de um desses monstruosidades horripilantes.",
    "sections": []
  },
  "creature-mythic-griffon": {
    "description": "Grifos são feras régias reverenciadas como símbolos de liberdade e força em muitas culturas. São visualmente impressionantes, com a parte traseira de leão e cabeça, asas e membros anteriores de grande ave de rapina — tipicamente águia, embora alguns tenham traços de falcão, falcão-de-pescoço-vermelho ou até osprey ou abutre. Em casos raros, a parte traseira do grifo pode lembrar outro grande felino, como leopardo ou tigre. As variações parecem conformar-se ao ambiente do grifo — por exemplo, grifos especialmente raros do norte de Avistan têm a parte traseira de um lince de Grungir e a parte superior de coruja-das-neves.\n\nGrifos selvagens dependem de asas poderosas para se manter no ar e visão aguçada para espiar presas. A velocidade com que mergulham ao chão e arrebatam vítimas é impressionante. Muitas vezes despedaçam a carne da presa com bicos afiados como navalha, mas não antes de pousar em local isolado para desfrutar a refeição sem interrupção. Grifos caçando para alimentar filhotes são mais cautelosos, despedaçando a presa em vez de arriscar trazer criatura viva de volta ao ninho.\n\nTreinadores de animais experientes há muito aprenderam a criar grifos como montarias para forças militares ou indivíduos poderosos. Essas montarias são conhecidas por força, bravura e lealdade inabalável. Estão entre os animais mais inteligentes, e muitas variantes de grifo são consideradas feras inteligentes; acredita-se que um grifo escolhe o cavaleiro tanto quanto o cavaleiro escolhe o grifo. O processo de treinar um grifo para aceitar e carregar cavaleiro em voo é longo e caro. Treinadores de grifo cobram somas elevadas por seus serviços, e um governante que possa ostentar estábulo de grifos é objeto de grande respeito e inveja.",
    "sections": []
  },
  "creature-mythic-lich": {
    "description": "Um lich mítico pode ser um lich que entrou em contato com fonte de poder mítico após a transformação — ou um cuja transformação foi planejada para instilar poder mítico nele. Tais rituais podem envolver uso de artefato mítico como receptáculo da alma, matar criatura mítica ou atrair ser mítico para desferir o golpe mortal contra o conjurador. Entre adeptos do Caminho Sussurrante, acredita-se comumente que o Tyrant Sussurrante enganou o deus Aroden para matá-lo enquanto mortal, de modo a sifonar parte do poder de Aroden na criação de seu receptáculo da alma e permitir tornar-se lich mítico.",
    "sections": [
      {
        "id": "mythic-soul-cages",
        "title": "Receptáculos da Alma Míticos",
        "body": "Embora um _receptáculo da alma_ padrão apareça no _Monster Core_, um lich mítico verdadeiramente poderoso provavelmente terá _receptáculo da alma_ muito mais espetacular e incomum. O lich mítico mais poderoso pode vincular criatura temível e quase imortal para servir como seu _receptáculo da alma_, ou uma fortaleza majestosa, ou até uma ilha inteira."
      }
    ]
  },
  "creature-mythic-ogre-boss": {
    "description": "Para ogros, os maiores, mais fortes e mais violentos entre eles são os que reivindicam o direito de liderar. Quando tal criatura ganha poder mítico, sua crueldade provavelmente será igualada apenas por sua durabilidade imensa. Chefes ogros míticos são capazes de derrubar até presas poderosas e enormes como dinossauros gigantescos com seus ganchos de ogro, usando força incrivelmente absurda para arrastá-los e despedaçá-los. Se um grupo de chefes ogros míticos se unisse, poderia provar ameaça aterrorizante, conquistando vilas ou até uma cidade pequena com relativa facilidade. Felizmente, suas filosofias de violência e força acima de tudo fazem com que, sempre que tais seres entram em contato, sejam muito mais propensos a guerrear imediatamente entre si para provar quem é o mais forte.",
    "sections": []
  },
  "creature-oliphaunt-of-jandelay": {
    "description": "Arauto da Aniquilação\n\nO Olifante de Jandelay é atraído a mundos que correm em direção à aniquilação iminente.",
    "sections": []
  },
  "creature-sublime-breath": {
    "description": "Portadores de Inspiração\n\nUm sublime breath busca aperfeiçoar seu ofício ou, quando vê semente de potencial em mortal digno, inspirá-lo a novos patamares.",
    "sections": []
  },
  "creature-verex-that-was": {
    "description": "Um Prole Sangrenta de Rovagug\n\nOutrora um deus orc, Verex-That-Was foi remodelado em criatura imensa de carne e osso retorcidos.",
    "sections": []
  },
  "creature-vulot": {
    "description": "Tudo ou Nada\n\nVulot é senhor demônio nascente de mentiras, perda de identidade e sufocamento. Se uma de suas formas for destruída, pode se reincorporar como uma de suas muitas identidades roubadas um dia depois.",
    "sections": []
  },
  "creature-weaver-of-webs": {
    "description": "Arauto da Teia\n\nOutrora servitora de um deus antigo dos segredos, a Weaver of Webs agora busca alcançar sua própria divindade.",
    "sections": []
  },
  "creature-animated-bamboo-figurine": {
    "description": "Tiras de bambu flexíveis mas resistentes, tecidas em padrões intrincados, formam a base da figura de bambu animada. Esses materiais são abundantes e fáceis de obter, embora exijam grande cuidado e paciência para preparar, tornando-os guardiões ideais para comunidades isoladas. Esses artesanatos ocos e maleáveis podem esticar ou comprimir, saltando e impulsionando-se mais longe que a maioria dos humanoides.",
    "sections": []
  },
  "creature-animated-kite": {
    "description": "Uma pipa animada é perfeita para espionagem, permitindo observação a grande distância, embora muitas sejam tratadas mais como animais de estimação. A pipa em si é artesanato simples, facilmente criado e destruído, feito de papel encantado esticado sobre armação fina de bambu. Pipas mais avançadas podem ser decoradas com várias runas que permitem ao encantador ver ou ouvir à distância.",
    "sections": []
  },
  "creature-animated-wine-vessel": {
    "description": "Um belo recipiente de vinho é marca de status entre bebedores, sem falar de um animado que serve o vinho por conta própria. Embora normalmente sejam servos inofensivos, esses recipientes seguirão instruções tão rapidamente para engolir intrusos e afogá-los em vinho forte.",
    "sections": []
  },
  "creature-aoyin": {
    "description": "Um aoyin lembra um boi de corpo pálido, quatro chifres e pelo grosso como palha. Embora essa fera grande e solitária se assemelhe levemente ao boi de tração comum, é carnívoro altamente agressivo e territorial que persegue e devora presas. Um aoyin habita as montanhas altas, raramente visto por plebeus. Durante invernos magros, porém, pode descer de seu lar montanhoso em busca de comida, resultando em encontros horríveis com assentamentos próximos. Acredita-se que um único aoyin pode dizimar a população de uma vila inteira, para então recuar às montanhas próximas quando sacia a fome. Um aoyin, ou até um rebanho, é impulsionado principalmente pela fome e outros impulsos naturais. Fora de seu habitat natural, um aoyin pode ocasionalmente ser mantido por quem se deleita com sede de sangue. Mesmo sob controle mágico, um aoyin cativo é mais propenso a virar-se contra os tratadores que obedecer comandos. Como arma descontrolada, porém, um aoyin faminto representa ameaça terrível à maioria das comunidades. Contos em certas áreas isoladas afirmam que o rugido de um aoyin pode levar quem tem a infelicidade de ouvi-lo a frenesi de fome e violência. Vilas são encontradas consumidas por brigas internas sem sinal de aoyin sequer cruzando suas fronteiras. Embora seja possível que variante poderosa possua essa habilidade, a maioria dessas histórias é inspirada pela magia terrível disponível a quem entende os segredos do aoyin e se espalha quando vilas entram em colapso por compulsões mágicas ou brigas mundanas.",
    "sections": [
      {
        "id": "adyin-horns",
        "title": "Chifres de Aoyin",
        "body": "Os chifres de um aoyin são material potente para criar itens mágicos que induzem estado frenético ou perda de sangue, como nos contos sobre os bramidos da fera. Cada chifre — um aoyin normalmente tem quatro — pode ser usado como materiais no valor de 60 PO para itens como uma runa _ferimento_."
      }
    ]
  },
  "creature-aso-berang": {
    "description": "Nas profundezas das matas há criaturas grandiosas com mandíbulas com presas. Suas feições inspiraram várias máscaras demoníacas com presas usadas em grandes festivais por Tian Xia. Essas feras são conhecidas como aso berangs, ou cães-urso, nas ilhas de Minata. Como o nome sugere, lembram cães grandes com a corpulência de um urso. Porém, aso berangs não são simplesmente animais grandes e carismáticos, pois muitos dizem ser reis dos espíritos da floresta e patronos dos guardiões. São frequentemente reverenciados como entidades protetoras por quem vive fora das matas que guardam. Esses guardiões só aparecem a plebeus se a floresta em que vivem estiver em perigo ou se precisarem de algo. Quando o fazem, aso berangs podem aparecer como humanos grandes e poderosos que emanam presença régia. Aso berangs têm garras cruelmente afiadas que caem regularmente e são fortes o bastante para escalar árvores em perseguição a bruxas que tentam escapar subindo nelas. Muito frequentemente, aso berangs atacam visitantes cujos corações julgam impuros ou consideram ameaças potenciais à floresta. Infelizmente, receber esse julgamento costuma exigir pouco mais que esquecer de realizar os ritos corretos de respeito e reverência.",
    "sections": [
      {
        "id": "enimty-of-witches",
        "title": "Inimizade das Bruxas",
        "body": "O primeiro aso berang e ancestral de todos, Ganas Buti Rajah, enfrentou os exércitos de bruxas de Rani Randa, a Rainha das Bruxas e Tanggal. Agora, os descendentes de Ganas Buti Rajah mantêm a tradição de tutela: proteger as florestas e purificar as terras da magia que julgam maligna."
      }
    ]
  },
  "creature-bul-gae": {
    "description": "Bul-gaes são manifestações do sol e da lua eclipsados. Parecem cães grandes, embora coloração e traços mudem conforme exercem poderes sobre calor e frio. Dependendo de terem liberado mais recentemente poderes lunares ou solares, bul-gaes lembram cão carmesim envolto em chamas ou raposa azul-celeste congelada, respectivamente.\n\nLendas dizem que o primeiro bul-gae tentou roubar o sol do céu. Ao morder a esfera ardente, porém, foi gravemente queimado. Tendo falhado, tentou então recuperar a lua, mas ao tocá-la o bul-gae congelou solidamente e caiu ao chão. Os descendentes desse bul-gae aperfeiçoam para sempre seus poderes de chama e gelo para um dia ter sucesso onde o ancestral falhou.\n\nContos dizem que bul-gaes servem como companheiros fiéis ao antigo e sombrio mestre do primeiro bul-gae. Essas histórias afirmam que o mestre das sombras pode ver através da luz distorcida de todos os bul-gaes e usar os cães para vigiar o universo por propósitos desconhecidos.",
    "sections": [
      {
        "id": "eclipsed-light",
        "title": "Luz Eclipsada",
        "body": "Bul-gaes trazem consigo a luz distorcida de um eclipse por onde passam. Essa luz distorcida favorece tons azuis e distorce o espectro de cores visíveis, dando ao mundo ambiente assombroso e amortecido."
      }
    ]
  },
  "creature-caterpillar-carriage": {
    "description": "Os construtos das Cavernas Clicantes têm designs semelhantes, feitos de mecanismos. A característica mais incomum é que são autorreplicantes — ou talvez autorreencarnantes, já que a animação de um construto assombrado exige uma alma.",
    "sections": []
  },
  "creature-five-color-orchid-mantis": {
    "description": "Poucas criaturas parecem tão belas quanto as orchid mantises. Forma elegante e coloração lembram flores, e muitas pessoas adotam os insetos delicados como animais de estimação de curta duração. Embora esses insetos mundanos não sejam perigosos para humanoides, ainda podem derrubar presas várias vezes seu tamanho. Desdobrando-se da pose florida, orchid mantises atacam com velocidade cegante, até perseguindo borboletas em busca de alimento com braços dentados e mordida poderosa.",
    "sections": []
  },
  "creature-gau-cho-rong": {
    "description": "Histórias de fogueira afirmam que gau cho rongs se originaram como fantasmas da presa de caçadores voltando para vingança, servos concoctados de bruxas ou feras amaldiçoadas que se tornaram viciadas na carne de crianças que vagam onde lhes disseram para não ir. Conhecidos pelo apelido inquietante de \"ursos ocos\", gau cho rongs são facilmente confundidos com seu primo de bom coração, o urso-solar. Com pouco mais de 90 cm de altura e línguas longas e pendidas, lembram filhotes adoráveis quando empanturrados, mas tornam-se terrores quando começam a sentir fome e ficar ocos. A pelagem faminta do gau cho rong fica frouxa até parecer pouco mais que osso frágil em um saco de pele, como boneca velha esvaziada. Os ursos ocos se contorcem e gemem, atraindo vítimas simpáticas ou caçadores oportunistas. Conforme os alvos se aproximam, outros gau cho rongs caem dos galhos acima nas costas e rostos da presa, a pelagem frouxa amortecendo a maioria dos ataques enquanto arranham vítimas com garras longas e curvas. Quando finalmente se empanturram, gau cho rongs voltam ao estado desarmantemente encantador. Assim continua a vida de brincar, caçar, folgar, matar, escarbar, dilacerar.",
    "sections": [
      {
        "id": "subsumed-traits",
        "title": "Traços Subsumidos",
        "body": "Mudanças físicas de criaturas que devoraram são visíveis em marcas na pele frouxa do gau cho rong e até na forma de sua estrutura óssea, concedendo a ursos ocos diferentes habilidades ligeiramente distintas mesmo no mesmo grupo. É possível que gau cho rongs únicos, mais velhos ou mais poderosos ganhem habilidades permanentes ao digerir certas criaturas."
      }
    ]
  },
  "creature-giant-orchid-mantis": {
    "description": "Poucas criaturas parecem tão belas quanto as orchid mantises. Forma elegante e coloração lembram flores, e muitas pessoas adotam os insetos delicados como animais de estimação de curta duração. Embora esses insetos mundanos não sejam perigosos para humanoides, ainda podem derrubar presas várias vezes seu tamanho. Desdobrando-se da pose florida, orchid mantises atacam com velocidade cegante, até perseguindo borboletas em busca de alimento com braços dentados e mordida poderosa.",
    "sections": []
  },
  "creature-hopping-head": {
    "description": "Um hopping head tem forma de cabeça humanoide, às vezes com traços faciais elaborados, outras com visagem tosca e parecida com brinquedo. Abaixo da cabeça há coluna com mola que permite ao hopping head mover-se.",
    "sections": []
  },
  "creature-ijhyeojin": {
    "description": "Ijhyeojins (ee-jyuh-jeens) outrora foram joseung sajas, psicopompos que guiavam os mortos ao Boneyard como punição divina por seus pecados. Com o tempo, rejeitaram seus papéis e tornaram-se sakhils. Alguns o fizeram por senso de injustiça por ter que expiar pecados no além, mas todos o fazem em parte por desejo desesperado de recuperar memórias — pois ijhyeojins recebem o nome do medo que manifestam, o medo de ser esquecido. Predam pessoas isoladas socialmente por circunstâncias ou obcecadas com legado, cortando lentamente vítimas de amigos, contatos profissionais e família. Ijhyeojins especialmente gostam de infiltrar instalações médicas para predar pacientes que temem ser esquecidos na morte, arrancando memórias cruciais deles ou de entes queridos em visita. Caçar assim também concede aos sakhils posicionamento ideal para atrair joseung sajas à ruína.\n\nIjhyeojins lembram os psicopompos de pele pálida que costumavam ser, exceto que os rostos não têm traços distinguíveis, como crânio com camada lisa de pele esticada sobre ele. Seus corpos continuam a torcer e crescer quanto mais vivem.",
    "sections": [
      {
        "id": "fatal-feud",
        "title": "Feudo Fatal",
        "body": "Ijhyeojins consideram todos os joseung sajas servos lavados do cérebro do Boneyard que precisam ser \"despertados\" do senso de dever pelo medo. Apesar de se perceberem como libertadores, ijhyeojins deleitam-se em ver um joseung saja desmoronar completamente ao ser consumido e renascido como sakhil sem rosto por seu próprio medo."
      }
    ]
  },
  "creature-imugi": {
    "description": "Imugi (ee-moo-ghee) são serpentes dracônicas com grande potencial místico, incluindo ascensão a outra forma. Enquanto alguns dragões imperiais nascem com direito de nascença, muitos que hoje percorrem Tian Xia são imugi ascensos — embora derrubariam quem afirmasse isso.\n\nPara tornar-se dragão imperial, imugi devem cuidar de um ovo de koi por mil anos. O poder da eclosão do ovo nutrido basta para alimentar ritual de ascensão dracônica, e qualquer poder remanescente transforma o koi em imugi para continuar o ciclo. O tipo de dragão imperial que o imugi se torna depende de onde escolhe nutrir o ovo de koi. Imugi preferem fortemente koi de barbatana longa, e criadores de koi de Tian aprenderam a manter piscina separada desses koi-borboleta longe dos demais, pois imugi tendem a deslocar bastante água — e koi — ao mergulhar para arrebatar ovo desejado.\n\nEmbora imugi tenham algum poder sobre chuva e tempestades, a maioria não é forte o bastante para controlar o clima de verdade. Muitos são conhecidos pela benevolência, e algumas vilas dependem das incursões dos imugi de riachos ou lagos, trazendo chuvas na estação de crescimento. Imugi têm temperamentos tão variados quanto os dragões que se tornam, e alguns são notórios por impaciência que se transforma em temperamento ruim ou arrogância que afasta pessoas como se fossem insetos. Embora alguns considerem imugi mal-humorados corrompidos e afirmem que podem ser purificados, imugi simplesmente se colocam acima da criatura média e não veem motivo para esconder sua verdadeira natureza de quem consideram inferior.",
    "sections": [
      {
        "id": "imperial-ascension",
        "title": "Ascensão Imperial",
        "body": "O ritual que um imugi realiza para tornar-se dragão verdadeiro libera explosão de magia avassaladora. Personagens expostos a essa explosão podem ter a mente preenchida com técnicas ou habilidades perdidas que o imugi encontrou ao longo de sua longa vida, permitindo acesso a opções de personagem incomuns ou raras, compreensão súbita de fórmulas para criar itens ou retrainamento imediato por novo caminho."
      }
    ]
  },
  "creature-inkdrop": {
    "description": "Nem todo artesanato é feito para guerra. A gota-de-tinta é infiltrador usado por conjuradores para aprender segredos ou alterar documentos. Encarnado em uma única gota de tinta do tamanho de um punho, a gota-de-tinta pode deslizar por uma página, mudando ou removendo caracteres, com consequências devastadoras para a diplomacia.",
    "sections": []
  },
  "creature-jiidon": {
    "description": "Lendas entre jiidons explicam que há muitas eras, quando a magia era mais selvagem e de ordem menos distinta, um rato tocado pela magia consumiu as unhas descartadas de um humano, e os deuses concederam a esse rato a capacidade de metamorfosear-se em cópia daquele humano. Verdadeiro ou não, jiidons são ratos aparentemente normais que compartilham a bênção dessa história. Não está claro onde nasceu o primeiro jiidon, pois descendentes vivem entre populações de ratos e humanoides pelo mundo. Em forma original, jiidons são extremamente difíceis de distinguir de rato comum e frequentemente encontram lar liderando parentes não sencientes.\n\nApós comer unhas descartadas de um humanoide, porém, um jiidon pode assumir a forma do dono das unhas, parecendo o sujeito em todos os modos óbvios e superficiais, com várias diferenças sutis. As orelhas são um pouco maiores e às vezes terminam em ponta pequena. Os dentes continuam crescendo por toda a vida, então devem roer pedras, casca e outros materiais duros regularmente para limá-los e esconder a verdadeira natureza. Os bigodes que crescem dos lados do rosto também exigem aparo diário.\n\nJiidons são em grande parte inofensivos, mas seus poderes provocam alarme entre quem conhece sua existência. Mães repreendem filhos por não cortar unhas após o anoitecer, para que jiidon à espreita não arrebate lasca perdida na escuridão. Embora cautelosos como qualquer rato, a maioria dos jiidons quer apenas transformar-se e ocupar lugar na sociedade humanoide. Para reduzir suspeitas, costumam visar quem é impopular entre vizinhos. A gratidão que sentem ao substituir um humanoide às vezes transparece em suas ações, revelando que o alvo foi substituído ou conquistando jiidons àqueles que não apreciavam a atitude do original.\n\nJiidons de famílias grandes frequentemente buscam papel que lhes dê acesso a aparas de unhas, como faxineiro ou médico, e passam o dom da forma humanoide pela família.",
    "sections": [
      {
        "id": "playing-a-jiidon",
        "title": "Jogando um Jiidon",
        "body": "Embora jiidons não tenham regras de ancestralidade neste livro, jogador interessado em criar personagem jiidon pode usar a herança versátil beastkin para emular jiidon que obteve forma humanoide permanente. O jogador deve trabalhar com o MJ para determinar quem o jiidon está imitando e quais complicações isso pode trazer."
      }
    ]
  },
  "creature-joseung-saja": {
    "description": "Joseung saja (jo-seung sah-jah) é nome às vezes concedido a criaturas no além que cometeram pecados graves em vida. Conhecidos também como ceifadores, essas criaturas pálidas e de olhos fundos são psicopompos — seres que guiam almas dos mortos ao Boneyard. Ninguém sabe os critérios exatos para tornar-se joseung saja, mas os selecionados têm memórias apagadas e devem trabalhar como joseung saja até serem considerados tendo expiado completamente seus pecados.\n\nJoseung sajas de eras diferentes vagam pelo mundo, e quando uma criatura se aproxima da morte, um aparece e aguarda o falecimento como guia do além. Quando necessário, até alteram memórias do alvo para remover emoções dolorosas que poderiam prendê-lo ao mundo mortal, facilitando morte pacífica. Esse dever impede que quem morre de modo trágico ou violento se torne fantasma preso ao mundo — uma misericórdia, embora frequentemente não apreciada pelos protegidos dos joseung sajas. Se criatura alvo de joseung saja torna-se morta-viva ou de outro modo engana a morte, o ceifador deve cumprir o dever de conceder morte verdadeira.\n\nComo joseung sajas permanecem entre mortais para cumprir deveres, são um dos psicopompos mais comumente vistos.",
    "sections": [
      {
        "id": "death-long-career",
        "title": "Carreira Longa da Morte",
        "body": "Mesmo após expiar pecados e recuperar memórias, algumas almas escolhem manter títulos de joseung saja. Esses ceifadores experientes caçam ijhyeojin, antigos joseung sajas que abandonaram seus postos. Para joseung sajas, um ijhyeojin não passa de mais uma alma que excedeu sua permanência no mundo dos vivos."
      }
    ]
  },
  "creature-kun": {
    "description": "Famintos e ressentidos, os kun malignos são monstros mitológicos peixes que habitam as profundezas mais remotas e frias do oceano. Essas criaturas massivamente poderosas poderiam facilmente governar um domínio subaquático se quisessem, mas kun também são famosos por total autoabsorção e completa indiferença a outras formas de vida. Kun permanecem o mais longe possível de outras criaturas, subsistindo apenas de seu próprio ódio gelado. Podem consumir e digerir presas, mas essas alimentações são incidentais ou movidas mais por despeito que por necessidade física. A maioria dos kun permanece ignorante e indiferente, mantendo-se na escuridão e desconsiderando sinais de vida ao redor, exceto para atacar ocasionalmente quando perturbados.\n\nO kun caça no fundo do mar frio e escuro. Mas se mostrada a luz do sol, um kun começa a entender que habita um mundo diferente e maior. Quando bandos de aves ou cardumes de peixes projetam sombras manchadas sobre um kun, ele pode cansar-se da solidão ou ficar curioso sobre o reino acima.",
    "sections": [
      {
        "id": "change-of-heart",
        "title": "Mudança de Coração",
        "body": "Em circunstâncias extremamente raras e por razões misteriosas próprias, um kun pode sacrificar parte de seu poder para passar por transformação permanente e única. Num ato dramático final, o kun se lança para cima e para fora do oceano, permitindo que o sol o banhe por completo. No processo, o kun transforma-se de peixe odioso em ave nobre e curiosa chamada peng."
      }
    ]
  },
  "creature-manananggal": {
    "description": "Manananggals são monstros perversos que vivem como humanoides de dia, mas se alimentam de pessoas à noite. Para esconder depravações, disfarçam-se de pessoas comuns — tipicamente reclusos ou excêntricos — e usam proximidade a uma comunidade para escolher próximos alvos antes de atacar sob cobertura da noite. Manananggals usam línguas longas e ocas para drenar sangue de órgãos vitais como o fígado, e as marcas de drenagem resultantes dificultam determinar a natureza exata da morte da vítima. Esse mistério frequentemente leva a confusão, terror e desconfiança nas comunidades, o que a maioria dos manananggals saboreia. Ao voar, manananggals fazem som de tique-tique característico, levando alguns a chamá-los de \"tik-tiks\", e comunidades gravemente afetadas entram em caos temeroso ao primeiro relato desse ruído revelador.\n\nManananggals compartilham traços canibalísticos e de separação corporal com outros tipos de tanggal, como penanggalans, embora várias características os distingam. Por exemplo, enquanto penanggalans deleitam-se com vinagre e até banham-se na substância, manananggals abominam o menor cheiro dele.",
    "sections": [
      {
        "id": "grim-blades",
        "title": "Lâminas Sombrias",
        "body": "Folclore de Minata diz que um semideus esquecido criou os primeiros manananggals ao bissecar o torso de um humano com faca divina. O semideus então cortou os ombros do humano e cravou par de asas de morcego nas costas, dando à luz o primeiro manananggal. O poder divino da faca do semideus ainda ressoa em todo manananggal e torna cada um suscetível a cortes de armas semelhantes. Comunidades lidando com o terror de um manananggal treinam com lâminas leves e outras armas cortantes para derrubar os monstros do céu."
      }
    ]
  },
  "creature-nue": {
    "description": "Um nue é criatura antiga de tamanho enorme e poder destrutivo. Embora avistamentos sejam raros, é descrito como tendo cabeça de macaco, corpo de tanuki, membros de tigre e cobra como cauda. O corpo assombroso da fera combina-se com capacidade de drenar força vital de quem está ao redor apenas com o uivo.\n\nSegundo certos contos, em tempos antigos um nue aterrorizava livremente reinos e infligia pesadelos às vítimas. Primeiro aparece como nuvem de tempestade enorme antes de tornar-se preta venenosa. Quando enfurecido, um nue pode convocar relâmpagos para causar danos colaterais massivos. Ouvir o uivo de um nue é considerado mau agouro.",
    "sections": [
      {
        "id": "curse-of-the-nue",
        "title": "Maldição do Nue",
        "body": "Mesmo na morte, o espírito de um nue pode trazer desastre a quem está ao redor. Uma forma de suprimir a maldição é realizar ritos funerários e erguer monte sobre o túmulo do nue. Outra é evitar a maldição inteiramente colocando o cadáver à deriva rio abaixo ou enterrando-o longe. Diz-se que a maldição manifesta ira por possessão; alguns acreditam que é assim que um nue é criado."
      }
    ]
  },
  "creature-orchid-mantis-swarm": {
    "description": "Poucas criaturas parecem tão belas quanto as orchid mantises. Forma elegante e coloração lembram flores, e muitas pessoas adotam os insetos delicados como animais de estimação de curta duração. Embora esses insetos mundanos não sejam perigosos para humanoides, ainda podem derrubar presas várias vezes seu tamanho. Desdobrando-se da pose florida, orchid mantises atacam com velocidade cegante, até perseguindo borboletas em busca de alimento com braços dentados e mordida poderosa.",
    "sections": []
  },
  "creature-peng": {
    "description": "Um peng é fera aviária massiva que voa sem esforço entre as nuvens mais altas. Sua plumagem brilhante dificulta ver sua forma contra céu azul, mas com paciência um observador pode notar movimento rápido demais para ser nuvem natural.\n\nBelo e gracioso, um peng surge das origens mais improváveis: o cruel kun, monstro peixe odioso cuja predileção pelas profundezas esmagadoras do mar combina com o amor do peng pelo céu aberto e brilhante. Após um kun sacrificar seu poder por coração nobre ao banhar-se nos raios solares, transforma-se nessa ave majestosa, que evita violência a menos que precise lutar para permanecer livre.\n\nUm peng não busca perigo nem emoção; quer apenas fazer longas viagens e voar sem interrupção. Porém, às vezes entra em conflito com dragões e outras criaturas voadoras altas que os caçariam ou bloqueariam o caminho. Embora seja incerto para mortais qual propósito servem as jornadas de um peng, poderes celestiais relacionados ao ar ou à liberdade às vezes pedem a seguidores mortais que auxiliem um peng em sua viagem.\n\nA natureza calma e firme de um peng é tão forte que sua mera presença pode acalmar tempestades e silenciar ventos. Avistar um peng é sem dúvida sinal de boa sorte para marinheiros e navegadores — sentimento compartilhado pela maioria dos sortudos o bastante para ver essas criaturas raras e belas. Quando o céu está claro e azul com tempo ameno por período prolongado, essas condições podem ser atribuídas à presença de um peng invisível.",
    "sections": [
      {
        "id": "clear-direction",
        "title": "Direção Clara",
        "body": "A maioria dos pengs em Golarion é vista nos céus do sul de Tian Xia. Pengs quase nunca pousam ou param para descansar, e quase sempre são avistados seguindo trajetória sulista. Segundo os próprios pengs, não têm destino: vão para o sul, e nem eles sabem por quê. Alguns pengs caprichosos afirmam que perseguem um sonho que tiveram numa vida vivida muito antes desta."
      }
    ]
  },
  "creature-pixiu": {
    "description": "Testemunhar um pixiu (pee-shee-oh) é bênção de fato — e espetáculo de se contemplar. Esse leão de cabeça dracônica e asas tem aparência formidável que contradiz exuberância juvenil. A lenda afirma que foi essa brincadeira excessivamente entusiasmada que fez os primeiros de sua espécie serem banidos do céu, amaldiçoados a acumular riqueza e nunca deixá-la ir. Seja qual for o caso, cada pixiu tem habilidade estranha de farejar ouro, que adora comer. Curiosamente, o toque de um pixiu também pode romper maldições e censurar espíritos malignos, talvez remanescente de divindade perdida.\n\nDevido ao passado celestial e capacidade de exorcizar maldições, acredita-se que pixiu traz e protege prosperidade, atraindo boa fortuna e afastando espíritos malignos. Suas origens celestiais e amor por riqueza podem ser a razão pela qual dragões imperiais os cuidam desde tempos imemoriais, valorizando-os como guardiões e companheiros leais. Em particular, dragões do submundo empregam pixius para expandir seus tesouros, e muitos dragões soberanos os valorizam como símbolos de status. Em reinos governados por dragões por Tian Xia, a presença de um pixiu numa comunidade é vista como sinal da aprovação e boa vontade do patrono dracônico.\n\nApesar da proteção dos dragões imperiais, o fascínio pela riqueza ainda basta para levar alguns a atacar um pixiu. Embora raramente perdoe um atacante, prefere retirar-se pacificamente de quem julga puro de coração, porém desesperado. Os mestres dracônicos do pixiu, porém, nem sempre são tão indulgentes.",
    "sections": [
      {
        "id": "pixiu-dimorphism",
        "title": "Dimorfismo do Pixiu",
        "body": "Pixius machos e fêmeas têm diferenças notáveis (embora, como animais naturais, existam indivíduos com traços de ambos). Machos têm pelagem e juba douradas, enquanto fêmeas têm sobrepelo azul. Embora a maioria dos pixius tenha um chifre, fêmeas com dois chifres não são incomuns; curiosamente, nenhum pixiu macho com dois chifres foi documentado."
      }
    ]
  },
  "creature-shui-gui": {
    "description": "Quando alguém se afoga em corpo d'água, há chance de o espírito ficar preso e incapaz de reencarnar. Retorcido por raiva, despeito e malícia, o espírito transforma-se em shui gui.\n\nSe alguém vê um shui gui da margem, muitas vezes vê apenas a parte superior de uma cabeça com dois reflexos minúsculos de luz nos olhos. Espreitando sob docas e à beira da água, o shui gui chama pessoas ou causa perturbações para atraí-las ao alcance da água. Quando a vítima desavisada chega perto o bastante, o espírito a puxa para debaixo d'água, afoga-a e possui o corpo num processo conhecido como ti sh-on. Quando habita com sucesso o corpo vazio, escapa da maldição e vive nova vida; porém, o espírito da vítima permanece preso na água até que, por fim, também afogue um transeunte infeliz, continuando ciclo sem fim.\n\nUm shui gui aterroriza-se com fogo, e quem acampa à beira da água ou viaja de barco é aconselhado a manter lanterna à mão. Amuletos e talismãs também podem afastar o shui gui, mas o espírito em geral é mais fraco depois de ser provocado a ir para terra.",
    "sections": [
      {
        "id": "soul-reservoir",
        "title": "Reservatório de Almas",
        "body": "Local com histórico de afogamentos pode ser resultado de maldição de um único shui gui passada ao longo dos anos, mas locais particularmente perigosos com afogamentos naturais repetidos podem desenvolver assombrações complexas. Além dos fantasmas que lutam para afogar a próxima vítima, outros mortos-vivos se aglomeram e assombrações se desenvolvem sob a água escura e parada."
      }
    ]
  },
  "creature-the-great-flood": {
    "description": "Há poucas criaturas capazes de destruição ecológica tamanha mantendo-se humorísticas e descontraídas como o Great Flood. O Great Flood se ergue com corpo de serpente gigante e nove cabeças humanoides, cada uma com personalidade diferente, embora todas sirvam ao mesmo propósito — exterminar todo sinal de vida que não deveria estar onde está. Essa criatura pretende manter o equilíbrio do universo, garantindo que nada ocupe mais espaço que o necessário. Infelizmente, o julgamento de onde alguém ou algo deveria estar é visto e pesado apenas pelos 18 olhos do Great Flood, com pouca consideração pela opinião mortal.\n\nO Great Flood é ser imortal, ou pelo menos sem idade, que hiberna por 12 anos seguidos. No décimo terceiro ano, emerge das profundezas dos oceanos e começa a pesar o estado do mundo e os ambientes mais próximos de seu local de repouso: a primeira coisa que vir em terra seca deve ser destruída? Cada uma das nove cabeças do Great Flood contribui com pensamentos e percepções para essa deliberação e, ao chegar a consenso, seguem para o próximo local ou inundam a terra, mergulhando milhas de terra seca em águas salgadas do oceano. Quando percebem a vida em excesso como particularmente problemática, até decidem envenenar as águas com hálito amargo para garantir que nada sobreviva ao julgamento decretado. O Great Flood, apesar da natureza inerentemente destrutiva, não é realmente sanguinário e frequentemente oferece oportunidade para plebeus desafortunados apresentarem seu caso e implorarem pela vida de sua cidade. Embora tenha capacidade de misericórdia e consideração, a criatura divina permanece inflexível depois de decidir. Uma ou duas cabeças podem sentir pontada de culpa e contar piada pequena aos plebeus, aliviando a pressão mental, antes de assassinar uma vila inteira.\n\nAs nove personalidades da criatura serpentina frequentemente entram em conflito. Uma é perfeccionista, outra distante; uma assertiva, outra brincalhona; uma caprichosa, outra desconfiada; uma ambiciosa, outra agradadora; a última quieta e secreta, sussurrando apenas às cabeças mais próximas. Embora as cabeças briguem como irmãs, sempre chegam a um compromisso.",
    "sections": [
      {
        "id": "a-terrible-sense-of-humor",
        "title": "Um Péssimo Senso de Humor",
        "body": "Um estudioso que debateu o Great Flood registrou a seguinte troca seca, servindo mais como exemplo das piadas infames da criatura que conhecimento real.\n\n**Estudioso:** \"A que senhor ou poder vocês respondem?\" **The Great Flood:** \"Não temos senhor.\" **Estudioso:** \"Então qual de suas nove faces é a líder?\" **The Great Flood:** \"Não temos líder.\" **Estudioso:** \"Então como resolvem disputas?\" **The Great Flood:** \"Não temos disputas.\""
      },
      {
        "id": "influence-the-flood",
        "title": "Influenciar o Dilúvio",
        "body": "Convencer o Great Flood a poupar uma área pode ser tratado com o subsistema de influência, tratando as cabeças como indivíduos a serem persuadidos. Muitas cabeças seguirão o exemplo umas das outras, embora quais e como seja bom aprender com Descobrir."
      },
      {
        "id": "passing-judgment",
        "title": "Proferir Julgamento",
        "body": "Não há critérios exatos ou regras escritas que guiem as decisões do Great Flood. É questão de estética, opinião e qual cabeça acaba liderando a discussão. Em geral, porém, assentamentos em desacordo com o ambiente natural são tratados com mais severidade."
      }
    ]
  },
  "creature-yeongno": {
    "description": "Nem humano nem fera, mas lembrando ambos, yeongno (yeong-no) são criaturas que outrora foram habitantes do céu, mas foram expulsas ao Universo mortal por própria ganância. Yeongno afirmam ter sido dragões celestiais e usam máscaras dracônicas alongadas com envoltórios de corpo inteiro decorados com padrões de escamas em honra a essa alegação — embora ninguém tenha confirmado a veracidade dessa crença. Enquanto vagam, seguram cachimbo de salgueiro na boca, produzindo som distinto de \"bibi\" que frequentemente anuncia sua aparição.\n\nApesar da reputação de monstros que comem pessoas, yeongno são bem-vindos pelos pobres e oprimidos, que os veem como sábios e justos. Yeongno acreditam que, ao comer 100 indivíduos ricos que abusam de sua riqueza ou a acumularam por meios desonestos ou exploratórios, podem expiar a própria ganância e ascender de volta ao céu. Indivíduo corrupto e ganancioso pode escapar do destino de ser comido por yeongno doando toda sua riqueza e concordando em ser transformado em porco por um ano. Se a pessoa suportar um ano vivendo como porco sob os cuidados de família que antes prejudicou, o yeongno a poupará.",
    "sections": [
      {
        "id": "gulttons-redemption",
        "title": "Redenção de Gultton",
        "body": "Yeongno comem os corruptos e ricos como meio simbólico de consumir a própria ganância. Embora aspirem ascender de sua existência atual, também sabotam ativamente outras criaturas que esperam fazer o mesmo. Sentem-se particularmente ameaçados por imugi, que os yeongno acreditam ocupariam seus lugares no céu."
      }
    ]
  }
}
