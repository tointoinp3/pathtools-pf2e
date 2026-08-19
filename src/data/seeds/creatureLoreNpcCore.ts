import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas de NPC Core (lotes 1–6). */
export const CREATURE_LORE_NPC_CORE: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-apprentice": {
    "description": "Aprendizes ambiciosos existem em todas as cidades. Em geral são mais jovens e buscam a aprovação dos mestres enquanto aprendem o ofício. Muitos anseiam exemplificar a arte por trás do trabalho e, um dia, se tornarem mestres. A ficha abaixo retrata um aprendiz cartógrafo.",
    "sections": []
  },
  "creature-merchant": {
    "description": "Povoados pequenos em geral sustentam um ou dois mercadores generalistas, e cidades maiores abrigam vários especialistas — peritos num tipo de produto. Mercadores vão de vendedores apregoando na praça a magnatas que tocam organizações comerciais inteiras. Um mercador pode ter uma perícia de Saber extra sobre uma categoria específica de item (como joias ou armas mágicas), com modificador igual ao Saber Mercantil.",
    "sections": []
  },
  "creature-guildmaster": {
    "description": "Nas cidades, artesãos do mesmo ofício muitas vezes formam guildas para fixar padrões de qualidade, estabelecer preços comuns, negociar coletivamente com donos de negócio e pressionar o governo local por leis favoráveis. O mestre da guilda — muitas vezes um mestre artesão por direito próprio — também age como administrador e político, defendendo os artesãos do ofício.",
    "sections": []
  },
  "creature-smith": {
    "description": "A maioria das comunidades menores tem pelo menos uma ferraria onde moradores e viajantes ferram cavalos ou consertam equipamento. Povoados e cidades maiores costumam ter vários ferreiros, muitos especializados em ferraria, armas, armaduras ou até cunhar moedas numa casa da moeda.",
    "sections": []
  },
  "creature-court-historian": {
    "description": "Em meio às maquinações políticas da corte estão os historiadores da corte, observando e registrando eventos para as gerações futuras. A lealdade é à preservação da história, e eles desafiam até a realeza em nome da verdade.",
    "sections": []
  },
  "creature-envoy": {
    "description": "Enviados são hóspedes de uma corte, representando os interesses de outra corte ou organização. Alguns ficam tanto tempo num lugar que praticamente passam por locais, embora aqueles com quem negociam sejam logo lembrados de onde está a lealdade.",
    "sections": []
  },
  "creature-courtesan": {
    "description": "Cortesãs são entretenedoras de alta classe e companheiras profissionais, pagas em favores e privilégios pela honra da companhia. Essas socialites que ditam moda usam o prestígio para circular acima da própria estação, manobrando conexões para montar clientela exclusiva e subir na escada social. A discrição e a mobilidade entre os diferentes patamares da sociedade fazem da amizade delas um preço que vale a pena.",
    "sections": [
      {
        "id": "elegant-establishments",
        "title": "Estabelecimentos elegantes",
        "body": "Cortesãs prosperam em negócio e status ao atender a elite por meio de espaços privados e exclusivos como teatros, galerias, casas de chá e boutiques. Isso permite que cortesãs e alta sociedade fortaleçam alianças e acumulem segredos."
      }
    ]
  },
  "creature-noble": {
    "description": "Invejados por muitos e detestados por alguns, nobres exalam confiança e gentileza. Fofoca e jogo costumam ser os passatempos favoritos. O dia a dia de um nobre costuma misturar negócio e ócio e, para um observador, esse estilo de vida pode parecer só uma sequência de refeições, festas e salões de jogo.",
    "sections": []
  },
  "creature-advisor": {
    "description": "Conselheiros de confiança da corte sussurram palavras de orientação no ouvido de quem tem poder. Muitos nobres se apoiam tanto no conselho que quase não tomam decisões sem eles e exigem sua presença em todas as reuniões e eventos públicos. Conselheiros costumam ser mestres da manipulação.",
    "sections": []
  },
  "creature-palace-guard": {
    "description": "Muitas vezes filhos mais novos da pequena nobreza ou de linhagens longas de criados de confiança, os guardas do palácio defendem a família real e o reduto interior. Os dias consistem em guardar portas, escoltar nobres e manter os que estão a seu cargo o mais seguros possível.",
    "sections": []
  },
  "creature-spy": {
    "description": "Qualquer número de nobres pode ser espião — um confidente amado da rainha ou até o bobo da corte. Espiões usam as perícias para manipular cortesãos com sutileza, virar inimigos uns contra os outros e reunir informação valiosa.",
    "sections": []
  },
  "creature-veteran-noble": {
    "description": "Nobres veteranos sobreviveram a batalhas no passado, sociais e físicas. Esses articuladores costumam ser patronos ou mentores de aventureiros ousados.",
    "sections": []
  },
  "creature-knight": {
    "description": "Lutadores de elite dos degraus mais baixos da nobreza, cavaleiros são campeões orgulhosos da corte. Ao contrário de outros nobres, precisam ganhar o título por lealdade e força de armas, não por herança. Ideais como cavalaria, honra e virtude se associam aos cavaleiros, mas nem todos correspondem a esse padrão romântico.",
    "sections": [
      {
        "id": "knighthood",
        "title": "Cavalaria",
        "body": "Embora a maioria seja armada cavaleiro depois de anos de treino sob um cavaleiro estabelecido, há outros caminhos até o título. Pode ser prêmio de torneio, recompensa por proeza em batalha ou honra concedida a aventureiros por ajudar um nobre grato. A cavalaria é o jeito mais rápido de entrar na nobreza fora do casamento e traz terras e propriedades junto com a subida de estação."
      }
    ]
  },
  "creature-bandit": {
    "description": "Bandidos interceptam viajantes e saqueiam os bens antes de sumir de volta aos esconderijos no ermo. Muitos só querem roubar e soltar as vítimas vivas, embora alguns prefiram não deixar testemunhas.",
    "sections": []
  },
  "creature-grave-robber": {
    "description": "Muitas culturas têm a tradição de enterrar os mortos com uma seleção das posses mais preciosas. Tais valores são presa fácil para quem não tem respeito — nem medo — dos mortos.",
    "sections": []
  },
  "creature-loan-shark": {
    "description": "Agiotas emprestam dinheiro a quem precisa, mas cobram juro alto. Se houver problema no pagamento, mandam a gangue garantir que o cliente quite por inteiro.",
    "sections": []
  },
  "creature-ruffian": {
    "description": "Rufiões costumam trabalhar como guarda-costas e capangas de criminosos poderosos, usando a força para intimidar os outros até a submissão.",
    "sections": []
  },
  "creature-burglar": {
    "description": "Esses criminosos se especializam em arrombamento, ganhando acesso a prédios seguros e contornando medidas de segurança sem serem detectados.",
    "sections": []
  },
  "creature-charlatan": {
    "description": "Charlatães usam pretexto e distração para ludibriar dinheiro e outros valores de crédulos e confusos.",
    "sections": []
  },
  "creature-fence": {
    "description": "Receptadores se tornam indispensáveis ao submundo ao pagar por bens roubados só para revendê-los depois, seja por um negócio aparentemente legítimo ou a um grupo fechado de compradores de elite.",
    "sections": []
  },
  "creature-legbreaker": {
    "description": "Organizações criminosas sempre gostam de emprestar dinheiro a juros abusivos, e os quebra-pernas sempre gostam de cobrar.",
    "sections": []
  },
  "creature-bandit-gang": {
    "description": "Tripulações cruéis de criminosos formam gangues para dar golpes maiores e intimidar as vítimas. Gangues de bandidos muitas vezes andam acompanhadas de um líder.",
    "sections": []
  },
  "creature-master-of-disguise": {
    "description": "Um mestre do disfarce usa figurino, maquiagem e ilusões menores para enganar. Alguns escondem a identidade por anos, infiltrando organizações em cobertura profunda.",
    "sections": [
      {
        "id": "know-your-enemy",
        "title": "Conheça o inimigo",
        "body": "Um mestre do disfarce dá ao Mestre a chance de tornar eventos passados relevantes de novo. Um NPC que foi importante antes pode muito bem ter sido um mestre do disfarce que agora se revela aos PJs anos depois, abrindo uma teia de conexões que eles nunca souberam que existia."
      }
    ]
  },
  "creature-assassin": {
    "description": "Assassinos cometem assassinato, seja por pagamento ou por crença numa causa, como uma religião ou um movimento político. Muitos são membros de guildas de assassinos: organizações que aceitam contratos para matar em troca de dinheiro, favores, ou ambos.",
    "sections": []
  },
  "creature-crime-kingpin": {
    "description": "Chefões constroem impérios nas sombras, governando o território sem piedade e mantendo o negócio privado. A maioria forja conexões com ricos e poderosos, fazendo o trabalho sujo de políticos e pequenos nobres em troca de influência e favores que podem ser cobrados a qualquer hora.",
    "sections": []
  },
  "creature-flamboyant-thief": {
    "description": "Não há honra entre ladrões, mas se houvesse nota por estilo, estes teriam 10 em tudo. Alguns diriam que ladrões espalhafatosos valorizam mais exibir as perícias do que de fato roubar o item — mas que jeito melhor de mostrar que você é o melhor do que com plateia?",
    "sections": [
      {
        "id": "calling-cards",
        "title": "Cartões de visita",
        "body": "Ladrões espalhafatosos adoram construir personas e ganhar reputação infame. A escolha do cartão de visita é o jeito principal de conseguir isso. Precisa ser algo único e difícil de replicar para impedir imitadores. Alguns cartões incluem a pena de uma fênix, uma flor rara, um brinquedo de mecanismo de relógio intrincado ou uma carta de baralho sob medida."
      }
    ]
  },
  "creature-abbot-of-abadar": {
    "description": "Abades costumam chefiar instituições religiosas menos focadas em conjuração, como orfanatos, escolas religiosas ou caridades.",
    "sections": []
  },
  "creature-penitent-of-calistria": {
    "description": "A expiação é vista como o ato máximo de súplica para quem ofendeu a fé. O arrependimento toma várias formas — atos de serviço, romaria, flagelação ou missões divinas.",
    "sections": []
  },
  "creature-pilgrim-of-irori": {
    "description": "Peregrinos atravessam as terras impelidos por algum motivo sagrado, seja visitar um lugar santo ou seguir uma visão profética.",
    "sections": []
  },
  "creature-acolyte-of-iomedae": {
    "description": "Clérigos subordinados ainda aprendem os preceitos da fé e respondem a um sacerdote superior. Os dias se passam em devoção e estudo, recolhidos nos templos.",
    "sections": []
  },
  "creature-blasphemer-of-zon-kuthon": {
    "description": "Blasfemos espalham mensagens contrárias aos preceitos da fé, muitas vezes na crença de que os deuses os escolheram especificamente para levar essa mensagem. Em algumas culturas, como Nidal, isso é crime herético e pode pôr o blasfemo em fuga da lei.",
    "sections": []
  },
  "creature-prophet": {
    "description": "Os deuses às vezes enviam mensagens em sonhos a indivíduos que vagam pelas terras. Alguns profetas não receberam missivas divinas de verdade, mas interpretaram mal sonhos comuns.",
    "sections": []
  },
  "creature-sibyl": {
    "description": "Sibilas são adivinhas oraculares que muitas vezes mergulham fundo em transes com as maldições oraculares para estimular um estado mental frenético. Nesse transe, conectam-se a deuses e espíritos, ainda que numa névoa desorganizada. Algumas sibilas falsas usam substâncias para tentar provocar a mesma conexão frenética, muitas vezes com resultado mortal.",
    "sections": []
  },
  "creature-zealot-of-asmodeus": {
    "description": "Zelotes farejam tramas contra a religião e buscam justiça para os fiéis da igreja. Este zelote serve Asmodeus, mas outros podem servir Abadar, Calistria, Iomedae, Norgorber, Pharasma, Sarenrae ou Zon-Kuthon. Costumam montar um cavalo de guerra (Monster Core 201) com barda leve. Para retratar a montaria do zelote, acrescente este cavalo ao encontro como monstro extra com ações próprias, ajustando o orçamento de XP do encontro.",
    "sections": []
  },
  "creature-champion-of-shelyn": {
    "description": "Campeões são bastiões das virtudes de suas divindades e faróis vivos de suas causas. Quem segue esses caminhos precisa aderir aos preceitos da divindade padroeira ou arrisca perder as habilidades de vez. O campeão retratado aqui segue o exemplo de Shelyn, encarnando o espírito de inspirar beleza e lutar pela causa da paz.",
    "sections": [
      {
        "id": "champion-causes",
        "title": "Causas de campeão",
        "body": "Campeões representam as forças marciais ligadas às várias fés de Golarion. Você pode personalizar um campeão para outra divindade trocando a arma predileta, escolhendo uma bênção dos devotos apropriada e uma causa que combine com as opções de santificação da divindade. Use essa causa para determinar a santificação e a reação do campeão."
      }
    ]
  },
  "creature-priest-of-sarenrae": {
    "description": "Sacerdotes claustrais protegem templos e comunidades. São os guardiões firmes dos preceitos do deus, devotados a espalhar a palavra. Orientação ou cura vêm ao custo de um donativo.",
    "sections": []
  },
  "creature-high-priest-of-pharasma": {
    "description": "Sumos sacerdotes lideram igrejas maiores e estabelecimentos religiosos semelhantes, vigiando o clero de menor patente e garantindo que a comunidade ao redor seja cuidada. Pode ser um cargo altamente político, pois o líder da fé numa região tem influência poderosa sobre os cidadãos comuns.",
    "sections": []
  },
  "creature-traveling-priest-of-desna": {
    "description": "Divindades e religiões só são tão fortes quanto a crença dos fiéis. Sacerdotes itinerantes levam a palavra a todos os cantos de Golarion, aumentando os números da denominação pelas jornadas. Não importa para onde estejam indo ou onde sejam encontrados: um sacerdote itinerante provavelmente está curando alguém com uma magia, entregando um recado ou simplesmente tentando garantir que a fé se espalhe.",
    "sections": []
  },
  "creature-rancorous-priesthood": {
    "description": "Seguidores de Rovagug em geral precisam esconder a devoção à Besta Bruta, ocultos em complexos de cavernas remotos ou ruínas abandonadas, mas emergem quando sentem fraqueza, reunindo-se numa turba destrutiva e homicida para caçar sacerdotes de divindades rivais ou massacrar vilas inteiras.",
    "sections": [
      {
        "id": "troops-with-spells",
        "title": "Tropas com magias",
        "body": "Embora os seguidores de Rovagug sejam os mais comuns, outras divindades podem ter clericatos rancorosos. Você pode usar estas estatísticas para representar outras tropas de devotos capazes de conjurar magias, trocando as magias da lista, mudando as magias de domínio e alterando a santificação. Note que os espaços de magia estão 1 círculo abaixo do máximo que um conjurador daquele nível normalmente conjuraria. Magias de círculo baixo elevadas podem encaixar bem, representando o efeito combinado de várias magias de círculo menor conjuradas ao mesmo tempo."
      }
    ]
  },
  "creature-deific-champion-of-iomedae": {
    "description": "O campeão deífico é o paradigma dos campeões, representando a forma mais verdadeira de devoção e dedicação a uma divindade.",
    "sections": []
  },
  "creature-deific-vessel-of-urgathoa": {
    "description": "Por intervenção direta no mundo mortal, uma divindade cria um recipiente deífico para cumprir sua vontade, seja a partir de um servo disposto ou por possessão, contrato ou maldição. Uma vela diante da chama do progenitor, um recipiente divino queima rápido e se apaga depressa.",
    "sections": [
      {
        "id": "consequences-of-magnitude",
        "title": "Consequências de magnitude",
        "body": "Interceder diretamente no plano mortal abre as divindades a consequências diretas de outras entidades divinas e das próprias forças do destino. No instante em que um recipiente deífico passa a existir, um relógio começa a contar, pronto para mudar o destino de todos envolvidos na criação desta entidade poderosa. Os deuses e seus arautos, de posições inexpugnáveis, enfrentam bem menos consequências do que os recipientes relativamente desprotegidos."
      }
    ]
  },
  "creature-beggar": {
    "description": "Onde há pobreza, há mendigos. São de fato os oprimidos da sociedade: gente lançada às ruas por uma variedade de reveses ou pelo peso das circunstâncias. Alguns trabalham para organizações do submundo como olheiros, espiões ou até músculo barato — às vezes por escolha, mas muitas vezes não.",
    "sections": []
  },
  "creature-prisoner": {
    "description": "A maioria de quem acaba numa cadeia, masmorra ou prisão só mata o tempo dos dias intermináveis até o fim do cárcere. Alguns, porém, usam força e intimidação para ganhar status e fabricam armas improvisadas para derrubar inimigos ou usar numa fuga.",
    "sections": []
  },
  "creature-urchin": {
    "description": "Embora as escapadas possam ser notórias, poucos moleques de rua buscam a emoção. Para alguns, quando esmolar não basta para encher a barriga, o furto vira tática de sobrevivência. Muitos grupos criminosos também usam moleques como espiões e mensageiros, enquanto os treinam para se tornarem futuros batedores de carteira, arrombadores e soldados rasos.",
    "sections": []
  },
  "creature-drunkard": {
    "description": "Toda taverna tem um — aquela pessoa empenhada em esquecer as mágoas junto com todo o resto. Muitos são inofensivos; uns poucos têm pavio curto.",
    "sections": []
  },
  "creature-gunsmith": {
    "description": "Embora todo pistoleiro aprenda o básico de manter e consertar armas de fogo no treino, poucos questionariam a perícia de um mestre armeiro quanto às armas pelas quais vivem e morrem. Armeiros profissionais raramente se encontram fora de povoados onde armas de fogo são comuns, como Alkenstar ou Dongun Hold, mas mestres de verdade deste ofício especializado tendem a construir reputações que se estendem bem além das fronteiras da região que chamam de lar.",
    "sections": []
  },
  "creature-mechanic": {
    "description": "Ninguém tira mais de um equipamento do que um mecânico. Um mecânico conserta quase qualquer dispositivo mecânico que você coloque à frente com desenvoltura. Também pode empurrar o dispositivo a render mais do que você jamais esperou — desde que não se importe com uma explosãozinha de vez em quando. Não se distraia com o trabalho impressionante, ou uma chave de boca rápida pode te pegar de surpresa.",
    "sections": []
  },
  "creature-driver": {
    "description": "Com ousadia e charme, um condutor é operador profissional de veículos mecânicos. A perícia e a imprudência lhe dão uma reputação que envergonha até os cavaleiros mais rápidos. O veículo vira extensão do corpo, permitindo façanhas quase impossíveis de manobra. Condutores têm outros truques na manga: o charme é inegável. Quando preciso, falam, mentem ou amedrontam para sair de uma situação turbulenta — dentro e fora do veículo.",
    "sections": [
      {
        "id": "aviator",
        "title": "Aviador",
        "body": "Nem todos os condutores se limitam à terra. Aviadores se especializam em máquinas voadoras mecânicas. Muitos os veem como imprudentes, pois raramente se contentam em simplesmente voar do ponto A ao ponto B. Em vez disso, tiram proveito total da liberdade do céu para achar o caminho mais emocionante — o que muitas vezes envolve manobras com nomes duvidosos."
      }
    ]
  },
  "creature-artillerist": {
    "description": "A manutenção e a operação de uma arma de cerco são a mais alta forma de arte para o artilheiro. Não têm rival em confiabilidade e velocidade graças a anos de experiência e treino. O domínio é tal que muitas vezes constroem modelos menores da arma predileta para montar nos ombros. Muitos insistem que é para emergências, mas de fato gostam de fabricar, projetar e aperfeiçoar a peça pessoal de artilharia. Tradicionalmente, artilheiros atuam dos dois lados de um cerco. Armas maciças disparam contra as muralhas e de cima delas. Nessas batalhas, são inestimáveis. Porém também aparecem fora de guerras enormes: por exemplo, costumam ser empregados em navios para gerir canhões e arpões.",
    "sections": [
      {
        "id": "siege-weapons",
        "title": "Armas de cerco",
        "body": "O artilheiro foi pensado para combinar com armas de cerco, e engenheiros em geral combinam bem com esses grandes instrumentos de guerra. Armas de cerco costumam funcionar melhor com vários NPCs na tripulação. As regras de armas de cerco estão no livro."
      }
    ]
  },
  "creature-demolitionist": {
    "description": "Enquanto a maioria dos engenheiros se orgulha de construir algo que pode sobreviver muitas vidas, o demolidor se orgulha de destruir essas coisas pomposas do jeito mais espetacular possível. Todo projeto tem uma falha, e essa falha em geral envolve grandes quantidades de explosivos. Demolidores costumam ser pragmáticos e calculistas, cuidando de destruir o que está à frente com a maior eficiência possível.",
    "sections": []
  },
  "creature-toymaker": {
    "description": "O capricho de um brinquedista só se compara à implacabilidade quando encurralado. A maioria das criações existe só para o prazer dos outros. Porém, todo brinquedista sabe — por projetos falhos ou criações de propósito — como transformar brinquedos em armas perigosas. Costumam hesitar em usá-los assim e, na maioria das vezes, tentam resolver o problema com diplomacia primeiro.\n\nAlguns brinquedistas se voltaram por completo à profissão de fazer brinquedos mortais. Muitas vezes têm patronos perigosos ou intenções nefastas. Alguns usam brinquedos perigosos como vigilantes; outros, para contrabandear armas para áreas guardadas.",
    "sections": []
  },
  "creature-gadgeteer": {
    "description": "Poucos estão tão preparados para o imprevisto quanto um engenhoqueiro, mestre em montar criações aparentemente impossíveis quase do nada. São sempre úteis quando o plano dá errado, porque conseguem fabricar rápido a ferramenta perfeita para sair até da enrascada mais pegajosa.\n\nDe vez em quando, alguém tenta contratar um engenhoqueiro para aperfeiçoar um único projeto, replicá-lo e fazer versões mais permanentes das engenhocas improvisadas. Esse esforço em geral é em vão: até os mais talentosos dificilmente replicam com perfeição um projeto feito no momento, mesmo com os mesmos materiais. Na verdade, sob pressão, provavelmente criam uma engenhoca funcional de um jeito diferente toda vez, ainda que tenham o mesmo material. Isso torna a duplicação quase impossível.",
    "sections": []
  },
  "creature-rocketeer": {
    "description": "É preciso uma personalidade bem específica para amarrar no corpo um tanque cheio de substância alquímica altamente inflamável e atear fogo para se lançar ao céu; talvez por isso a maioria dos fogueteiros seja imprudente e bombástica, e se deleite com o teatro inerente ao ofício. Embora a imprevisibilidade dos dispositivos de foguete e a alta taxa de baixas entre quem os usa os tornem em geral inadequados para aplicações militares, algumas almas corajosas os usaram para se tornar heróis populares ousados ou acrobacias de palco, muitas das quais culminam na própria morte dramática.",
    "sections": []
  },
  "creature-dynamo": {
    "description": "As próteses intricadas de mecanismo de relógio conhecidas como dínamos de prata ficaram cada vez mais comuns nos últimos anos, sobretudo em refúgios de progresso tecnológico como o Forte Dongun e a cidade de Absalom, mas alguns engenheiros especializados elevaram a dedicação à pesquisa e ao desenvolvimento desses dispositivos a um patamar inteiramente novo. Esses indivíduos buscam a perfeição corporal pela aumentação, substituindo os próprios membros por protótipos avançados e às vezes não testados que lhes concedem uma grande variedade de habilidades.",
    "sections": []
  },
  "creature-juggernaut": {
    "description": "A pesada armadura de metal mecânica que um colosso veste é feita sob medida, altamente complexa e especializada no portador. Outras criaturas não conseguem usar a armadura a menos que tenham perícia semelhante e a personalizem a fundo.",
    "sections": [
      {
        "id": "juggernaut-rumors",
        "title": "Rumores do colosso",
        "body": "A lenda diz que a primeira armadura de colosso foi construída por um inventor brilhante, mas misantropo, que arrasou a própria oficina antes de embarcar numa saraivada de destruição indiscriminada. Embora o surto tenha acabado rápido quando a criação atravessou um assoalho de madeira e ficou presa num porão, a história inspirou uma nova geração de maquinistas a refinar e melhorar com diligência o projeto original."
      }
    ]
  },
  "creature-forager": {
    "description": "Forrageadores conhecem as áreas em que vivem e trabalham como ninguém. Podem dizer exatamente onde achar uma samambaia medicinal rara, quando colhê-la e como usá-la; só não espere que estejam em dia com a fofoca da vila. Passam o máximo de tempo possível no ermo, enchendo os cestos com uma variedade de plantas úteis.",
    "sections": []
  },
  "creature-torchbearer": {
    "description": "Porta-tochas carregam fontes de luz para exploradores experientes.",
    "sections": []
  },
  "creature-natural-scientist": {
    "description": "Se há um mistério da natureza que exige evidência em primeira mão para ser resolvido, cientistas naturais coletam esses dados. Passam meses documentando e observando eventos e criaturas no mundo natural antes de voltar às academias, laboratórios e gabinetes reais.",
    "sections": [
      {
        "id": "natural-sciences-and-those-who-study-them",
        "title": "Ciências naturais e quem as estuda",
        "body": "Há uma enorme variedade de coisas para explorar e anotar, e cientistas naturais querem documentar tudo:\n\n**Astrônomos** fazem observações detalhadas do céu noturno. **Biólogos** podem estudar o impacto da civilização nas áreas selvagens. **Botânicos** podem proteger uma espécie de planta recém-descoberta. **Químicos** podem tentar localizar a fonte de um óleo misterioso. **Geólogos** podem correr para estudar um vulcão. **Zoólogos** podem tentar rastrear um animal raro e elusivo."
      }
    ]
  },
  "creature-poacher": {
    "description": "Regras contra a caça podem isolar reservas privadas da nobreza ou proteger a viabilidade de populações animais em florestas compartilhadas em estações específicas. Caçadores ilegais violam essas leis — às vezes por ganância, às vezes por desespero, às vezes por esporte.",
    "sections": [
      {
        "id": "penalties-for-poaching",
        "title": "Penas por caça ilegal",
        "body": "A punição por caçar em terra nobre pode ser cruel. Mutilar caçadores ilegais cortando dedos é prática comum. Penas mais cruéis incluem prender o caçador nas próprias armadilhas e deixá-lo indefeso, amarrá-lo nas peles ensanguentadas da presa e soltar cães para persegui-lo pelo bosque."
      }
    ]
  },
  "creature-chronicler": {
    "description": "Explorar significa muito pouco se não existir relato da expedição. Bandos aventureiros prezam cronistas que registrem os feitos.",
    "sections": []
  },
  "creature-tracker": {
    "description": "Um olho destreinado pode notar um ou outro sinal da passagem de uma criatura selvagem, mas só um rastreador hábil identifica vários desses sinais e percebe a relação entre eles, ligando um ao outro até formarem uma trilha de pegadas, fezes, pelo, penas e sangue que leva ao covil da presa.",
    "sections": []
  },
  "creature-guide": {
    "description": "Guias levam viajantes, turistas e aventureiros ao mundo natural maravilhoso, usando a perícia para evitar monstros mortais e perigos horrendos.",
    "sections": []
  },
  "creature-mountaineer": {
    "description": "Alpinistas em geral viajam sozinhos, mas alguns guiam expedições em terreno perigoso.",
    "sections": []
  },
  "creature-gamekeeper": {
    "description": "Guarda-caças conhecem cada besta que anda, rasteja, voa ou nada no território e onde achá-las; tente acompanhar a matilha se acha que consegue. A terra escolheu essas pessoas como guardiãs, dando-lhes poderes misteriosos enquanto estão no território. Estão prontos para manter o equilíbrio.",
    "sections": []
  },
  "creature-tomb-raider": {
    "description": "Grande tesouro espera quem se dispõe a explorar as profundezas perigosas de tumbas antigas e masmorras esquecidas. Alguns saqueadores de tumbas buscam as riquezas de eras passadas; outros recuperam pedaços de história dados como perdidos nas areias do tempo.",
    "sections": []
  },
  "creature-hunter": {
    "description": "Como se vê nas muitas representações de Erastil de cabeça de alce, deus da caça, o caçador é em grande medida uma criatura da floresta, conhecido pela floresta e familiarizado com cada aspecto dela. Afinal, a determinação final de quem é o caçador e quem é a presa muitas vezes depende de quem consegue fazer do terreno um aliado.",
    "sections": []
  },
  "creature-woolly-wrangler": {
    "description": "Quando um animal gigante e perigoso aparece, sempre tem alguém que tenta acariciá-lo. Um domador lanoso em geral anda acompanhado de um elefante ou mamute. Pode Comandar este Animal sem precisar passar num teste de Natureza.",
    "sections": []
  },
  "creature-expedition-leader": {
    "description": "Expedições em larga escala exigem um líder central. Líderes de expedição tendem a manter a cabeça fria em situações perigosas e a decidir rápido quando o tempo aperta.",
    "sections": []
  },
  "creature-apothecary": {
    "description": "O boticário combina com perícia materiais em unguentos e medicamentos usando ervas trituradas, minerais curativos e extratos potentes.",
    "sections": []
  },
  "creature-local-herbalist": {
    "description": "Herboristas locais usam o entendimento do mundo natural para curar e restaurar o equilíbrio. A maioria entra numa loge secreta que ensina essas artes antigas.",
    "sections": []
  },
  "creature-physician": {
    "description": "A arte da medicina mistura o intelectual e o prático, preocupada com o funcionamento das doenças e com como preveni-las. O médico pode ser encontrado consultando tomos folheados enquanto examina pacientes com meticulosidade para entender melhor a condição, antes de determinar o tratamento mais eficaz.",
    "sections": []
  },
  "creature-surgeon": {
    "description": "O cirurgião se especializa na alteração física do corpo para impedir a disseminação da doença, removendo carne necrótica e em decomposição para ajudar o todo a sobreviver. Poucos curandeiros conhecem melhor a ciência da anatomia e da fisiologia.",
    "sections": []
  },
  "creature-plague-doctor": {
    "description": "Esses curandeiros, muitas vezes vistos com máscaras distintas e queimando pós para se defender de pestes no ar, são temidos tanto quanto respeitados. Ver um médico da peste sinaliza que a doença infestou a terra — e que talvez já tenha se instalado.",
    "sections": []
  },
  "creature-tonic-merchant": {
    "description": "Este alquimista vende poções de cura, mas pode oferecer os serviços sem taxa a quem realmente precisa.",
    "sections": []
  },
  "creature-humanitarian-hermit": {
    "description": "Alguns druidas cuidam dos esquecidos pela sociedade e prosperam nas bordas da civilização.",
    "sections": [
      {
        "id": "reincarnation-transitions",
        "title": "Transições de reencarnação",
        "body": "Em casos de morte por injustiça praticada pela comunidade, _reencarnar_ pode dar aos falecidos uma chance renovada de vida, livres do peso do passado e das amarras da sociedade antiga. O eremita humanitário age como cuidador nessa transição, ajudando a pessoa a procurar velhos amigos para cura emocional e encerramento. Se o eremita os considerar bons candidatos, pode ajudar o reencarnado a achar uma vida nova na ordem druídica."
      }
    ]
  },
  "creature-therapeutic-healer": {
    "description": "Alguns curandeiros sentem grande empatia pelos protegidos e se esforçam para ajudar a carregar os fardos dos aliados dentro e fora do combate.",
    "sections": []
  },
  "creature-peerless-healer": {
    "description": "Curandeiros inigualáveis são lendários, misturando medicina divina e natural. Muitas vezes pilares nas respectivas comunidades, zelam pela saúde do povo.",
    "sections": []
  },
  "creature-commoner": {
    "description": "Muitos plebeus levam vidas duras de labuta enquanto trabalham para manter a família alimentada e abrigada com relativo conforto.",
    "sections": []
  },
  "creature-dockhand": {
    "description": "Trabalhando para carregar e descarregar carga de navios, estivadores são tidos como indisciplinados, mas muitos se concentram e trabalham duro até o serviço acabar.",
    "sections": []
  },
  "creature-servant": {
    "description": "Um serviçal pode ser camareira ou mordomo, mantendo uma casa em ordem, ou garçom num estabelecimento como uma estalagem, anotando pedidos e atendendo fregueses.",
    "sections": []
  },
  "creature-drover": {
    "description": "Tropeiros se especializam em mover rebanhos de gado por grandes distâncias.",
    "sections": []
  },
  "creature-farmer": {
    "description": "Trabalhadores dos campos, vinhedos e pomares do mundo, fazendeiros são conhecidos pela resistência rústica e pela perícia com plantas e animais.",
    "sections": []
  },
  "creature-fisher": {
    "description": "Mais do que hobbyistas, pescadores pegam peixes e outros frutos do mar com a intenção de vender a maior parte ou toda a pesca.",
    "sections": []
  },
  "creature-miner": {
    "description": "Mineiros exploram as profundezas em busca de minerais e minérios raros, tomando inúmeras precauções para se manterem seguros.",
    "sections": []
  },
  "creature-gravedigger": {
    "description": "Um grupo de trabalhadores muitas vezes ignorado, coveiros têm fama de ser tão quietos e sombrios quanto o local de trabalho. Em geral são fortes e duros pelas longas horas de labuta pesada, e tendem a ter uma perspectiva única sobre a vida e a morte.",
    "sections": []
  },
  "creature-innkeeper": {
    "description": "A visão de uma estalagem é bem-vinda a qualquer viajante cansado. Estalajadeiros muitas vezes estão limpando o salão comum, supervisionando a refeição da noite ou acomodando hóspedes novos. Ficam de olho no que os vizinhos andam fazendo e costumam ser ótimas fontes de informação.",
    "sections": []
  },
  "creature-construction-worker": {
    "description": "Um arquiteto brilhante pode imaginar maravilhas estruturais, mas alguém precisa pegar o martelo e tornar esses sonhos reais. Operários da construção são a espinha dorsal da infraestrutura de qualquer cidade.",
    "sections": []
  },
  "creature-messenger": {
    "description": "Quando um recado, correio ou encomenda precisa ser entregue, mensageiros fazem as entregas — em geral a partir de vilas e cidades grandes ou para outras vilas e cidades.",
    "sections": []
  },
  "creature-vermin-catcher": {
    "description": "Exterminadores pagos mantêm ruas e esgotos livres de pragas como ratos, cobras, doninhas e insetos — até ratos gigantes.",
    "sections": []
  },
  "creature-martial-student": {
    "description": "Todo guerreiro precisa começar em algum lugar.",
    "sections": []
  },
  "creature-tournament-combatant": {
    "description": "Torneios atraem artistas marciais como mariposas à chama, com participantes cruzando grandes distâncias pela chance de testar o poder.",
    "sections": []
  },
  "creature-black-belt": {
    "description": "Muitas escolas de artes marciais usam faixas coloridas para diferenciar níveis de perícia. Acima de todas está a faixa-preta, um praticante avançado que consegue contra-atacar qualquer golpe.",
    "sections": []
  },
  "creature-mixed-martial-artist": {
    "description": "Esses lutadores combinam as quedas de um lutador livre com posturas agressivas e golpes heterodoxos, garantindo que os adversários não saibam o que os atingiu.",
    "sections": []
  },
  "creature-grandmaster": {
    "description": "Além da faixa-preta, existe o grão-mestre. Se uma batalha estoura, este guerreiro incrível possui destreza de qi inigualável e socos que matam.",
    "sections": []
  },
  "creature-arms-dealer": {
    "description": "Um comerciante de armas de má fama tem acesso a todo tipo de arma mortal e pode fornecê-las rápido a clientes necessitados… pelo preço certo, claro.",
    "sections": []
  },
  "creature-political-upstart": {
    "description": "Ardente e eufórico, um emergente político empurra ativamente contra o status quo.",
    "sections": []
  },
  "creature-musketeer": {
    "description": "Espalhafatoso e confiante, o mosqueteiro não se furta a usar truques sujos para ganhar vantagem na luta. Apesar da bravata, mosqueteiros são ferozmente leais aos aliados.",
    "sections": []
  },
  "creature-runaway-blueblood": {
    "description": "Insatisfeito com a criação privilegiada, o sangue-azul fugitivo deixou a vida de luxo para trás para forjar um caminho novo.",
    "sections": []
  },
  "creature-gunwitch": {
    "description": "Como portadores tanto de poder oculto quanto de armas de fogo, bruxos de arma se orgulham de usar armas não convencionais e magia obscura. Para mudar o patrono (A Fiandeira das Tramas), troque _cutucar o destino_ e _golpe certeiro_.",
    "sections": [
      {
        "id": "the-code",
        "title": "O código",
        "body": "A maioria dos independentes adere a um código de conduta, muitas vezes em oposição direta às normas da sociedade. Isso pode torná-los forasteiros ou rebeldes, mas também lhes permite ser fiéis a si mesmos e seguir o próprio caminho, em vez de se conformar a expectativas ou regras impostas por outros."
      }
    ]
  },
  "creature-unsanctioned-sheriff": {
    "description": "Acreditando que os fins justificam os meios, o xerife sem mandato não teme usar os outros para o próprio ganho, por suborno, manipulação ou força.",
    "sections": []
  },
  "creature-high-roller": {
    "description": "Quem tem um domínio particular da sorte pode ganhar a vida com jogos de azar como apostador profissional.",
    "sections": []
  },
  "creature-peerless-duelist": {
    "description": "Rumores circulam nos salões de que um mestre duelista invicto percorre as estradas, à espera do próximo desafio.",
    "sections": []
  },
  "creature-bodyguard": {
    "description": "Contratados para proteger alguém famoso ou poderoso, guarda-costas usam intimidação, raciocínio rápido e perícia marcial para manter os protegidos a salvo. Tais mercenários podem ser auxiliares das guardas pessoais de um nobre, mas com diretrizes especiais para salvaguardar os patronos.",
    "sections": []
  },
  "creature-bounty-hunter": {
    "description": "Caçadores de recompensa estão sempre em movimento, seja intramuros ou no ermo, rastreando os fugitivos para captura… ou descarte. Muitas vezes dependendo tanto de furtividade ou engano quanto de perícia marcial, empregam um vasto leque de talentos para cumprir os objetivos e embolsar o pagamento gordo.",
    "sections": []
  },
  "creature-mage-for-hire": {
    "description": "Alguns mercenários vendem talentos mágicos para ganhar a vida. Embora haja muitos tipos de magos de aluguel, alguns dos mais sorrateiros se especializam em vidência, usando as habilidades para infiltração e sabotagem.",
    "sections": []
  },
  "creature-monster-hunter": {
    "description": "Alguns mercenários evitam as complicações da política e da vassalagem e simplesmente recebem para caçar monstros. É uma forma direta de serviço mercenário, muitas vezes extremamente perigosa, mas que pode render glória e fama.",
    "sections": [
      {
        "id": "how-to-hunt-a-monster",
        "title": "Como caçar um monstro",
        "body": "Caçadores de monstros lutam de formas diferentes. Você pode substituir Investida Súbita por uma das seguintes.\n\n**Balanço poderoso** O caçador de monstros faz um Golpe corpo a corpo que causa 1d12 de dano adicional. Isso conta como dois ataques ao calcular a penalidade de ataques múltiplos. **Balanço distante** O caçador de monstros faz um Golpe com uma arma corpo a corpo, aumentando o alcance em 1,5 m para esse Golpe. **Manobras brutas** O caçador de monstros pode Reposicionar, Empurrar ou Derrubar um inimigo até duas categorias de tamanho maior, e pode usar essas ações enquanto empunha uma arma de duas mãos. **Caçador de grande porte** O caçador de monstros recebe +1 de bônus de circunstância à CA contra ataques feitos por criaturas Grandes ou maiores. Além disso, sempre que causar dano a uma criatura Grande ou maior, ganha 5 Pontos de Vida temporários que duram até o início do próximo turno."
      }
    ]
  },
  "creature-mage-killer": {
    "description": "Sempre que o alto-comando precisa tirar um conjurador inimigo do tabuleiro no meio da batalha, envia um mata-magos.",
    "sections": []
  },
  "creature-mercenary-band": {
    "description": "Algumas bandas de soldados experientes têm reputações lendárias, com as listas repletas de guerreiros famosos. Outras são murmuradas por atos cruéis e traições oportunistas.",
    "sections": []
  },
  "creature-exiled-revolutionary": {
    "description": "Forças contratam um revolucionário exilado porque ele já fez parte do inimigo. Um herdeiro perdido, um nobre que falou contra a tirania ou um político perseguido injustamente possui conhecimento íntimo das táticas, da logística e do território do adversário.",
    "sections": [
      {
        "id": "betraying-the-betrayed",
        "title": "Trair os traídos",
        "body": "Revolucionários exilados podem ser aliados valiosos, sobretudo se os objetivos se alinharem aos dos PJs. Porém, o revolucionário exilado foi vítima de traição extrema e se guarda constantemente contra ela. Os PJs devem ter cuidado ao considerar voltar atrás na palavra com um revolucionário exilado. Se alguém agir de um modo que o revolucionário possa perceber como traição, ele dedicará a vida a vingar a transgressão percebida, tornando-se até um instrumento vilanesco do mal se isso se fizer necessário."
      }
    ]
  },
  "creature-siegebreaker": {
    "description": "Quando uma fortificação bem construída ou magicamente protegida repele todos os assaltos, chama-se um quebra-cerco. Esses mestres da destruição alquímica acham que, quanto maior e mais protegida a muralha, mais satisfatório é quebrá-la.",
    "sections": []
  },
  "creature-combat-engineer": {
    "description": "Seja uma ponte para passar um batalhão por um rio, torres de vigia para romper a névoa da guerra ou fortificações para assegurar território, os exércitos sempre precisaram de quem saiba construir. O engenheiro de combate é um soldado especializado nesses tipos de construção.",
    "sections": []
  },
  "creature-infantry-soldier": {
    "description": "Embora estejam baixo na hierarquia militar, os soldados de infantaria ainda são guerreiros altamente disciplinados, um desafio para qualquer pessoa comum enfrentar em combate.",
    "sections": []
  },
  "creature-conscript-squad": {
    "description": "Nem todos os soldados estão no campo de batalha por escolha. Muitas vezes armados com implementos agrícolas modificados, conscritos em geral são mal treinados e mal organizados. No calor da batalha, tendem a entender mal ou desobedecer ordens, causando baixas dos dois lados.",
    "sections": []
  },
  "creature-standard-bearer": {
    "description": "Dentro de uma tropa, o porta-estandarte é um farol de moral, coesão e camaradagem. Agita com orgulho a bandeira da entidade pela qual luta. Quer lidere a ponta de lança ou dê apoio nas retaguardas, a mera presença costuma bastar para reunir os soldados ao redor e continuar lutando.",
    "sections": [
      {
        "id": "the-standard-s-significance",
        "title": "O significado do estandarte",
        "body": "Ser porta-estandarte não é tarefa fácil. No campo de batalha, serve como o principal representante da organização a que serve e, se o estandarte for capturado ou destruído, resultaria numa enorme perda de moral. Se um porta-estandarte voltar à companhia vivo e sem o estandarte de batalha, punições duras logo seguirão. Fora da batalha, porta-estandartes muitas vezes se esforçam para fazer amizade com o restante do pelotão, pois são o soldado que mais precisará de proteção quando o combate começar."
      }
    ]
  },
  "creature-line-infantry": {
    "description": "A infantaria é a espinha dorsal da maioria dos exércitos. Esses soldados profissionais, marcados por uniformes iguais, táticas diretas e o ímpeto de seguir ordens bem ensaiadas, formam o grosso da maioria das forças militares — mas muitas vezes são considerados os mais descartáveis.",
    "sections": []
  },
  "creature-sniper": {
    "description": "Um olho aguçado, uma mão firme e um instinto assassino se combinam para formar um arauto da morte implacável e sem emoção. Um franco-atirador em geral trabalha sozinho, embora às vezes seja visto ao lado de um observador ou como parte de um esquadrão maior.",
    "sections": [
      {
        "id": "outfitting-a-sniper",
        "title": "Equipar um franco-atirador",
        "body": "As armas e a armadura de um franco-atirador variam conforme o modo como deseja cumprir o trabalho. Embora este use um arcabuz, muitos escolhem arcos longos se a pólvora não for uma opção ou se preferirem meios mais sutis de matar. Franco-atiradores em geral abrem mão das cores da companhia em favor de tons que melhor combinem com o entorno. Costumam carregar só uma insígnia pequena para identificação, e a posição em geral é de conhecimento restrito."
      }
    ]
  },
  "creature-phalanx-formation": {
    "description": "Uma formação de falange de verdade exige o uso simultâneo de lança e escudo para atacar inimigos perto e longe enquanto se defendem uns aos outros. Quantidades impressionantes de trabalho em equipe não só são benéficas, mas essenciais à sobrevivência da tropa.",
    "sections": []
  },
  "creature-heavy-cavalry": {
    "description": "Uma banda de cavaleiros em carga, montados em cavalos de guerra pesados e vestidos de placa de aço, é uma visão a temer no campo de batalha. O peso da armadura, porém, os torna pouco adequados a manobras prolongadas em terra. Esquadrões de escudeiros são necessários para cuidar dos cavalos, consertar armaduras e de outro modo apoiar o grupo de cavalaria pesada entre batalhas. Apesar dessas limitações, a capacidade de romper as linhas inimigas os torna uma ferramenta inestimável para exércitos profissionais.",
    "sections": []
  },
  "creature-drill-sergeant": {
    "description": "Manter a disciplina é da máxima importância ao conduzir uma campanha militar. Muitas vezes elevados de soldados veteranos, sargentos instrutores são responsáveis por treinar tropas comuns, garantindo que consigam seguir ordens e lutar bem no calor da batalha. Embora possam ser bruscos e teimosos, a disciplina dura muitas vezes é crucial para manter a ordem e conservar os soldados vivos.",
    "sections": []
  },
  "creature-hellknight-cavalry-brigade": {
    "description": "Uma brigada de cavalaria dos Cavaleiros Infernais consiste em vários Cavaleiros Infernais e um único maralictor de campo, todos vestindo a armadura distintiva da ordem e empunhando lanças de justas. O maralictor fala pela brigada, interrogando viajantes que encontra e latindo ordens. Uma brigada dos Cavaleiros Infernais em geral se baseia num forte ou outra fortificação que controla uma área medida por um dia de cavalgada em todas as direções — cerca de 40 km. Missões de maior alcance são possíveis, mas exigem apoio logístico substancial.",
    "sections": []
  },
  "creature-mage-knight": {
    "description": "Embora muitos conjuradores prefiram se defender com magia, alguns reconhecem que não há substituto para uma armadura de aço. Cavaleiros magos desafiam o estereótipo de que conjuradores são frágeis, delicados e passivos e, em vez disso, escolhem se virar no combate corpo a corpo.",
    "sections": []
  },
  "creature-adept": {
    "description": "Adeptos desbloquearam apenas os mistérios ocultistas mais menores. Alguns são escolhidos por praticantes consagrados para treinamento adicional.",
    "sections": []
  },
  "creature-harrow-reader": {
    "description": "Um baralho harrow é um conjunto de 54 cartas com ilustrações simbólicas que serve como ferramenta sagrada de adivinhação. Temidos pelos supersticiosos e evitados por quem sabe melhor do que tentar a sorte, muitos leitores de harrow vivem e trabalham em comunidades itinerantes, muitas vezes mudando de vila em vila conforme surgem oportunidades.",
    "sections": [
      {
        "id": "forms-of-fortune-telling",
        "title": "Formas de adivinhação",
        "body": "**Antomancia**: flores **Astrologia**: a Caravana Cósmica **Astromancia**: movimento e brilho das estrelas **Quiromancia**: leitura das linhas do coração, da vida e da cabeça na palma **Demonomancia**: perguntar a demônios **Leitura de harrow**: leituras das cartas harrow **Haruspício**: entranhas **Ictiomancia**: o próximo peixe pescado **Mazomancia**: um bebê amamentando **Oneiromancia**: sonhos **Leitura de pêndulo**: responder sim ou não com um pêndulo **Piromancia**: jogar substâncias no fogo **Tassomancia**: folhas de chá **Tiromancia**: coagulação do queijo"
      }
    ]
  },
  "creature-coven-aspirant": {
    "description": "Só os tolos chamariam a atenção de bruxas, mas alguns aspirantes se esforçam para entrar num coven de bruxas por desejo de poder ou companhia.",
    "sections": [
      {
        "id": "unusual-covens",
        "title": "Covens incomuns",
        "body": "Embora raros, podem se formar covens que incluem não bruxas, desde que pelo menos duas bruxas façam parte. Changelings, espíritos da natureza vingativos, mortos-vivos inteligentes e infiéis às vezes se aliam a bruxas. A composição incomum do coven altera as magias concedidas pela parceria, em geral substituindo a magia _metamorfose amaldiçoada_ por uma magia adequada ao novo membro."
      }
    ]
  },
  "creature-cultist": {
    "description": "Cultistas passaram por um ritual de iniciação numa seita ou organização secreta; agora, se dedicam a alcançar a forma espiritual mais perfeita.",
    "sections": []
  },
  "creature-enigmatic-conspirant": {
    "description": "Organizações poderosas trabalham fora da vista do público, moldando vidas enquanto enfrentam poucas consequências. Buscar essas sociedades secretas, seja para se juntar a elas ou destruí-las, deu ao conspiracionista enigmático uma perspicácia incomum.",
    "sections": [
      {
        "id": "mystic-organizations",
        "title": "Organizações místicas",
        "body": "Golarion tem inúmeras sociedades secretas. A **Igreja de Razmir** oferece um plano de 31 passos rumo à divindade. A **Ordem Esotérica do Olho Palatino** busca verdades celestiais ditas concedidas por um anjo antigo. Os **Cavaleiros da Estrela Éon** procuram saber secreto. Seguidores do **Rivethun**, animismo anão, alcançam espíritos para ganhar conhecimento e favores."
      }
    ]
  },
  "creature-false-priest": {
    "description": "A crença é talvez a força mais forte do universo. Inculcar crença só para usá-la contra alguém no engano, porém, é o domínio de um falso sacerdote.",
    "sections": []
  },
  "creature-necromancer": {
    "description": "Profanando a ordem natural e cuspindo na cara da convenção, o necromante permanece dutamente comprometido a entender quais forças aguardam além dos limites mortais da vida e da morte.",
    "sections": []
  },
  "creature-cult-leader": {
    "description": "Uma carreira de feitos místicos combinada a uma vida de subterfúgio e intimidação elevou este ocultista a uma posição poderosa.",
    "sections": []
  },
  "creature-demonologist": {
    "description": "Demonologistas conseguem puxar uma criatura das Fendas Exteriores e dobrá-la à vontade… por um tempo.",
    "sections": []
  },
  "creature-mirror-seer": {
    "description": "Buscando ser a criatura mais poderosa e perfeita do domínio, um vidente do espelho fecha um acordo com uma entidade nefasta por mais poder. Por meio de um espelho mágico chamado _espelho maléfico_, comunicam-se com essa entidade e espionam os eventos que se desenrolam no reino.",
    "sections": [
      {
        "id": "the-mirror-gazes-back",
        "title": "O espelho olha de volta",
        "body": "O grande poder do vidente do espelho vem do _espelho maléfico_. A história do ser e do poder por trás do espelho pode ser contada de muitas formas. É um demônio preso nos limites do item, odiando a prisão e ansiando ser libertado? Uma entidade que exerce a vontade neste mundo por meio do vidente? Ambas já foram verdade de videntes do espelho na história. E quem derrotar um vidente talvez se veja falando com o espelho. Ou até fechando o próprio pacto, seguro de que, certamente, consegue evitar ser corrompido…"
      }
    ]
  },
  "creature-god-caller": {
    "description": "Os evocadores chamados chamadores de deuses têm um vínculo mágico com eidolons, reverenciados como deuses pelo povo de Sarkoris. Embora este NPC se baseie nos chamadores de deuses sarkorianos, pode ser adaptado a outros tipos de evocador trocando o eidolon por outra criatura e fazendo ajustes temáticos em perícias e magias.",
    "sections": [
      {
        "id": "god-callers-and-the-divine",
        "title": "Chamadores de deuses e o divino",
        "body": "Alguns espíritos chamados pelos chamadores de deuses de Sarkoris são seres divinos capazes de conceder magias. Considere conceder a um NPC chamador de deuses uma magia de foco de clérigo adequada a um dos domínios do deus se cultuar tal deidade (usando a mesma CD e o mesmo ataque de magia das magias primordiais). Por exemplo, a Mãe Cervo da Floresta de Pedras poderia conceder a magia de domínio _saborear o ferrão_ do domínio da dor."
      }
    ]
  },
  "creature-spirit-binder": {
    "description": "Fantasmas e outros espíritos giram em torno do atador de espíritos, criando uma aura constante de rostos e formas tremeluzentes.",
    "sections": []
  },
  "creature-curse-monger": {
    "description": "Oráculos consumidos pelas visões e pelos dons divinos concedidos a eles se voltam a caminhos mais sinistros, tornando-se amaldiçoadores. Buscando livrar-se das sombras que os assombram, os amaldiçoadores atacam e tentam prender outros ao próprio destino.",
    "sections": [
      {
        "id": "jinxed-curse-mongers",
        "title": "Amaldiçoadores aziagos",
        "body": "Para certos amaldiçoadores, espalhar a maldição é parte involuntária da própria maldição. Quando um amaldiçoador aziago começa o turno, Compartilhar Fardo tenta automaticamente amaldiçoar uma criatura aleatória no alcance que ainda não esteja amaldiçoada; isso não exige uma ação. Se a tentativa falhar, o amaldiçoador deve gastar as primeiras ações daquele turno conjurando uma magia de maldição (_metamorfose amaldiçoada_, _tanto faz_, _naufrágio de magia_, _maldição do marinheiro_, _maldição do pária_ ou _mau presságio_). Se o amaldiçoador não quiser amaldiçoar ninguém, o Mestre determina um alvo aleatório. O alvo não precisa ser um inimigo, mas não pode ser o próprio amaldiçoador."
      }
    ]
  },
  "creature-enchanting-ritualist": {
    "description": "Possuindo grandes reservas de conhecimento sobre magia mental e rituais, ritualistas encantadores também podem ser solitários e caprichosos, enganando e transformando os visitantes. O Mestre pode mudar livremente a seleção de rituais que este NPC conhece, escolhendo quaisquer rituais de 9º grau ou menor.",
    "sections": []
  },
  "creature-barrister": {
    "description": "Advogados podem servir como promotores criminais ou defensores legais, defendendo os direitos dos acusados de crimes ou nomeados como réus em casos civis.",
    "sections": []
  },
  "creature-judge": {
    "description": "Exercidos adequadamente, os deveres de um juiz incluem adesão estrita à lei independentemente da posição, com o mínimo de sentimentalismo. Porém, para cada justiça imparcial, há uma zelosamente confiante na própria agenda.",
    "sections": []
  },
  "creature-mayor": {
    "description": "O prefeito é o líder político de um povoado. Embora nem sempre seja um cargo eletivo, em geral envolve dedicar tempo tanto a funções cívicas quanto cerimoniais e conhecer as necessidades do povoado.",
    "sections": []
  },
  "creature-tax-collector": {
    "description": "Livros-razão e marcas, fluxos positivos e negativos, e tributos e alocações são o pão de cada dia de um coletor de impostos. Onde a moeda é ganha, de quem é cobrada e a quem é desembolsada são as preocupações — não quem pode pagar os impostos.",
    "sections": []
  },
  "creature-guard": {
    "description": "Guardas são membros da linha de frente de uma vigília municipal ou guarda da cidade, treinados para procurar encrenca, derrubar criminosos e seguir ordens.",
    "sections": [
      {
        "id": "raise-the-alarm",
        "title": "Soar o alarme!",
        "body": "Num povoado com alarme, brigas ou outras grandes perturbações disparam um alarme 1 rodada depois de a vigília ser alertada. Guardas começam a chegar após cerca de 5 rodadas, em geral em patrulhas de 2 ou 3 membros, com grupos maiores de 8–12 perto de locais importantes."
      }
    ]
  },
  "creature-prime-minister": {
    "description": "O primeiro-ministro é o líder da burocracia de uma nação. São políticos experientes encarregados das leis e regulamentações do território, respondendo apenas a um monarca, se houver um. Muitas vezes, porém, existe um voto de “Não Confiança” ou procedimento legal semelhante para remover o primeiro-ministro.",
    "sections": []
  },
  "creature-archer-sentry": {
    "description": "Sentinelas arqueiras superam um pouco os guardas da linha de frente, ocupando posições em muralhas, guarnições e outros locais importantes onde podem ficar fora da refrega e abater criminosos ou agressores.",
    "sections": []
  },
  "creature-harbormaster": {
    "description": "Um porto precisa se sustentar em tipos diferentes de fluxo: os fluxos marítimos e costeiros, marcados pela subida e descida das marés, e o fluxo constante do comércio. Espera-se que um mestre do porto conheça os primeiros por reflexo e incentive o último dentro das regras jurisdicionais da lei.",
    "sections": []
  },
  "creature-inspector": {
    "description": "Inspetores cultivam uma seleção ampla de perícias para investigar incêndio criminoso, assassinato e outros crimes graves, em geral em grandes centros urbanos. Podem auxiliar aventureiros, talvez notando um objeto ou criatura que parece fora do comum sem ter certeza do porquê.",
    "sections": []
  },
  "creature-jailer": {
    "description": "A responsabilidade principal de um carcereiro é impedir que os prisioneiros fujam. Carcereiros muitas vezes precisam usar força, ou a ameaça de força, para manter os detidos na linha, pois até as celas, algemas ou correntes mais cuidadosamente forjadas podem falhar com o tempo e a persistência quando os prisioneiros têm vontade de tentar a fuga.",
    "sections": []
  },
  "creature-equestrian-constable": {
    "description": "Condestáveis equestres patrulham à procura de criminosos a cavalo em áreas ricas ou servem como reeves para cumprir ordens judiciais. Alguns patrulham estradas importantes longe da proteção da guarda da cidade.",
    "sections": []
  },
  "creature-watch-officer": {
    "description": "Muitas vezes liderando uma equipe pequena de guardas de posto inferior, oficiais da vigília patrulham as áreas designadas para manter a ordem e aplicar as leis. Cumprem o trabalho, embora os métodos nem sempre sejam gentis ou bondosos.",
    "sections": []
  },
  "creature-city-guard-squadron": {
    "description": "Guarnições de guardas profissionais recebem as tarefas de patrulhar as ruas, auxiliar a cidadania e agir como resposta militar rápida em tempos de crise.",
    "sections": [
      {
        "id": "local-guards",
        "title": "Guardas locais",
        "body": "O esquadrão da guarda da cidade retratado aqui consiste em humanos armados com alabardas e bestas. Você pode alterar esses detalhes para combinar com os povoados do jogo, adicionando traços de ancestralidade, idiomas regionais e outras habilidades conforme necessário, e trocando o armamento por armas adequadas à cultura local. Algumas das entradas de ancestralidade no capítulo 2 também incluem tropas ainda mais adequadas a povoados habitados por ancestralidades diferentes!"
      }
    ]
  },
  "creature-captain-of-the-guard": {
    "description": "O capitão da guarda lidera uma tropa de soldados que serve como força de segurança de um indivíduo poderoso, na maioria das vezes um nobre de alto posto ou um mercador muito rico, embora esta ficha também possa representar um capitão da guarda de posto inferior a serviço do líder de uma nação. Um oponente formidável por direito próprio, o capitão da guarda emprega habilmente as tropas para proteger a vida e a saúde do protegido.",
    "sections": []
  },
  "creature-watchmage": {
    "description": "Um mago da vigília usa uma mistura de magia e treinamento marcial para aplicar a lei. Detecta magicamente criminosos invisíveis, localiza propriedade roubada e contra-ataca magias ilegais.",
    "sections": []
  },
  "creature-executioner": {
    "description": "Carrascos executam sentenças de tiranos cruéis e de governantes legítimos. A maioria permanece entorpecida à necessidade do dever, mas alguns carrascos malignos passam a amar o poder de ter a vida de outra pessoa nas mãos.",
    "sections": []
  },
  "creature-gendarme": {
    "description": "Governos poderosos retêm gendarmes para guardar magistrados importantes, fazer cumprir leis que protegem a segurança nacional, restabelecer a ordem em meio a tumultos e capturar criminosos excepcionalmente perigosos. Também são enviados para lidar com casos importantes em áreas rurais sem guarda substancial própria.",
    "sections": []
  },
  "creature-warden": {
    "description": "Guardiões da fronteira são os principais defensores de bordas e fronteiras. Quer vigiem uma só vila ou uma região inteira, mantêm o olhar atento a ameaças contra os protegidos. São gente firme, muitas vezes chamados ao dever por Erastil para proteger quem está ao redor. Seja em tempos de guerra ou ao longo da fronteira, costumam ser o fio equilibrado da lâmina entre uma comunidade e o ermo nas franjas.",
    "sections": []
  },
  "creature-accuser-agent": {
    "description": "Agentes acusadores podem ser advogados de alta corte, mestres-espiões oficiais ou ajudantes inócuos entregando mensagens importantes a magistrados, generais, oficiais ou mercenários. Têm ampla margem em matérias de segurança do governo, embora às vezes tenham pouca supervisão. Quando os achados exigem resposta oficial, apresentam casos perante tribunais nacionais ou em cortes reais.",
    "sections": []
  },
  "creature-arrester-squadron": {
    "description": "Estes guardas foram extensamente treinados para executar manobras complexas juntos. São enviados para capturar acusados considerados especialmente perigosos (seja pelas próprias habilidades ou pelos aliados).",
    "sections": []
  },
  "creature-infernal-registrar": {
    "description": "O registrador infernal é um representante mortal da burocracia do Inferno. Pode acessar cópias de todos os contratos infernais assinados por um habitante do próprio mundo e navegar as maquinações dos muitos diabos do Inferno. Pode conceder acesso especial — por um preço.",
    "sections": [
      {
        "id": "the-devil-out-of-the-details",
        "title": "O diabo fora dos detalhes",
        "body": "Em vez do Inferno, um registrador infernal pode administrar a burocracia de uma cidade mágica vasta ou de uma comuna de entidades de outros mundos. Para representar isso, substitua qualquer referência a diabos por um tipo de criatura mais adequado, e substitua as magias divinas do registrador por magias arcanas ou ocultistas, respectivamente. Também fala um idioma mais adequado, como Dracônico ou Aklo. As habilidades de contrato permanecem essencialmente iguais, embora os detalhes possam ser descritos de outra forma."
      }
    ]
  },
  "creature-watchmage-squadron": {
    "description": "Governos muitas vezes organizam e destacam esquadrões de magos da vigília em lugares onde se espera magia perigosa. Os membros combinam a conjuração para lançar em um grau mais alto do que conseguiriam sozinhos.",
    "sections": []
  },
  "creature-grand-inquisitor": {
    "description": "Um grão-inquisidor lidera forças governamentais poderosas. Muitas vezes são campeões de impérios opressores ou redes de inteligência excessivamente zelosas.",
    "sections": []
  },
  "creature-acrobat": {
    "description": "Acrobatas executam feitos de agilidade, equilíbrio e força.",
    "sections": []
  },
  "creature-dancer": {
    "description": "A dança pode ser usada para contar histórias, compartilhar emoções, entreter e exibir a habilidade atlética do artista.",
    "sections": []
  },
  "creature-juggler": {
    "description": "Malabaristas são artistas físicos que dominam a arte de manipular adereços. Em geral, isso envolve arremessar vários objetos num padrão fluente, mas alguns usam itens em ricochete, itens giratórios ou outros objetos para mantê-los no ar.",
    "sections": [
      {
        "id": "juggling-props",
        "title": "Adereços de malabarismo",
        "body": "As armas apresentadas na ficha do malabarista são exemplos, mas outras boas opções incluem facas-estrela, machadinhas, adagas e até bombas alquímicas. Praticamente qualquer item de Volume leve serve. Malabaristas são proficientes em quaisquer Golpes à distância que façam com armas de arremesso. Versões de nível mais alto deste NPC podem aumentar o número máximo de adereços para quatro ou cinco."
      }
    ]
  },
  "creature-street-musician": {
    "description": "Muitos músicos ganham a vida fora do palco tocando em mercados, feiras ou encruzilhadas. Embora a fama possa não ser tão ampla quanto a de artistas teatrais, mesmo assim são pilares de muitas comunidades.",
    "sections": []
  },
  "creature-mime": {
    "description": "Mimos são artistas que usam movimento, gestos e expressões sem qualquer fala para encenar uma cena ou situação para os espectadores.",
    "sections": []
  },
  "creature-traveling-actor": {
    "description": "A vida de um ator itinerante é, ao contrário da crença, não de glamour, mas de esforço. Estar na estrada de vila em vila vestindo mil faces convida a pouca recompensa, salvo a adoração da plateia. Ainda assim, é ali que prosperam. Atores em geral viajam em companhias, compostas não só de outros atores, mas também de maquinistas, condutores e agregados. Todos caem sob o polegar de um diretor singular, que age como pai e gerente de todos na companhia.",
    "sections": []
  },
  "creature-troubadour": {
    "description": "Trovadores mantêm vivas as canções tradicionais da cultura e escrevem obras originais para comemorar eventos importantes.",
    "sections": []
  },
  "creature-beast-tamer": {
    "description": "Domadores de feras trazem o selvagem à civilização, criando e treinando criaturas para seguir comandos e executar truques vistosos que entretêm o público. O domador em geral luta ao lado de um aliado animal treinado do próprio nível ou menor, muito provavelmente um tigre.",
    "sections": [
      {
        "id": "ethical-taming",
        "title": "Domação ética",
        "body": "Ao longo da história de Golarion muitos artistas pensaram muito pouco nas condições dos animais que mantinham. Porém, isso raramente é o caso hoje. Na verdade, não é incomum que animais de espetáculo sejam tratados melhor do que alguns dos artistas. São treinados com aprendizagem por reforço positivo e, uma vez que a segurança possa ser assegurada, vivem fora da jaula com o próprio treinador."
      }
    ]
  },
  "creature-court-jester": {
    "description": "Embora bobos da corte muitas vezes sejam alvo fácil de zombaria e passatempos ociosos, não confunda a autodepreciação com fraqueza. Por baixo, o bobo esconde malícia, uma língua afiada e facas ainda mais afiadas. Muitas vezes se encontram entretendo os nobres da corte ou preparando as próximas palhaçadas. Nas horas indiscretas da noite, podem ser encontrados na companhia de criados e mestres-espiões.",
    "sections": []
  },
  "creature-puppeteer": {
    "description": "Na superfície, titereiros são simplesmente provedores de entretenimento para as massas. Com os títeres pequenos e histórias simples, as pantomimas são divertidas para a família toda. Porém, alguns titereiros têm um segredo. Podem animar os títeres com magia, enviando-os para causar toda sorte de travessura na calada da noite. Titereiros desse jaez tendem a viajar sozinhos, embora possam ser encontrados como parte de um grupo itinerante se ficarem solitários. Podem servir de fachada inocente para negócios mais ilícitos ou de capangas de um grupo maior de ladrões e vadios.",
    "sections": [
      {
        "id": "alternative-puppets",
        "title": "Títeres alternativos",
        "body": "Este conjunto alternativo de títeres vilanescos Golpeia com um modificador de ataque de +15.\n\n**Títere infiel** O títere faz um Golpe à distância contra uma criatura a até 9 m, causando 1d10 de dano de espírito, mais 1d4 de dano de espírito se o alvo for sagrado. **Títere envenenador** O títere faz um Golpe corpo a corpo com uma seringa minúscula de veneno contra uma criatura cujo espaço compartilhe, causando 1d4 de dano perfurante mais 1d6 de dano de veneno persistente. **Títere morto-vivo** O títere faz um Golpe corpo a corpo contra uma criatura cujo espaço compartilhe, causando 2d8 de dano de vazio e deixando o alvo Amedrontado 1 (ou Amedrontado 2 num acerto crítico)."
      }
    ]
  },
  "creature-maestro": {
    "description": "Um maestro é um artista que alcançou a verdadeira excelência. Esses virtuosos podem inspirar os ao redor a alturas maiores ou infundir medo no coração dos inimigos.",
    "sections": []
  },
  "creature-pack-leader": {
    "description": "Conjuradores primordiais com afinidade particular por animais muitas vezes auxiliam a comunidade treinando e curando os animais domesticados. Outros focam o tempo em preservar espécies ameaçadas e ajudá-las a proliferar ou se adaptar a um ambiente em mudança. O líder da matilha é mais frequentemente emparelhado com o companheiro morcego treinado; veja a barra Companheiros do líder da matilha para outras opções.",
    "sections": [
      {
        "id": "pack-leader-companions",
        "title": "Companheiros do líder da matilha",
        "body": "Além do companheiro morcego treinado (e, opcionalmente, com um dos benefícios de apoio), estes animais do _Monster Core_ rendem bons companheiros para o líder da matilha. **Nível 3** lobo terrível, louva-a-deus gigante, escorpião gigante, vespa gigante, gorila, urso-pardo, hienodonte, leão, paquicefalossauro; **Nível 4** daeodon, besouro-veado gigante, grande tubarão-branco, grifo, hadrossaurídeo, rinoceronte, tigre."
      }
    ]
  },
  "creature-mountain-guardian": {
    "description": "Quem desbloqueou os segredos de abrir um portal cinético a um plano elemental dentro de si empunha imenso poder sobre aquele elemento. Praticantes que se especializam em terra elemental são robustos e voltados à defesa. O guardião da montanha é cercado por armadura pesada feita de pedra unida com magia elemental.",
    "sections": [
      {
        "id": "kineticist-rules",
        "title": "Regras de cineticista",
        "body": "O guardião da montanha se baseia na classe cineticista de _Pathfinder Rage of Elements_, embora simplificado para uso e um NPC. As ações com o traço impulso só podem ser usadas se a aura cinética estiver ativa e tiverem uma mão livre. Quando usam uma ação com o traço transbordamento (Tremor ou Peso da Pedra), a aura cinética se desativa até Canalizar Elementos."
      }
    ]
  },
  "creature-dedicated-druid": {
    "description": "Indivíduos que dedicam a vida à proteção e preservação do mundo natural muitas vezes se tornam druidas. Esses praticantes devotos de magia primordial podem trabalhar sozinhos ou num círculo de pessoas de ideias semelhantes, todas com poderes primordiais mais aterradores que o anterior.",
    "sections": []
  },
  "creature-skin-shifter": {
    "description": "Troca-peles são defensores da natureza, abençoados pelos espíritos do selvagem com a capacidade de se metamorfosear em formas animais poderosas. Espreitando como feras ou carregando pelo campo, protegem o equilíbrio da natureza e punem quem o desequilibraria.",
    "sections": []
  },
  "creature-tree-singer": {
    "description": "Cantores podem falar as palavras da criação em canção, uma arte esquecida do Primeiro Mundo. As melodias transformam grama em lâminas e fazem as árvores se mexerem. Pela música, plantas se erguem para defender e buscar vingança pela natureza. Ensinados por espíritos da floresta ou agentes feéricos do Primeiro Mundo, dominam a magia da canção primordial.",
    "sections": []
  },
  "creature-tempest-incarnate": {
    "description": "Quando o sangue de um feiticeiro chama tempestade e céu, pode se tornar uma força assustadora de se ver. Quando esse poder amadurece, tornam-se condutos vivos da tempestade.",
    "sections": []
  },
  "creature-librarian": {
    "description": "Guardiões do conhecimento, bibliotecários documentam descobertas, eventos e leis. Os melhores bibliotecários registram os eventos duas vezes: uma para o registro público e outra para registrar como os eventos realmente se desenrolaram.",
    "sections": []
  },
  "creature-obsessive-researcher": {
    "description": "A academia recompensa a especialização, e por isso as universidades e ateneus do Mar Interior transbordam de eruditos privados de sol que são os especialistas mundiais em tópicos tão obscuros quanto os hábitos migratórios dos bogwids ou o folclore do Brevoy pré-Coral.",
    "sections": []
  },
  "creature-astronomer": {
    "description": "Culturas diferentes criaram histórias sobre os comos e porquês do universo, se existem coisas além das estrelas e se os deuses manipulam os corpos celestes. Mas astrônomos não se interessam por contos folclóricos — desejam a verdade.",
    "sections": []
  },
  "creature-teacher": {
    "description": "A passagem de conhecimento e tradições de geração em geração é uma ocupação honrada pelo tempo. Professores existem para fortalecer as populações com alfabetização, história e ciências avançadas, mas sobretudo com inspiração. A maioria oferece conhecimento geral para que os alunos sejam bem-arredondados, mas alguns são peritos ou até mestres de uma só disciplina.",
    "sections": []
  },
  "creature-avuncular-professor": {
    "description": "Estes eruditos experientes do mundo sabem que há mais na vida do que só pesquisa. Também há refeições boas no refeitório da universidade, camas confortáveis e plateias cativas de alunos.",
    "sections": []
  },
  "creature-exuberant-apprentice": {
    "description": "Olhos brilhantes e rabo eriçado, estes magos jovens combinam sem costura curiosidade sem limites, entusiasmo vigoroso e uma completa falta de instinto de sobrevivência.",
    "sections": []
  },
  "creature-departmental-chair": {
    "description": "Tudo o que o chefe de departamento realmente quer é uma chance de fazer a pesquisa em paz. Em vez disso, foi arrastado para lidar com toda emergência — política, sobrenatural ou emocional — da universidade. Não está nada empolgado com isso.",
    "sections": []
  },
  "creature-sage": {
    "description": "O maior conhecimento vem da experiência. Anciãos da vila, videntes antigos e conselheiros da realeza são exemplos de quem é valorizado por tal sabedoria. Sábios educam e guiam o povo para que não se desvie das normas e tradições da cultura.",
    "sections": []
  },
  "creature-globetrotting-scholar": {
    "description": "É preciso um tipo particular de personalidade para deixar os confortos da academia a fim de explorar tumbas antigas cheias de armadilhas ou observar monstros comedores de gente em seus habitats nativos. O tipo de personalidade que encontra alegria no ciclo de vida de vespas parasitoides ou relata ritos sacrificiais ghol-gani com um prazer decididamente macabro. A academia não sobreviveria sem tais eruditos viajantes, mas para os colegas mais sedentários, tendem a parecer um bando esquisito.",
    "sections": []
  },
  "creature-eldritch-emeritus": {
    "description": "Para estranhos, o emérito eldritch parece algo como uma piada — um erudito velho atordoado, a mente tão entulhada de teoremas obscuros e metafísica abstrata que preocupações com a mera realidade cotidiana se esvaem. Quem os conhece, porém, sabe que o emérito eldritch escreveu mais tratados de magias do que a maioria dos magos teve jantares quentes e, se suficientemente irritado, é inteiramente capaz de oferecer uma demonstração breve, minuciosa e fatal.",
    "sections": []
  },
  "creature-navigator": {
    "description": "Um navegador usa corpos celestes e rotas de navegação para determinar rotas.",
    "sections": []
  },
  "creature-rigger": {
    "description": "Jeito para nós e nenhum medo de altura são as qualificações principais destes enredadores de corda voadores e vigias.",
    "sections": []
  },
  "creature-bosun": {
    "description": "O contramestre de um navio, ou bosun, lidera os marinheiros de convés que mantêm o navio.",
    "sections": [
      {
        "id": "shipboard-spells",
        "title": "Magias de bordo",
        "body": "Um contramestre com treino mágico pode trocar Pique e Golpe pelas magias a seguir.\n\n**Magias primordiais preparadas** CD 18, ataque +10; **1º** _carga de formiga_, _aterrissagem suave_, _impulso hidráulico_; **Truques (1º)** _arco elétrico_, _orientação_, _conhecer o caminho_, _luz_, _sigilo_"
      }
    ]
  },
  "creature-pirate": {
    "description": "Estes flagelos são uma ameaça para quem passa tempo longe da terra.",
    "sections": []
  },
  "creature-castaway": {
    "description": "Seja resultado de naufrágio, abandono forçado ou escolha pessoal, sobreviver sozinho numa ilha tempo suficiente tende a eliminar os fracos de corpo e mente. A falta de interação social tende a gerar beligerância contra forasteiros, mas hostilidades não são uma certeza.",
    "sections": []
  },
  "creature-diver": {
    "description": "Mergulhadores muitas vezes conseguem ganhar grandes quantias mergulhando por tesouros e vendendo-os com ágio a turistas e negociantes de antiguidades.",
    "sections": []
  },
  "creature-ship-captain": {
    "description": "O capitão é a autoridade máxima numa embarcação, responsável pelo sustento e bem-estar de todos no navio.",
    "sections": [
      {
        "id": "shipboard-spells",
        "title": "Magias de bordo",
        "body": "O capitão de navio pode ganhar as magias a seguir no lugar de Desarme duplo.\n\n**Magias primordiais preparadas** CD 24, ataque +16; **2º** _conjurar elemental_, _respirar na água_, _andar na água_; **1º** _aterrissagem suave_, _rajada de vento_ (×2); **Truques (2º)** _arco elétrico_, _orientação_, _conhecer o caminho_, _luz_, _sigilo_"
      }
    ]
  },
  "creature-subaquatic-marauder": {
    "description": "Uma nova raça de piratas, estes saqueadores atacam navios desavisados debaixo da cobertura das ondas. Os trajes de mergulho volumosos e reforçados que vestem também servem de armadura, e mecanismos de engenhoca aumentam a força.",
    "sections": []
  },
  "creature-ocean-nomad": {
    "description": "Para alguns, o oceano não é apenas um meio de ir de porto a porto, mas um lar em si.",
    "sections": []
  },
  "creature-conspiracist": {
    "description": "Conspiracionistas desinformam e falsificam fatos para promover as próprias causas. Embora representem pouca ameaça física, podem ter aliados mais poderosos, como uma turba iludida que responde ao sinal do conspiracionista.",
    "sections": []
  },
  "creature-toady": {
    "description": "Estes capangas executam as tarefas ingratas que mantêm a máquina vil do mestre funcionando. Seja por lealdade ou medo, um bajulador serve o chefe fielmente.",
    "sections": [
      {
        "id": "perks-of-the-job",
        "title": "Regalias do trabalho",
        "body": "Um bajulador que trabalha para um chefe poderoso pode receber habilidades especiais ou presentes. Por exemplo, um conjurador de nível alto pode dar-lhe uma _varinha de enviar_, ou um assassino pode dar-lhe uma só dose de um veneno mortal para usar num inimigo problemático."
      }
    ]
  },
  "creature-fiend-caller": {
    "description": "Chamadores de infiéis agem como intermediários para ajudar mortais a vender a alma ou fazer outros acordos com infiéis. Você pode ajustar um chamador para ser acompanhado por um infiel vinculado. O infiel ganha o traço lacaio, e você pode substituir a magia _armamento espiritual_ do chamador por _sacrifício final_.",
    "sections": [
      {
        "id": "keeping-enemies-close",
        "title": "Manter os inimigos perto",
        "body": "Heróis podem ter mais facilidade em lidar pacificamente com um chamador de infiéis do que com outro vilão. Chamadores estão dispostos a trabalhar com praticamente qualquer um desde que recebam compensação adequada e até podem ser úteis para deter infiéis mais perigosos. Mas são oportunistas acima de tudo. Uma vez que a transação acaba, não é provável que fiquem por perto como amigos, e se um acordo melhor aparecer, podem anular um contrato anterior."
      }
    ]
  },
  "creature-saboteur": {
    "description": "Sabotadores se destacam em infiltração, usando-a para executar atos destrutivos.",
    "sections": []
  },
  "creature-propagandist": {
    "description": "Os desvios, meios-fatos e o giro sem esforço que propagandistas lançam sobre os eventos criam prova do que quer que os chefes precisem que provem.",
    "sections": []
  },
  "creature-deluded-mob": {
    "description": "Arrastadas por mentiras, subornos e propaganda, estas pessoas desesperadas são convencidas a lutar em nome de vilões absolutos. Conspiracionistas, propagandistas, mestres do crime, déspotas e mais se aproveitam destas turbas.",
    "sections": []
  },
  "creature-champion-of-rovagug": {
    "description": "Talvez não haja mortais mais anátema à paz do que os campeões de Rovagug ou de outras divindades destrutivas.",
    "sections": [
      {
        "id": "other-grim-champions",
        "title": "Outros campeões sombrios",
        "body": "Os campeões mais sinistros de deuses profanos se dedicam à profanação ou à iniquidade. Este campeão serve Rovagug, mas Lamashtu, Urgathoa e senhores demoníacos têm campeões semelhantes. Se trocar a divindade, mude a arma predileta (veja a tabela de Divindades). Se for uma arma de uma mão, reduza a CA do campeão em 2, dê-lhe um escudo de aço e substitua Golpe de Machado por Avanço Defensivo, uma atividade de 2 ações que permite ao campeão Erguer o Escudo, Dar Passada e fazer um Golpe corpo a corpo."
      }
    ]
  },
  "creature-mastermind": {
    "description": "Mentes mestras tecem tramas de longo alcance para ver seus objetivos nefastos se concretizarem, manipulando com destreza quem está ao redor, transformando inimigos em amigos e depois colocando-os uns contra os outros.",
    "sections": []
  },
  "creature-despot": {
    "description": "Déspotas vivem para acumular e explorar poder sobre os outros.",
    "sections": []
  },
  "creature-interrogator": {
    "description": "Interrogadores usam dor e intimidação contra prisioneiros e outras vítimas indefesas para forçar “confissões”.",
    "sections": []
  },
  "creature-reckless-scientist": {
    "description": "É trabalho do cientista imprudente quebrar as regras da realidade, custe o que custar.",
    "sections": []
  },
  "creature-fleshwarper": {
    "description": "Cientistas cruéis chamados distorcedores de carne criam horrores a partir da carne alheia. Muitos desejam empurrar a ciência adiante, mas outros só precisam do deleite grotesco.",
    "sections": [
      {
        "id": "warped-menagerie",
        "title": "Menagerie distorcida",
        "body": "Um distorcedor de carne é mestre no ofício sombrio, e criar monstros é praticamente segunda natureza. Porém, não têm grande habilidade em controlá-los. Alguns mantêm as criações enjauladas para estudo adicional, ou para usá-las como cães de guarda macabros. Os especialmente descuidados simplesmente abandonam as abominações terríveis no ermo para virarem problema de outra pessoa. Classicamente, as criações são distorcidos de carne como o grothlut e o irnakurse. Outras criaturas criadas podem lembrar criações carniceiras, globsters ou crias do pecado."
      }
    ]
  },
  "creature-gang-leader": {
    "description": "Líderes de gangue dirigem assassinos, matadores, ladrões e valentões. O líder de gangue muitas vezes aparece ao lado de uma gangue de bandidos ou de outros criminosos.",
    "sections": [
      {
        "id": "gang-structure",
        "title": "Estrutura da gangue",
        "body": "Um líder de gangue pode comandar uma gangue, e vários outros NPCs desta seção e da seção Criminoso servem bem como membros. Uma gangue de tamanho significativo em geral tem estrutura piramidal, de modo que só poucos membros se reportam diretamente ao chefe e fica mais difícil ligar os crimes diretamente a quem está no comando se alguém for preso."
      }
    ]
  },
  "creature-wealthy-vigilante": {
    "description": "À noite, este membro da nobreza veste uma identidade falsa para aplicar justiça violenta e extralegal a criminosos menores e aos oprimidos. Possuem autojustiça inabalável e o melhor equipamento que o dinheiro pode comprar.",
    "sections": [
      {
        "id": "vigilante-s-arsenal",
        "title": "Arsenal do vigilante",
        "body": "A ameaça (e a flexibilidade) de um vigilante rico como combatente vem da capacidade de usar o equipamento certo na hora certa. Um vigilante perspicaz entra em combate com os melhores consumíveis prontos e talismãs afixados para o tipo de encontro que virá, além de um plano do que usar em seguida. Como mestre, você pode trocar os talismãs do vigilante rico ao longo de vários confrontos para fazê-lo parecer muito mais ameaçador do que é. Mantenha os PJs adivinhando!"
      }
    ]
  },
  "creature-warmonger": {
    "description": "Belicistas acreditam que o estado básico da vida é a violência. Mantêm-se no auge da condição física com treino constante e deixam os suprimentos prontos para marchar à guerra.",
    "sections": []
  },
  "creature-hero-hunter": {
    "description": "Alguns caçadores se entediam de feras e monstros simples. Para eles, um guerreiro testado em batalha é a presa mais fina.",
    "sections": [
      {
        "id": "home-advantage",
        "title": "Vantagem de casa",
        "body": "Um caçador de heróis presunçoso pode atacar os heróis no terreno deles, confiando simplesmente nas próprias habilidades para vencer. Porém, o melhor lance é atrair os PJs a um campo de batalha que conhece, onde teve tempo de armar as armadilhas. Um caçador de heróis pode escolher um lugar vantajoso para a emboscada e colocar laços. Raramente chamam aliados para ajudar, a menos que seja para impedir a presa de escapar."
      }
    ]
  },
  "creature-world-ender": {
    "description": "Ao contrário da maioria dos vilões, fins dos mundos não se preocupam com nuança. O objetivo final é simples, ainda que ambicioso: destruir o mundo e todos nele.",
    "sections": []
  },
  "creature-catfolk-name-collector": {
    "description": "Coletores de nomes são pontos de referência estimados da cultura catfolk. Registram as aventuras de heróis catfolk, falam com espíritos e contam lendas sobre lugares estranhos e distantes.",
    "sections": []
  },
  "creature-leaping-thief": {
    "description": "Alguns catfolk aproveitam a agilidade natural para roubar de quem é lento demais para alcançá-los. Em geral miram avarentos notórios e outros que claramente têm dinheiro de sobra — às vezes para ajudar os necessitados, às vezes por puro lucro.",
    "sections": []
  },
  "creature-lucky-courser": {
    "description": "Caçadores catfolk magistrais viajam aos cantos mais distantes do mundo, rastreando os monstros terríveis que ali habitam na esperança de um dia pôr fim às predações. Cooperam de bom grado com outros aventureiros para derrotar demônios, aberrações e feras e feéricos malevolentes.",
    "sections": []
  },
  "creature-dwarf-smith": {
    "description": "Muitos anões tornam-se ferreiros: o olhar para o detalhe, estilos de vida que os mantêm perto de materiais úteis como o ferro e o orgulho no trabalho se juntam num conjunto brilhante de habilidades para trabalhar armamentos. Embora os anões sejam capazes de forjar quase qualquer tipo de item, a maioria se concentra em armamentos como forma de criar objetos para defender os próprios anões.",
    "sections": []
  },
  "creature-spirit-priest": {
    "description": "Embora os anões venerem deuses como a maioria das outras ancestralidades, muitos também buscam nos espíritos do mundo orientação e apoio. Quase todo objeto e ambiente no mundo, de uma pedra simples a um rio vasto e à maior das montanhas, contém algum tipo de espírito. Sacerdotes espirituais anões aprendem a se comunicar com esses espíritos. Essa sintonia espiritual permite a esses sacerdotes usar magia, bem como convocar esses espíritos em tempos de necessidade.",
    "sections": []
  },
  "creature-dwarf-battalion": {
    "description": "Soldados anões formam unidades formidáveis, capazes de se manter contra a maioria dos inimigos. Em combate, um batalhão anão é uma máquina bem oleada, desferindo ataques coordenados contra os adversários.",
    "sections": []
  },
  "creature-dwarf-general": {
    "description": "Generais anões encarnam o orgulho no conhecimento e na perspicácia tática, usando a compreensão da guerra e da estratégia de campo para coordenar subordinados nas posições ótimas. Também permanecem prontos a entrar em combate num instante e levar a luta ao inimigo com as próprias mãos.",
    "sections": []
  },
  "creature-aiuvarin-translator": {
    "description": "Muitas sociedades reconhecem as habilidades dos aiuvarins como tradutores hábeis.",
    "sections": []
  },
  "creature-forlorn-artist": {
    "description": "Elfos forlorn, que passam a vida entre povos de vida mais curta, muitas vezes ficam melancólicos pela perda constante. Alguns canalizam essa melancolia na arte.",
    "sections": []
  },
  "creature-demonbane-warrior": {
    "description": "Grande parte da terra que os elfos deixaram para trás em tempos antigos foi tomada por demônios. Nos séculos desde o retorno, guerreiros élficos mata-demônios juraram reconquistar as terras ancestrais e combater as forças do mal.",
    "sections": []
  },
  "creature-woodland-scouts": {
    "description": "Elfos da floresta ou da selva aproveitam o terreno, operando em unidades que aparentemente surgem das próprias árvores.",
    "sections": []
  },
  "creature-elven-court-guard": {
    "description": "Na teia emaranhada de linhagens, rivalidades e alianças mutáveis que é uma corte nobre élfica, famílias aristocráticas empregam guarda-costas leais só a elas.",
    "sections": []
  },
  "creature-bleachling-survivor": {
    "description": "É quase inédito gnomos sobreviverem à doença horrenda conhecida como o Desbotamento, mas os poucos que o fazem saem permanentemente alterados. Tendo vivido a pior doença conhecida da espécie, sobreviventes bleachling muitas vezes emergem calejados e imprudentes, viajando em busca de experiências que dobram a mente e emoções intensas que despertem algo neles de novo. Embora as experiências possam endurecê-los, não são hostis. A maioria tenta ajudar outros que encontram nas viagens e que talvez não sejam tão inabaláveis.",
    "sections": []
  },
  "creature-gnome-philomath": {
    "description": "A inclinação inata gnômica de se deleitar em experiências novas leva filomatas gnomos a mergulhar o mais fundo possível nas multidões de saber contidas numa biblioteca. Esses observadores sagazes têm memórias enciclopédicas e tendem a se cercar de pilhas de documentos e bugigangas relativas ao assunto que no momento prende a atenção. Conforme os interesses ramificam de um tópico ao seguinte, um filomata gnomo arquiva as descobertas para consultar de novo noutro dia.",
    "sections": []
  },
  "creature-gnome-daredevil": {
    "description": "Estes guerreiros ágeis tiram proveito da estatura pequena e dos movimentos destros para evadir e ultrapassar os inimigos no campo de batalha. A habilidade inigualável com a maça-relâmpago gnômica permite ao ousado golpear de curta distância e girar para longe ileso, às vezes acertando com força bastante para derrubar os adversários.",
    "sections": []
  },
  "creature-razzle-dazzler": {
    "description": "O ofuscador espetacular é um tipo de artista particularmente sedutor, que se especializa em encantar com ilusões e exibições vistosas. Seja com o duplo ilusório ou com fogos de artifício bem cronometrados, são excepcionalmente bons em manter o público focado numa exibição para distrair dos segredos que tornam a magia possível.",
    "sections": []
  },
  "creature-gnome-conservationist": {
    "description": "O mundo natural ostenta beleza insuperável e variedade incontável, e o conservacionista gnomo se dedica a vivenciar e proteger o maior número possível de exemplos dessa grandeza. Esses gnomos são aliados firmes de animais e plantas, e acham excepcionalmente fácil construir um vínculo excepcional com quase todas as criaturas que encontram nas viagens.",
    "sections": []
  },
  "creature-goblin-chef": {
    "description": "Goblins comem quase qualquer coisa. Embora sobrevivam de carne crua ou pouco cozida, alguns preferem selar ou fritar a comida primeiro — ou, melhor ainda, picles! Um chef goblin consegue tornar qualquer coisa comestível (ao menos para um goblin).",
    "sections": []
  },
  "creature-goblin-scavenger": {
    "description": "Muitos goblins vasculham materiais, objetos brilhantes e qualquer outra coisa que consigam pegar, mas um sucateiro goblin é o melhor em achar esses itens úteis. Mais importante, são ótimos em usá-los sem se matar. Na maior parte das vezes.",
    "sections": []
  },
  "creature-goblin-get-gang": {
    "description": "Há pouco mais aterrorizante do que um bando de raide goblin saído para tomar dos vizinhos. Uma mistura em enxame de comandos, piromaníacos e cantores de guerra armados com corta-cães, corta-cavalos, tochas acesas e dentes afiados, esta tropa se deleita em saquear comunidades despreparadas. O canto é um contraponto inquietante aos gritos das vítimas.",
    "sections": []
  },
  "creature-big-boss-goblin": {
    "description": "Grandes chefões goblins mandam nos membros da banda e lidam com quaisquer pernaltas que cruzem o caminho — às vezes com violência ou diplomacia, e às vezes mandando outro goblin lidar com eles (de modos que o grande chefão aprova se der certo, ou que alega terem sido ideias péssimas que jamais teria tentado se não der). Esses líderes goblins muitas vezes insistem em títulos ou alcunhas impressionantes como “O Excessivamente Incendiário”, “Cantor de Serpentes” ou “O Mais Glutonestíssimo”, embora estes possam ser exagerados em vários graus para efeito dramático ou até mudar ao capricho do grande chefão (muitas vezes para superar um rival).",
    "sections": []
  },
  "creature-bill-band": {
    "description": "Coletivos barulhentos de halflings sedentos de emoção se reúnem em bandos-de-bico para competições animadas e esportes vivos. Fomentam um senso de camaradagem entre os membros enquanto deixam um rastro de caos no encalço.",
    "sections": []
  },
  "creature-halfling-head-chef": {
    "description": "Renomados pela perícia culinária, chefs-chefes halfling navegam o mundo complexo da alta cozinha com criações saborosas e gênios explosivos.",
    "sections": [
      {
        "id": "chef-s-menu",
        "title": "Menu do chef",
        "body": "Um chef-chefe halfling elabora pratos requintados que fascinam o paladar. Delícias como pudim de flor-de-mel (mel, creme e pétalas), rolinhos de toca recheados (carne e legumes envolvidos em massa folhada), assado com cobertura de baga-sol (carne marinada em molho de baga-sol) e gratinado de raízes sortidas (camadas de legumes-raiz e queijo) exibem a perícia."
      }
    ]
  },
  "creature-halfling-smuggler": {
    "description": "Contrabandistas halfling são procurados pela capacidade de navegar com destreza o submundo sombrio para mover mercadorias e informações ilícitas.",
    "sections": []
  },
  "creature-halfling-yarnspinner": {
    "description": "Fiandeiros de causos tecem contos cativantes que entretêm, educam e preservam o rico patrimônio do povo halfling através das gerações.",
    "sections": []
  },
  "creature-hobgoblin-battalion": {
    "description": "Um batalhão hobgoblin em geral é composto de vários soldados e arqueiros comandados por um único capitão, embora todo batalhão também tenha a própria hierarquia interna que define com clareza a cadeia de comando caso o capitão atual caia em batalha.",
    "sections": []
  },
  "creature-hobgoblin-spellbreaker": {
    "description": "Em grande parte por um rancor ancestral contra tudo que é élfico, muitos hobgoblins desconfiam inatamente da magia, em especial da “magia élfica” da tradição arcana. A maioria dos exércitos hobgoblin mantém um contingente de forças especiais “quebra-magias” treinadas para assassinar alvos conjuradores de alto valor antes do engajamento militar ou identificar e eliminar rapidamente magos de batalha inimigos.",
    "sections": []
  },
  "creature-hobgoblin-vanguard": {
    "description": "Embora haja tempo para precisão e disciplina, todo general hobgoblin também entende o valor de desmoralizar o inimigo com uma demonstração de força avassaladora. Nenhuma unidade militar se presta melhor a esse propósito do que a vanguarda, uma unidade de elite pesadamente armada e encouraçada que inspira os soldados companheiros à ação enquanto rompe as linhas e o moral inimigos com armas explosivas aterrorizantes.",
    "sections": []
  },
  "creature-bone-scavenger": {
    "description": "Kholos têm conexão forte com os ancestrais, muitas vezes usando os ossos como arte e armas para honrá-los ainda mais. Catadores de ossos são enviados aos campos depois de uma batalha para recolher os ossos dos aliados. Muitas vezes prescindem das técnicas de caça em matilha de outros kholos, espalhando-se entre os inimigos quando encontrados em grupo.",
    "sections": [
      {
        "id": "ant-kholos",
        "title": "Kholos formiga",
        "body": "O catador de ossos pertence à herança kholo formiga, menores e com orelhas maiores do que outros kholos. Você pode mudar este NPC para outra herança kholo tornando-o Médio, e inversamente pode mudar outro NPC kholo para kholo formiga tornando o tamanho Pequeno."
      }
    ]
  },
  "creature-kholo-pragmatist": {
    "description": "Devido ao estilo de vida agressivo, guerreiros kholo raramente chegam à velhice. Quando um pragmático kholo entra numa luta, prefere ver outra batalha, então usa qualquer vantagem possível para sobreviver. Mantêm os inimigos à distância com as lanças longas e desenvolveram técnicas para bloquear melhor os ataques com a arma. Se a maré da batalha virar contra eles, pragmáticos kholo fogem ou se rendem se for a opção mais prática.",
    "sections": []
  },
  "creature-kholo-outrider": {
    "description": "Muitas matilhas kholo são seminômades, ficando num lugar até serem empurradas por outros, ou até os recursos locais começarem a rarear. Antes de mover a matilha, os líderes enviam um único kholo para abrir o caminho e garantir uma rota segura ao próximo destino. Esses batedores são mestres do ermo e lutam melhor quando estão sozinhos.",
    "sections": []
  },
  "creature-kobold-egg-guardian": {
    "description": "Guardiões de ovos kobold estão entre os melhores guerreiros de uma tribo, encarregados de proteger a próxima geração. Juram dar a vida para proteger os ovos da tribo, embora não antes de esgotar todos os truques.",
    "sections": []
  },
  "creature-kobold-trapper": {
    "description": "Kobolds são artesãos hábeis, sempre inventando novas armadilhas e laços para defender o território e emboscar inimigos. Armadilheiros kobold gostam de exibir a perícia de fabricação no campo de batalha.",
    "sections": []
  },
  "creature-kobold-earth-diver": {
    "description": "Mergulhadores da terra kobold estudam a geologia das áreas perto das comunidades. A influência mística do patrono da comunidade ou anos de treino extensivo em escavação ou magia da terra permitem que escavem o solo com rapidez e sintam movimentos no chão sob os pés.",
    "sections": []
  },
  "creature-root-leshy-groundskeeper": {
    "description": "Leshys-raiz resistentes têm a força e o fôlego para cavar sulcos e plantar sementes por longas horas. Embora humildes até entre leshys, podem ser extremamente teimosos mesmo contra adversários poderosos.",
    "sections": []
  },
  "creature-tumbleweed-leshy-courier": {
    "description": "A capacidade de um leshy-bola-de-feno de se mover rápido por longas distâncias com facilidade permite que atuem como mensageiros e intermediários. Druidas muitas vezes confiam a esses mensageiros a entrega de recados importantes aos círculos druídicos de origem ou a outros druidas conhecidos. Alguns até os induzem ao círculo para ensinar o Canto Selvagem para comunicação segura e magia básica para autodefesa.",
    "sections": []
  },
  "creature-corn-leshy-throng": {
    "description": "Uma floresta densa ou uma fazenda florescendo às vezes vê uma explosão de magia primordial que leva à criação de uma multitude de leshys. Ainda jovens, esses espíritos podem se unir aos companheiros de colheita para proteção ou para alcançar um objetivo mútuo. Acostumados a crescer em fileiras, muitos leshys-milho conseguem formar uma legião considerável.",
    "sections": []
  },
  "creature-gourd-leshy-witch": {
    "description": "Alguns leshys assustadores aprendem os caminhos da conjuração ocultista com estranhos espíritos da natureza que espreitam logo fora da vista ou sob o manto da escuridão. Essas bruxas tratam as vassouras como familiares, imbuindo a madeira e a palha com um fragmento de senciência.",
    "sections": []
  },
  "creature-tidewater-guard": {
    "description": "Guardas da maré iruxi são combatentes capazes, hábeis em ataques anfíbios e em sobrepujar embarcações ao longo de qualquer costa. Como os assentamentos lizardfolk em geral são construídos em parte debaixo d'água e em parte acima, precisam de defensores que guardem ataques nos dois ambientes.\n\n As ombreiras especiais que os guardas da maré usam os distinguem de outros guerreiros lizardfolk. Protegem os ombros de golpes de alfange e machado, e podem ser feitas de escamas de dragão, conchas de tartaruga ou de quíton gigante, madeira laqueada ou até carapaças de ouriço-do-mar. A receita da resina especial que armeiros iruxi aplicam para endurecer essas ombreiras é um segredo bem guardado, e o suprimento de resina de cada comunidade iruxi é pequeno, precioso e vigiado de perto.",
    "sections": []
  },
  "creature-iruxi-masked-mummer": {
    "description": "Mascarados iruxi dão vida aos mitos do povo-lagarto, vestindo trajes elaborados e máscaras de osso para encenar histórias com ancestrais, deuses, dragões e dinossauros lendários e espíritos da natureza de todos os tipos.\n\nOs mascarados mais talentosos afirmam que as danças rituais convidam esses espíritos para dentro, infundindo o corpo com luz estelar e emprestando poder primordial ligado às luminárias que as máscaras representam. Até quem não tem habilidade mágica vê isso: pontos brilhantes em forma de estrelas distantes parecem flutuar sob a pele do mascarado.",
    "sections": []
  },
  "creature-orc-agriculturist": {
    "description": "Nas terras severas que os orcs ocupam, não há campos verdejantes repletos de lavoura. Um fazendeiro orc precisa ser resistente e tão hábil em forragear quanto em plantar e colher.",
    "sections": []
  },
  "creature-orc-gamekeeper": {
    "description": "Guarda-caças vivem na margem da holda, em geral solitários, cuidando dos animais que capturaram. Cada parte de um animal preso serve para fazer suprimentos ou negociar.",
    "sections": []
  },
  "creature-dromaar-lorekeeper": {
    "description": "Guarda-lendas são zeladores meticulosos da história colorida e muitas vezes mal compreendida de orcs e dromaars. São andarilhos joviais, contando suas histórias a quem quiser ouvir.",
    "sections": []
  },
  "creature-orc-skullcrushers": {
    "description": "Guerreiros orc buscam armas e táticas mais eficazes — a maioria física, algumas mágicas. Ao combater os mortos-vivos nas fronteiras, formaram bandos de esmaga-crânios para esmagar hordas de esqueletos.",
    "sections": []
  },
  "creature-orc-veteran-master": {
    "description": "Enquanto a espada e o escudo são confiáveis e provados em batalha, o mestre veterano é a arma. Endurecidos por décadas de luta, ainda encontram paz interior para ganhar vantagem física.",
    "sections": []
  },
  "creature-swarm-voice": {
    "description": "A voz do enxame é o líder secular de uma toca ysoki ou de uma família numa toca maior. Se há disputa, a voz resolve. Se há negociação, orquestra. Se a guerra está para estourar, declara. A voz do enxame é a mão de boas-vindas e o punho de ferro da colônia.",
    "sections": []
  },
  "creature-tunnel-viper": {
    "description": "Não há jeito melhor de um ysoki se distinguir do que defender a toca, e muitos se provam saindo e desafiando monstros que encontram. Quem volta vitorioso desses testes entra nas fileiras dos guerreiros ysoki, usando os feitos como distintivo de orgulho. Muitas vezes saem de novo, já estabelecidos e experientes, para ganhar mais notoriedade como guerreiros.",
    "sections": []
  },
  "creature-bone-mother": {
    "description": "A mãe dos ossos — oráculo da toca — impõe figura. Mães dos ossos podem ser de qualquer gênero apesar do nome, vestindo o crânio de um rato gigante e cobrindo as roupas de ossos pendentes. Quando um membro da toca morre, presenteia um osso (em geral de dedo) ao oráculo, que existe tanto como repositório físico dos que vieram antes quanto como história viva da toca.",
    "sections": []
  },
  "creature-gambling-companion": {
    "description": "A reputação de proteger contra o azar, somada a perícia e conhecimento, estabelece esses tengus como companheiros de jogo ideais. O papel inclui fornecer saber local dos estabelecimentos e dos vários jogos disponíveis. Perícias refinadas de observação e a capacidade de ler os outros jogadores aumentam o valor do serviço. O exemplo é de um companheiro que frequenta estabelecimentos mais finos. Em algumas regiões, o patrono busca um companheiro com mais habilidade de luta para também servir de guarda-costas.",
    "sections": []
  },
  "creature-jinx-eater": {
    "description": "Se sequestrado, conscrito ou em serviço voluntário, um tengu no papel de come-azar na tripulação de um navio tem a tarefa de manter a tripulação livre de infortúnio. Quem tem a perícia necessária muitas vezes alcança posição respeitada e privilegiada a bordo.",
    "sections": []
  },
  "creature-tengu-bladesmith": {
    "description": "Com a diáspora tengu espalhada por grande parte de Golarion, o saber e a tradição de forjar lâminas passaram gerações até quem mostra interesse e aptidão. Muitos forjadores de lâminas tengu têm experiência de guerreiro; outros aprendem o ofício da espada para aprimorar o conhecimento das armas que produzem.",
    "sections": []
  },
  "creature-tripkee-camoufleur": {
    "description": "Camufladores, mestres da camuflagem natural, não só disfarçam batedores e guerreiros da aldeia antes de partirem, mas também criam e mantêm o ocultamento da aldeia inteira necessário para manter a comunidade escondida e segura. Assim como outros dependem de engenheiros para erguer muralhas, tripkees dependem de camufladores para proteger os lares.",
    "sections": []
  },
  "creature-tripkee-fiend-keeper": {
    "description": "Tripkees têm uma técnica para lidar com ameaças profanas passada gerações afora. Um guardião de infiéis pode absorver espíritos profanos no corpo antes que essas entidades causem problemas aos parentes. Embora possam recorrer a esse poder quando necessário, os guardiões de infiéis tripkee tentam se limpar da influência maligna praticando boas ações.",
    "sections": []
  },
  "creature-trained-bat": {
    "description": "Treinado para trabalhar em conjunto com um mestre, este morcego gigante é perito em rastrear com ecolocalização e hostilizar inimigos com as pancadas das asas poderosas. Em geral aparece com o líder da matilha.",
    "sections": []
  },
  "creature-veteran-war-horse": {
    "description": "Um cavalo de guerra veterano não só recebeu treino extensivo: também já passou por várias batalhas. Acostumou-se ao caos da guerra e avança sem medo, incutindo temor nos inimigos. Pode acompanhar um campeão, um campeão de Rovagug, um capitão da guarda, um campeão deífico, um condestável a cavalo ou um guarda-caça orc.",
    "sections": []
  },
  "creature-beast-eidolon": {
    "description": "Esta criatura serve de eidolon acompanhando um chamador de deuses sarkoriano, mas pode ser usada ou adaptada a qualquer eidolon fera agressivo de um invocador.",
    "sections": []
  },
  "creature-experienced-hound": {
    "description": "Um cão experiente já participou de dezenas de caçadas. Muitas vezes é criado desde filhote para apanhar o faro de certos animais e entregar o corpo ileso quando o dono abate a presa. Pode acompanhar um caçador ou outro NPC especializado em rastrear presas.",
    "sections": []
  },
  "creature-druid-initiate": {
    "description": "Um druida novato aprende técnicas básicas e conjuração logo depois de ser iniciado na ordem drúidica. O iniciado druida já aprendeu muito com os mentores — anciãos da ordem — mas ainda não teve chance de desenvolver a própria identidade.",
    "sections": []
  }
}
